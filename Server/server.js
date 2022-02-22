const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')
const { response } = require('express')

const connection = mysql.createConnection({
host: "",
user: "",
password: "",
database: "",
port: 3306
})


try
{
    console.log("Connected!")
    var sql = "SHOW TABLES LIKE 'cardetails'";
    connection.query(sql, function (err, result) {
        // if (err) throw err;
        if(result.length === 0)
        {
            var sql = "CREATE TABLE cardetails (carId VARCHAR(255), carModel VARCHAR(255),  carNo VARCHAR(255),  status VARCHAR(255),  PRIMARY KEY (carId))";
            connection.query(sql, function (err, result) {
                // if (err) throw err;
                console.log("Table created!");
                // console.log(result)
            });
        }
        else{
            console.log("Table already exists!")
        }
    });
}
catch(e)
{
    console.log(e)
}

app.use(cors(
    {
        origin: "*",
    }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )

app.listen(3001,()=>{
    console.log("Port 3001 is running")
})

function showDetails(req,res)
{
    var sql = "SELECT * from cardetails"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
            // throw err;
        }
        else
        {
           res.json(result)
        }
        console.log(result)
    });
}

app.get('/start',(req,res)=>{
    showDetails(req,res)
})

app.post('/saveCar',(req,res)=>{
    console.log(req.body)
    var sql = "INSERT INTO cardetails (carId, carModel, carNo, status) VALUES ("+"'"+ req.body.carId+"'" +", "+"'"+req.body.carModel+"'"+", "+"'"+req.body.carNo+"'"+", "+"'"+req.body.status+"'"+")"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
            // throw err;
        }
        else
        {
            showDetails(req,res)
        }
    });
})

app.post('/editCar',(req,res)=>{
    var sql = " UPDATE cardetails SET carModel="+"'"+req.body.carModel+"'"+","+"carNo="+"'"+req.body.carNo+"'"+","+" status="+"'"+req.body.status+"'"+" WHERE carId="+"'"+req.query.id+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
            // throw err;
        }
        else
        {
            showDetails(req,res)
        }
    });
})

app.get('/deleteCar',(req,res)=>{
    var sql = "DELETE FROM cardetails"+" WHERE carId="+"'"+req.query.id+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
            // throw err;
        }
        else
        {
            showDetails(req,res)
        }
    });
})

app.get('/getCars',(req,res)=>{
    console.log(req.query.id)
    if(typeof req.query.id != "undefined")
    {
        var sql = "SELECT * from cardetails WHERE carId=12212"
    }
    else
    {
        var sql = "SELECT * from cardetails"
    }
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
            // throw err;
        }
        else
        {
            res.json(result)
            // showDetails(req,res)
        }
        console.log(result)
    });
})

