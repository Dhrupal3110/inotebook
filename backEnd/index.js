const connectToMongo =require('./db')
const express = require('express')


const app = express()
const port = 3000

//auth
 app.use(express.json())


 
//Availebal routes

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

//home
app.get('/',(req,res)=>{
  res.end('please choose currect page')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})