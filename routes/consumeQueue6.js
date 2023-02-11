const amqpconn = require('./baseClass');
const axios = require('axios');
const {logfiles,logger} =require('../log4');

var result = amqpconn.extractValues(process.argv);  // arguments coming from readconfig file

logfiles(result[4]);
logger.info(`from ${result[3]} file with process Id ${process.pid} \r\n`);


process.send([process.pid,result[3]]) //sending pid to parent module

amqpconn.connect(result[0]).then(async (ch) => {

    try {
        const check = await ch.assertQueue(result[2]);
        ch.prefetch(1);
        ch.consume(result[2], (message) => {
            var receive = JSON.parse(message.content.toString())

            logger.info( "recevied : \r\n" + JSON.stringify(receive) + '\r\n');

            logger.info( ` [x] Done  \r\n`);
            ch.ack(message);

        })
    }
    catch (error) {
        logger.fatal(`Error: ${error}`)
    }
})

process.on('SIGHUP', () => {
    process.exit(() => console.log(`${__filename}  closed!`))
  })