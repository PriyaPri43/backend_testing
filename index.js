const express=require('express');
const app=express();
const mongoose=require('mongoose');
const PORT= process.env.PORT || 5000;
const MONGO = process.env.MONGODB_URL;

async function run(){
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected...");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);

    }
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
