import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import DB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './Routes/userRoute.js';
import productRouter from './Routes/productRoute.js';

// App Config
const app = express()
const port = process.env.PORT || 4000;
DB()
connectCloudinary()

//Middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)

app.get('/', (req, res)=> {
    res.send('API working')
})

app.listen(port, ()=> console.log('server started on port:'+port)
)