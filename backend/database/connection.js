const mongoose = require('mongoose')
// const DB_URL = process.env.DB_URL
const DB_URL = `mongodb+srv://admin:admin@fblogin.eoo4a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

async function createConnnection() {

    const connection = await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: false ,
        
    })
    if (connection) {
        console.log('database connected')
    }
}

module.exports = createConnnection;