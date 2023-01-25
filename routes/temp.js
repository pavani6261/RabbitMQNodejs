// const axios = require('axios');
// const { json } = require('express');
// var data1 = [
//     'D:/New folder/Node_js/node.exe',
//     'consumeQueue4.js',
//     'amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic,http://localhost:3001/users,queue4,consumeQueue4.js'     
//   ]

//   var data = [
//     'D:/New folder/Node_js//node.exe',
//     'D:',
//     'http://localhost:3000/uploadManager/getfile/',
//     './uploads/20230110T033138620Z966862.csv'
//   ]
// var url = 'http://dummyjson.com/products?limit=3';
// var some;
//   console.log(data)
// var temp = data.slice(2);
// console.log(temp)
// var result = temp[0];
// var result2 = temp[1];
// console.log(typeof(result),result);
// console.log(typeof(result2),result2,"filename");

// var payload = {
//     "uploadedfile" : result2
// }
// if(typeof(result)==="string")
// {
//   console.log(result)
// }
// // var authOptions = axios({
// //   method: 'GET',
// //   url: 'http://127.0.0.1:3000/uploadManager/getfile/',
// //   data: JSON.stringify({
// //     "uploadedfile" : result2
// // }),
// //   headers: {
// //     'Content-Type': 'application/json'
// //    },
// //   json: true
// //  })
 
// // authOptions
// //  .then((response) => {
// //      console.log(response);
// //      })
// //  .catch((error) => {
// //     console.log(error)
// //    })


// //   axios({
// //   method:'POST',
// //   url:result,
// //   data:payload,
// //   headers:{
// //     "Content-type": "application/json; charset=UTF-8"
// //   }
// // }
// // )
// // .then((res)=>{console.log(res)})
// // .catch((err)=>{
// //   console.log(err)
// // })
// // console.log(filedata,"some")

//   // var dir = __dirname.split('\\');
//   // dir.pop();
//   // dir = dir.join('\\')
//   // console.log(dir);
//   // console.log(typeof(dir))



// // class data1 {
  
// //     connectionName="amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic";
// //     queueName="queue1";
// //     redirectUrl="http://localhost:3001/users";
// //     programName= "consumeQueue4.js";
// //     getqueueName = ()=>{return this.queueName;}
// //     }

// // //   var temp = data.slice(2);
// // // console.log(temp);
// // // var result = temp[0].split(',');

// // // console.log(result[0]);

// // // console.log(result[1]);

// // var d = new data1();
// // d.queueName = "queue2"
// // console.log(d.getqueueName());

// // class Consumer  {
// //    constructor(result)
// //    {
// //     this.result = result;
// //    }
// //    data ={};
// //  connect = async(result)=>{
// //     try{
// //      const connection = await amqp.connect(
// //          `${result[0]}`
// //      );
// //      const channel = await connection.createChannel();
// //      const check = await channel.assertQueue(result[2]);
// //      channel.prefetch(1);
// //      channel.consume(result[2], (message) => {
     
// //          var receive = JSON.parse(message.content.toString())
     
// //          console.log(`Received: ${receive}`)
// //           axios.get(result[1])
// //          .then((res)=>{
// //           data =res.data;
// //              console.log(res.data);
// //          })
// //          process.send(`ok from ${result[3]}`);
     
// //              console.log(" [x] Done");
// //              channel.ack(message);
 
// //      })
// //      return data;
// //     }
// //     catch(err){
// //      console.log(err,"6");
// //     }
// //  }
 
// // }

// // var obj = new Consumer();
// // obj.result = [
// //   'D:\\New folder\\Node_js\\node.exe',
// //   'D:\\New folder\\nodesession\\Tempfolder\\routes\\consumeQueue7.js',
// //   'amqps://fdqmauic:jdUuCFJnnnQNw9WVDbHb9dHrhqYgeDp3@campbell.lmq.cloudamqp.com/fdqmauic,http://localhost:3001/users,queue7,consumeQueue7.js'
// // ]

// // console.log(obj.result);