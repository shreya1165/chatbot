// server.js
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
})

app.post('/api/contact', (req, res) => {
    const formData = req.body;
    console.log(formData)
    // Assuming you want to append data to a JSON file named 'contacts.json'
    fs.readFile('contacts.json', (err, data) => {
        if (err) throw err;
        const contacts = JSON.parse(data);
        contacts.push(formData);
        fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2), err => {
            if (err) throw err;
            console.log('Data written to file');
            res.status(200).json({ message: 'Data stored successfully' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
