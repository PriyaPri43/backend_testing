const express=require('express');
const app=express();
const mongoose=require('mongoose');
const PORT= process.env.PORT || 6000;

async function run(){
    await mongoose.connect("mongodb://127.0.0.1:27017/ServiceCenter") ;
    console.log("connected");

}
run();

app.set('view engine','ejs');

app.use(express.static('public'));

const myrouter=require("./routes/router.js");
app.use('/home',myrouter)

app.get('/',(req,res)=>{
    res.render('login');
})


app.listen(PORT,()=>console.log(`server is listening ${PORT}`))

// open(`http://localhost:8087/`)
