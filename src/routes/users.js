const {Router} = require("express");
const router = Router();
const _ = require("underscore");

const users = require('../sample.json');

router.get("/",(req,res)=>{
    res.json(users);
})


router.post("/",(req,res) => {
    const { guid,isActive,balance,picture,age,eyeColor,name,gender,company,email,phone } = req.body;
    if( Object.values({ guid, isActive, balance, picture, age, eyeColor, name, gender, company, email, phone }).every(val => val) ){
        const index = users.length + 1;
        const newUser = {...req.body,index};
        users.push(newUser);
        res.json(users);
    }else{ 
        res.send("wrong request");
    }
})


router.put("/:index",(req,res)=>{
    const { index } = req.params;
    const { age,name} = req.body;
    if( Object.values({ age,name }).every(val => val) ){
        _.each(users,(user,i)=>{
            if(user.index == index){
                user.age = age;
                user.name = name;
            }
        });
        res.json(users);
    }else{
        res.status(500).json({error:"Hubo un error"});
    }
})


router.delete("/:index", (req,res) => {
    const { index } = req.params;
    _.each(users,(user,i)=>{
        if(user.index == index){
            users.splice(i,1);
        }
    });
    res.send(users);
})

module.exports = router;