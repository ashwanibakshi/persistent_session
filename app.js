var express  = require('express');
var session  = require('express-session');
var bodyParser = require('body-parser');

//init app
var app = express();

//set template engine
app.set('view engine','ejs');

//fetch the data from request
app.use(bodyParser.urlencoded({extended:false}));

//set session
app.use(session({
    secret:'this_is_MYSECRETKEY12345',
    resave:false,
    saveUninitialized:false
       }));

//local variable
app.use((req,res,next)=>{
    res.locals.auth = req.session.email;
    next();
});

//check session
var checkAuth = (req,res,next)=>{
    if(req.session.email){
             next();
    }else{
        res.redirect('/')
    }
}

//default page
app.get('/',(req,res)=>{
    if(req.session.email){
        res.redirect('/profile');
    }else{
    res.render('pages/home');
    }
});

app.post('/',(req,res)=>{
    if(req.body.remember!=null){
        req.session.email=req.body.email;
        req.session.cookie.maxAge=60000 //1 minute
    }else{
        req.session.email= req.body.email;
    }
    res.redirect('/profile');
});

app.get('/profile',checkAuth,(req,res)=>{
  res.render('pages/profile',{email:req.sessionvideo .email});
});

app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});

var port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at  '+port)); 