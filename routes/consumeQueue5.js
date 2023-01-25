const amqpconn = require('./baseClass');
const axios = require('axios');
const amqp = require('amqplib');

console.log("from consumeQueue5.js file",process.pid);
var data = process.argv;

// console.log(data)

var temp = data.slice(2);
var result = temp[0].split(',');

amqpconn.connect(result[0]).then(async(conn)=>{
    try {
        const channel = await conn.createChannel();
    const check = await channel.assertQueue(result[2]);
    channel.prefetch(1);
    channel.consume(result[2],(message)=>{
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
    catch(error){
        console.log(error);
    }
})