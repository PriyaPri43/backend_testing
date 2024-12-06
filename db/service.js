const mongoose = require('mongoose');
const fs = require('fs');

const Schema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    description: String,
    image:String
})

let Service= mongoose.model('service', Schema);

// let insertData= async ()=>{
//     const data = JSON.parse(fs.readFileSync('service.json', 'utf8')); 
//     const result = await Service.insertMany(data);
//     console.log('Services added:', result);
// } 
// insertData();

module.exports=Service;