
const amqp = require('amqplib');
const axios = require('axios');
console.log("from consumeQueue4.js file",process.pid);
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
    //insert your logic 
        var receive = JSON.parse(message.content.toString())
    
        console.log(`Received: ${receive}`)
         axios.get(result[1])
        .then((res)=>{
            console.log(res.data);
        })
        process.send(`ok from ${result[3]}`);
    
            console.log(" [x] Done");
            channel.ack(message);
        process.send('close');

    })
    
   }
   catch(err){
    console.log(err,"4");
   }
}

connect(result);
