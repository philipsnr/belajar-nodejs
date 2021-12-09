// import
const fs = require('fs');
const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// make folder if not exists
const dirFolder = './data';
if(!fs.existsSync(dirFolder)){
    fs.mkdirSync(dirFolder);
}

// make file if not exists
const dirFile = './data/contacts.json';
if(!fs.existsSync(dirFile)){
    fs.writeFileSync(dirFile, '[]', 'utf-8');
}

const tulisPertanyaan = (pertanyaan) =>{
    return new Promise((resolve, reject) =>{
        rl.question(pertanyaan, (nama) =>{
            resolve(nama);
        });
    });
};

const simpanContact = (nama, email, noHP) =>{
    const contact = { nama, email, noHP };
    const file = fs.readFileSync('data/contacts.json', 'utf8')
    const contacts = JSON.parse(file);

    // cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama);
    if(duplikat){
        console.log('Kontak sudah terdaftar, gunakan nama lain!');
        rl.close();
        return false;
    }

    // cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log('Email tidak valid!');
            rl.close();
            return false;
        }
    }

    // cek no hp
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log('Nomor HP tidak valid!');
        rl.close();
        return false;
    }
    contacts.push(contact);
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(`Terima kasih sudah memasukkan data`);
    rl.close();
}

module.exports = { tulisPertanyaan, simpanContact };