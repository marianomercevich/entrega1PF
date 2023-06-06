import express from 'express'
import productsRouter from './routs/products.router.js'
import cartsRouter from './routers/carts.router.js' 

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Ok'))
app.get('/health', (req, res) => res.json({ message: 'The server is running on port 8080' }))


app.use('/products', productsRouter)
app.use('/carts', cartsRouter)

app.listen( 8080, () => { console.log('Server Up') } )

