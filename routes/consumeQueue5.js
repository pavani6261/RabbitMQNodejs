const amqpconn = require('./baseClass');
const axios = require('axios');
const {logfiles,logger} =require('../log4');

const result = amqpconn.extractValues(process.argv);  /** arguments coming from readconfig file */

logfiles(result[4]) /** passing logfile name to logfiles function */ 

logger.info(`from ${result[3]} file with process Id ${process.pid} \r\n`);

process.send([process.pid,result[3]]);  /** sending pid to parent module/file */

amqpconn.connect(result[0]).then(async (ch) => {
    try {

        const check = await ch.assertQueue(result[2]);
        
        ch.prefetch(1);
        ch.consume(result[2], (message) => {

            var receive = JSON.parse(message.content.toString())

            logger.info("recevied : \r\n" + JSON.stringify(receive) + '\r\n');

                        /** insert your logic  */
            logger.info( ` [x] Done  \r\n`);

            ch.ack(message);
              /* An ack(nowledgement) is sent back by the consumer to tell RabbitMQ 
            that a particular message has been received, processed and that RabbitMQ is free to delete it.*/

        })

    }
    catch (error) {
        logger.fatal(` Error :${error}  \r\n`);
    }
})

console.log(process.pid,"que 5",process.ppid,"ppid")