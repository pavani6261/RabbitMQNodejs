var express = require('express');
var router = express.Router();

var details = [ 
    {
    "connectionName" : "amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic",
    "queueName" : "queueread1",
    "redirectUrl" : "http://localhost:3001/users",
    "programName" : "consumeQueue4.js"
    
    },
    {
        "connectionName" : "amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic",
        "queueName" : "queueread2",
        // "redirectUrl" : "http://localhost:3000/profileManager",
        "redirectUrl" : "http://dummyjson.com/products?limit=3",
        "programName" : "consumeQueue5.js"
    
    },
    {
        "connectionName" : "amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic",
        "queueName" : "queueread3",
        "redirectUrl" : "http://localhost:3001/",
        "programName" : "consumeQueue6.js"
    },
    {
        "connectionName" : "amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic",
        "queueName" : "queueread4",
        "redirectUrl" : "http://localhost:3001/users",
        "programName" : "consumeQueue7.js"

    }
]
module.exports.details = details;
    