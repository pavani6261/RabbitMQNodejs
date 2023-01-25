const {configure, getLogger, shutdown } =require('log4js');
// const express = require('express');


const path = require('path');

module.exports.currentfile =async (filename)=>{
    return path.basename(filename);
}


configure({
    appenders:{
        out:{type:'stdout'},
        file:{type: 'file',filename:'./logs/all-the-logs.log',
        layout: { type: 'basic' },
        compress: true,
        daysToKeep: 14,
        keepFileExt: true},
        server:{type: 'tcp-server',host:'localhost',port:3000},
    },
    categories:{
        default:{
            appenders:['file','out'],
            level:'debug'
        }
    }
})

exports.logger=getLogger();