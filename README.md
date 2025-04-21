# ZORA Allocation Checker

Script untuk mengecek alokasi token ZORA untuk multiple address dari file. Tool ini akan membaca address EVM dari file `address.txt` dan mengecek alokasi ZORA token untuk setiap address menggunakan API resmi.

🌐 **Website Checker:**
 - https://zora-checker.vercel.app/

## Fitur

- Membaca address dari file teks
- Mengecek alokasi token ZORA melalui API resmi
- Output berwarna di terminal dengan chalk
- Menampilkan ringkasan total alokasi
- Mengurutkan address berdasarkan alokasi tertinggi

## Persyaratan

- Node.js (versi 14.0.0 atau lebih tinggi)
- npm atau yarn

## Instalasi

1. Clone repositori ini:
   ```bash
   git clone git@github.com:layerairdrop/Zora-Checker.git
   cd Zora-Checker
   ```

2. Install dependensi:
   ```bash
   npm install
   ```
   atau dengan yarn:
   ```bash
   yarn install
   ```

## Penggunaan

1. Buat file `address.txt` dengan list address Ethereum (satu address per baris):
   ```
   0x9E89C1B5AeD05632C29e89E5e4EbB1E96BbE5Bfc
   0x123456789abcdef0123456789abcdef012345678
   0xabcdef0123456789abcdef0123456789abcdef01
   ```

2. Jalankan script:
   ```bash
   npm start
   ```
   atau dengan yarn:
   ```bash
   yarn start
   ```

## Konfigurasi Lanjutan

Anda dapat mengedit file `index.js` untuk:
- Mengubah path file address (default: `address.txt`)
- Mengubah URL API
- Menyesuaikan format output

## ☕️ Traktir kopinya & Thanks for Supporting us:
 -  https://sociabuzz.com/layerairdrop/tribe
 -  https://saweria.co/LayerAirdrop
 -  https://trakteer.id/layerairdrop/tip

## 🔒 Security Recommendations

- **Never** use private keys from wallets containing real assets
- Run on a secure server or VPS
- Regularly rotate private keys
- Monitor wallet activity regularly
- Keep your Node.js installation updated

## ⚖️ Disclaimer

1. This tool is for educational and testing purposes only
2. No financial advice is provided
3. Use at your own risk
4. The authors take no responsibility for any losses incurred through using this software

## 🙋 Support

For questions and support:
- Join our Telegram channel: [https://t.me/layerairdrop](https://t.me/layerairdrop)
- Join our Telegram group: [https://t.me/layerairdropdiskusi](https://t.me/layerairdropdiskusi)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
