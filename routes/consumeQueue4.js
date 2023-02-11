const amqpconn = require('./baseClass')
const amqp = require('amqplib');
const axios = require('axios');
const {logger,logfiles} = require('../log4');

const result = amqpconn.extractValues(process.argv);  /** arguments coming from readconfig file */

logfiles(result[4])

/*works as console.log into a log file*/
logger.info( `from ${result[4]} file with process Id ${process.pid} \r\n`);

process.send([process.pid,result[3]])  /**sending pid to parent module or file */

amqpconn.connect(result[0]).then(async (channel) => {
    try {

        /** assertQueue checks for given queue name, if it doesn't exist then it will create one. */
        const check = await channel.assertQueue(result[2]);

        channel.prefetch(1);    /** to get only one message at a time  */

        channel.consume(result[2], (message) => {

            var receive = JSON.parse(message.content.toString());
            logger.info("recevied : \r\n" + JSON.stringify(receive) + '\r\n');

            /** insert your logic  */

            logger.info( ` [x] Done  \r\n`);

            channel.ack(message);

            /* An ack(nowledgement) is sent back by the consumer to tell RabbitMQ 
            that a particular message has been received, processed and that RabbitMQ is free to delete it.*/

           
        })
    }
    catch (err) {
        console.log(err);
        logger.fatal('error message: ',err)
    }
})


// console.log(process.pid,"que 4",process.ppid,"ppid")