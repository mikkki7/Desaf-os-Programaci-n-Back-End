import express from 'express';
import ProductManager from './productManager.js';

const port = 3000;
const app = express();
const newProduct = new ProductManager("./src/products.json")

app.get("/products", async (req, resp) => {
    let limit = parseInt(req.query.limit) || 0;

    let products = await newProduct.getProducts(limit);

    resp.send({ status: 1, payload: products });
});

app.get("/products/:pid", async (req, resp) => {
    let product = await newProduct.getProductById(req.params.pid);

    resp.send({ status: 1, payload: product });
});

app.listen(port, () => { console.log(`Servidor activo en puerto ${port}`); });