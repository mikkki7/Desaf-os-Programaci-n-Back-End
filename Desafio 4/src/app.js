import express from 'express';
import config from './config/config.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from "./routes/carts.routes.js"
import viewsRouter from "./routes/realTime.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${config.dirname}/public`))

app.engine("handlebars", handlebars.engine());
app.set("views", `${config.dirname}/views`)
app.set("view engine", `handlebars`)

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)

app.use("/static", express.static(`${config.dirname}/public`));

const httpServer = app.listen(config.port, () => {
    console.log(`App activa en puerto ${config.port}`);
})

let socketServer = new Server(httpServer);

app.set("socketServer", socketServer);

socketServer.on("conecction", socket => {
    console.log(`Cliente ${socket.id} conectado desde ${socket.handshake.adress}`);
    socket.on("newMessage", data => {
        console.log(`Mensaje recibido desde ${socket.id}: ${data}`);
        socket.emit("secondMessage", "Mensaje recibido")
    })
})