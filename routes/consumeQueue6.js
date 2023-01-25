const amqp = require('amqplib');
const axios = require('axios');

console.log("from consumeQueue6.js file",process.pid);
var data = process.argv;

// console.log(data)

var temp = data.slice(2);
console.log(temp);
var result = temp[0].split(',');
console.log(result[0]);
async function connect(result){
   try{
    const connection = await amqp.connect(
        `${result[0]}`
    );
    const channel = await connection.createChannel();
    const check = await channel.assertQueue(result[2]);
    channel.prefetch(1);
    channel.consume(result[2], (message) => {
    
        var receive = JSON.parse(message.content.toString())
    
        console.log(`Received: ${receive}`)
         axios.get(result[1])
        .then((res)=>{
            console.log(res.data);
        })
        process.send(`ok from ${result[3]}`);
    
            console.log(" [x] Done");
            channel.ack(message);

    })
    
   }
   catch(err){
    console.log(err,"7");
   }
}

connect(result);




// const  {Consumer} = require('./temp')
// class Cls extends Consumer(){
//     name;
// }

// console.log("from consumeQueue6.js file");
// var data = process.argv;

// console.log(data)

// var temp = data.slice(2);
// // console.log(temp);
// var result1 = temp[0].split(',');
// console.log(result1);

// var conn = new Cls(result1);
// // conn.result = result1;

// console.log(conn.connect(conn.result));


// async function connect(result){
//    try{
//     const connection = await amqp.connect(
//         `${result[0]}`
//     );
//     const channel = await connection.createChannel();
//     const check = await channel.assertQueue(result[2]);
//     channel.prefetch(1);
//     channel.consume(result[2], (message) => {
    
//         var receive = JSON.parse(message.content.toString())
    
//         console.log(`Received: ${receive}`)
//          axios.get(result[1])
//         .then((res)=>{
//             console.log(res.data);
//         })
//         process.send(`ok from ${result[3]}`);
    
//             console.log(" [x] Done");
//             channel.ack(message);

//     })
    
//    }
//    catch(err){
//     console.log(err,"4");
//    }
// }

// connect(result);
