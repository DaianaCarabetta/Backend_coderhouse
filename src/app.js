import express from 'express';
import ProductManager from './ProductManager.js';

const app = express();
const server = app.listen(8080, () => console.log('Server running on port: 8080'));
const productManager = new ProductManager();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/products', async (req, res) =>{
    const result = await productManager.getProducts(req.query);
    res.send(result);
})

app.get('/products/:pid', async (req, res) =>{
    const id = req.params.pid;
    const existentProduct = await productManager.getProductById(id)
    if (existentProduct){
        res.send(existentProduct);
    }else {
        res.status(404).send('Not found');
    }
})