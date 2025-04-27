require('dotenv').config()

const app = require('./app')
const connectDB = require('./config/db')

const port = process.env.PORT || 3000

const start = async() => {
    try{
        await connectDB(process.env.DATABASE_URL)
        app.listen(port, () => console.log(`Server running on: http://localhost:${port}`))
    }catch(err){
        console.log(err.message)
    }
}

start()

