const express=require('express');
const app=express();
const router=express.Router();

const service=require("../db/service.js");
const login=require("../db/login.js");
const bookings=require("../db/bookings.js");

app.set('view engine','ejs');

router.use(express.static('public'));
router.use(express.urlencoded({extended:true}))

router.post('/',async (req,res)=>{                             //after login rendering home page
    const user=await login.create({ 
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    console.log(user);
    
    res.render('home');
})

// router.get('/',(req,res)=>{                                    //home butten click 
//     res.render('home');

// })


router.get('/service',async (req,res)=>{                    //service details from mongodb using mongoose
    serviceDetails=await service.find();    
    res.render('services',{serviceDetails})
})

router.get('/booknow',async (req,res)=>{                    //book now page
    serviceDetails= await service.find();    
    res.render('booknow',{serviceDetails});
})

router.post('/bookings',async (req,res)=>{                     //all booking details
// userdetails=await user.find()
    const newService=await bookings.create({
        name:req.body.name,
        viechle:req.body.vehicle,
        service:req.body.service,
        contact:req.body.contact
    });
    
    console.log(newService);
    
    bookingDetails= await bookings.find();    

    res.render('bookings',{bookingDetails})
})

router.get('/bookings',async(req,res)=>{                        
    bookingDetails= await bookings.find();    
    res.render('bookings',{bookingDetails})
})



router.post('/bookings/delete/:id', async (req, res) => {           //delete butten in bookings
    await bookings.findByIdAndDelete(req.params.id);
    res.redirect('/home/bookings');
});


router.get('/bookings/edit/:name', async (req, res) => {                    //edit butten click open form with old details
    const booking = await bookings.findOne({name:req.params.name});
    console.log(booking);
    
    serviceDetails=await service.find();    
    res.render('editbooking', { booking ,serviceDetails});
});


router.post('/bookings/edit/:name', async (req, res) => {                   //after edit form submited details update
    await bookings.findOneAndUpdate({ name: req.params.name }, {
        name: req.body.name,
        viechle: req.body.vehicle,
        service: req.body.service,
        contact: req.body.contact
    });
    res.redirect('/home/bookings');
});

module.exports=router;

