import { Router } from "express";
import productsManager from "../managers/productsManager.js";

const router = Router();

router.get("/realtimeproducts", (req, res) => {
    try {
        let products = productsManager.getProducts();
        res.render("realTimeProducts", {title: "Real time products", products : products});
    } catch (error) {
        console.error("Error al obtener los productos en tiempo real:", error);
        res.status(500).send("Error en el servidor")
    }
})

router.post("/realtimeproducts", (req, res) => {
    try{
        const socketServer = req.app.get("socketServer");

        let newProduct = req.body;

        productsManager.addProduct(newProduct);

        let updateProducts = productsManager.getProducts();

        socketServer.emit("new-product", updateProducts)

        res.status(200).json({ status: "success", message: "Producto añadido con exito" })
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
})

export default router;