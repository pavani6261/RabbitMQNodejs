const amqp = require('amqplib');

module.exports.connect = (connectionString)=>{
        const connection = amqp.connect(
            `${connectionString}`
        );
     return connection;
}