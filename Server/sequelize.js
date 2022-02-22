const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3001;
const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors(
    {
        origin: "*",
    }
))

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`);
    });
});

app.get('/start',(req,res)=>{
    db.cardetails.findAll().then(tableValues=>{
        res.send(tableValues)
    })
})

app.post('/saveCar',(req,res)=>{
    db.cardetails.create({
        carId:  req.body.carId,
        carModel: req.body.carModel,
        carNo: req.body.carNo,
        status:req.body.status
    })
    .then(tableValues => res.send(tableValues))
    .catch(err=>res.json({response: "Already Exist"}));
})

app.post('/editCar',(req,res)=>{
    db.cardetails.update(
        {
            carModel: req.body.carModel,
            carNo: req.body.carNo,
            status: req.body.status
        },
        {
          where: { carId: req.query.id }
        }
      ).then(() =>
        db.cardetails.findAll().then(tableValues=>{
            res.send(tableValues)
        })
      );
})

app.get('/deleteCar',(req,res)=>{
    db.cardetails.destroy({
        where: {
            carId: req.query.id
        }
      }).then(() => 
        db.cardetails.findAll().then(tableValues=>{
            res.send(tableValues)
    }));
})

app.get('/getCars',(req,res)=>{
    if(typeof req.query.id != "undefined")
    {
        db.cardetails.findAll({
            where: {
                carId: "12212"
            }
          }).then(tableValues=>{
            res.send(tableValues)
        })
    }
    else
    {
        db.cardetails.findAll().then(tableValues=>{
            res.send(tableValues)
        })
    }
})

