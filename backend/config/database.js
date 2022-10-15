const mongoose = require("mongoose")

const connectDatabase = ()=>{
    mongoose.connect(process.env.URL_DB,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((data)=>{
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        })
        // .catch((err)=>{
        //     console.log(err);
        // })
}
module.exports = connectDatabase