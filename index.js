#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';
import fetch from 'node-fetch';

const API_URL = 'https://zora-checker.vercel.app/api/check-allocation';
const ADDRESS_FILE = 'address.txt';

/**
 * Read addresses from file
 * @returns {Promise<string[]>} Array of addresses
 */
async function readAddresses() {
  try {
    const fileContent = await fs.readFile(ADDRESS_FILE, 'utf-8');
    return fileContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
  } catch (error) {
    console.error(chalk.red(`Error reading address file: ${error.message}`));
    console.error(chalk.yellow(`Make sure '${ADDRESS_FILE}' exists in the current directory.`));
    process.exit(1);
  }
}

/**
 * Check allocation for a single address
 * @param {string} address - Ethereum address
 * @returns {Promise<object>} Allocation data
 */
async function checkAllocation(address) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Origin': 'https://zora-checker.vercel.app',
        'Referer': 'https://zora-checker.vercel.app/'
      },
      body: JSON.stringify({ walletAddress: address })
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(chalk.red(`Error checking allocation for ${address}: ${error.message}`));
    return { totalTokens: 0 };
  }
}

/**
 * Main function
 */
async function main() {
  console.log(chalk.cyan.bold('===== ZORA ALLOCATION CHECKER =====\n'));
  
  // Read addresses from file
  console.log(chalk.blue('Reading addresses from file...'));
  const addresses = await readAddresses();
  console.log(chalk.green(`Found ${addresses.length} addresses\n`));
  
  // Check allocations for each address
  console.log(chalk.blue('Checking allocations...\n'));
  
  let totalAllocation = 0;
  const results = [];
  
  for (const [index, address] of addresses.entries()) {
    process.stdout.write(chalk.yellow(`Checking address ${index + 1}/${addresses.length}: ${address.slice(0, 10)}...${address.slice(-8)} `));
    
    const result = await checkAllocation(address);
    
    if (result.totalTokens) {
      totalAllocation += result.totalTokens;
      results.push({ address, allocation: result.totalTokens });
      console.log(chalk.green(`✓ ${result.totalTokens.toFixed(2)} ZORA`));
    } else {
      console.log(chalk.red('✗ NOT ELIGIBLE'));
    }
  }
  
  // Display results summary
  console.log('\n' + chalk.cyan.bold('===== RESULTS SUMMARY ====='));
  
  if (results.length > 0) {
    console.log(chalk.green.bold(`\nTotal allocation: ${totalAllocation.toFixed(2)} ZORA tokens\n`));
    
    // Sort results by allocation (highest first)
    results.sort((a, b) => b.allocation - a.allocation);
    
    console.log(chalk.blue.bold('Top Allocations:'));
    results.forEach((result, index) => {
      const addressDisplay = `${result.address.slice(0, 12)}...${result.address.slice(-8)}`;
      console.log(chalk.white(`${index + 1}. ${addressDisplay}: `) + 
                 chalk.yellow.bold(`${result.allocation.toFixed(2)} ZORA`));
    });
  } else {
    console.log(chalk.red.bold('\nNo valid allocations found.'));
  }
}

// Run the main function
main().catch(error => {
  console.error(chalk.red(`Fatal error: ${error.message}`));
  process.exit(1);
});