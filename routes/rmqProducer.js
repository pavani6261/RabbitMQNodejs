const amqp = require('amqplib');

const fs = require('fs');
const { logger, currentfile } = require('../log4');

var currentfilename;
currentfile(__filename).then((data) => {
    currentfilename = data;      //current file name 
});

logger.info(`file:${currentfilename},producer file invoked`);
var data = "Message from producer";

async function connect() {
    try {
        const connection = await amqp.connect(
            "amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic"
        );
        const channel = await connection.createChannel();
         await channel.assertQueue("queueread1");
        channel.sendToQueue(
            "queueread1",
            Buffer.from(JSON.stringify(`{"data":${data}}`))
        )
        await channel.assertQueue("queueread2");
        channel.sendToQueue(
            "queueread2",
            Buffer.from(JSON.stringify(`{"data from queueread2":${data}}`))
        )
    
        await channel.assertQueue("queueread3");
        channel.sendToQueue(
            "queueread3",
            Buffer.from(JSON.stringify(`{"data from queueread3":${data}}`))
        )

        await channel.assertQueue("queueread4");
        channel.sendToQueue(
            "queueread4",
            Buffer.from(JSON.stringify(`{"data from queueread4":${data}}`))
        )
    }
    catch (error) {
        console.log(`Error from producer: ${error}`);
    }
}

connect();