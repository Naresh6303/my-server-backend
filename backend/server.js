const mongoose = require('mongoose')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const RegModel = require('./models/Register')
const status = require('statuses')
const bodyParser = require('body-parser')
const EmailModel = require('./models/Email')

const port = 1111
// const mongodbUrl = 'mongodb://127.0.0.1:27017/myServer'
const mongodbUrl = 'mongodb+srv://Naresh:Naresh6303@cluster0.ds4z0cb.mongodb.net/myServer?retryWrites=true&w=majority'

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())


mongoose.connect(mongodbUrl);



  app.post('/mail' , async (req,res,next)=>{
    const {email,subject,message} = req.body
    EmailModel.insertMany([{email,subject,message}])
    .then(()=>{
        res.json('success')
    })
    .catch(()=>{
        console.log('error got ')
    })
  })
  
app.get('/' , async(req,res,next)=>{
    res.send('welcome back')
})


app.post('/register' , async (req,res,next)=>{
    if(req.body.pswd === req.body.conpswd){
    RegModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
    }
    else{
        res.json(status(500))
    }
})

app.post('/login' , async (req,res,next)=>{
    const {email , pswd} = req.body
    RegModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.pswd === pswd){
                res.json('Success')
            }
            else{
                res.json('the password is incorrect')
            }
        }
        else{
            res.json('No records found')
        }
    })
})

app.get('/card', async (req, res, next) => {
    try {
        const emails = await EmailModel.find();
        res.json(emails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port , ()=>{
    console.log('server is running on port' , port)
})