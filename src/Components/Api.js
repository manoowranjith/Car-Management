import axios from "axios";
import React from "react";
function Api()
{
    const [db, setDb] = React.useState("")
    const newCar=JSON.stringify(
        {

            "carId":"12212",
        
            "carModel":"baleno",
        
            "carNo":"TN 38 CJ 6636",
        
            "status":"available"
        
        }, null, 2       
    )
    const editCar=JSON.stringify(
        {

            "carModel":"Verna",
        
            "carNo":"TN 33 DD JJJJ",
        
            "status":"booked"
        
        }, null, 2    
    )
    React.useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3001/start',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });  
    },[])
    function addCar()
    {
        axios({
            method: 'post',
            url: 'http://localhost:3001/savecar',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                carId:"12212",
                carModel:"baleno",
                carNo:"TN 38 CJ 6636",
                status:"available"
            })
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });
    }
    function editDetails()
    {
        axios({
            method: 'post',
            url: 'http://localhost:3001/editCar?id=12212',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                carModel:"Verna",
                carNo:"TN 33 DD JJJJ",
                status:"booked"
            })
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });
    }
    function deleteCar()
    {
        axios({
            method: 'get',
            url: 'http://localhost:3001/deleteCar?id=12212',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });   
    }
    function allCar()
    {
        axios({
            method: 'get',
            url: 'http://localhost:3001/getCars',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });  
    }
    function findCar()
    {
        axios({
            method: 'get',
            url: 'http://localhost:3001/getCars?id=12212',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });  
    }
    return(
        <div>
            <h1 className="title">Car Rental Management</h1>
            <div className="request-call">
                <div>
                    <h2>Add a new Car</h2>
                    <p>POST - /saveCar</p>
                    <br></br>
                    <h3>Request Body:</h3>
                    <pre>{newCar}</pre>
                    <button onClick={()=>{addCar()}} className="sendBtn">Send</button>
                </div>
                

                <div>
                    <h2>Edit a Car Details</h2>
                    <p>POST - /editCar?id= 12212</p>
                    <br></br>
                    <h3>Request Body:</h3>
                    <pre>{editCar}</pre>
                    <button onClick={()=>{editDetails()}} className="sendBtn">Send</button>
                </div>

                <div>
                    <h2>Delete a Car</h2>
                    <p>GET - /deleteCar?id=12212</p>
                    <button onClick={()=>{deleteCar()}} className="sendBtn">Send</button>
                    

                </div>
                <div>
                    <h2>Get All Cars</h2>
                    <p>GET - /getCars</p>
                    <button onClick={()=>{allCar()}} className="sendBtn">Send</button>
                    
                </div>
                <div>
                    <h2>Get Car By ID</h2>
                    <p>GET - /getCar?id= 12212</p>
                    <button onClick={()=>{findCar()}} className="sendBtn">Send</button>
                </div>  
            </div>
            <div className="api-response">
                <h1>DB-Table</h1>
                <pre>
                    {db}
                </pre>
            </div>
        </div>
    )
}
export default Api;