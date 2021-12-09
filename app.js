const contacts = require('./contacts');

const main = async() =>{
    const nama = await contacts.tulisPertanyaan('Masukkan nama anda : ');
    const email = await contacts.tulisPertanyaan('Masukkan email anda : ');
    const noHP = await contacts.tulisPertanyaan('Masukkan nomor hp anda : ');

    contacts.simpanContact(nama, email, noHP);
}

main();