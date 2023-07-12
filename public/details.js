const connect = require('./database.js');
const schema = mongoose.schema

const detailsschema = new schema({
    name:{
        type:String
    },
    designation:{
        type:String
    },
    password:{
        type:password
    },
    conformpassword:{

    }
})