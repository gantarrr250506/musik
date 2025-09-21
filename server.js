const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Path untuk file data.json
const dataPath = path.join(__dirname, 'public', 'data.json');

// Endpoint untuk mendapatkan data tamu
// Endpoint untuk menyimpan data tamu baru
app.post('/api/guests', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Gagal membaca data.json:', err);
            return res.status(500).json({ error: 'Gagal membaca data tamu.' });
        }
        
        let guestsData = JSON.parse(data);
        const newGuest = req.body;
        
        // Tambahkan properti 'comment' ke objek tamu baru
        guestsData.guests.push(newGuest);
        
        // Tulis ulang file data.json
        fs.writeFile(dataPath, JSON.stringify(guestsData, null, 2), (err) => {
            if (err) {
                console.error('Gagal menulis data ke data.json:', err);
                return res.status(500).json({ error: 'Gagal menyimpan konfirmasi kehadiran.' });
            }
            res.status(200).json({ message: 'Konfirmasi berhasil disimpan.', data: newGuest });
        });
    });
});

// Endpoint untuk menyimpan data tamu baru
app.post('/api/guests', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Gagal membaca data.json:', err);
            return res.status(500).json({ error: 'Gagal membaca data tamu.' });
        }
        
        let guestsData = JSON.parse(data);
        const newGuest = req.body;
        
        // Tambahkan tamu baru ke array
        guestsData.guests.push(newGuest);
        
        // Tulis ulang file data.json
        fs.writeFile(dataPath, JSON.stringify(guestsData, null, 2), (err) => {
            if (err) {
                console.error('Gagal menulis data ke data.json:', err);
                return res.status(500).json({ error: 'Gagal menyimpan konfirmasi kehadiran.' });
            }
            res.status(200).json({ message: 'Konfirmasi berhasil disimpan.', data: newGuest });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});