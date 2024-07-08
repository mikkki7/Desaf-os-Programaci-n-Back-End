import cookieParser from `cookie-parser`;
import MongoStore from `connect-mongo`;
import express from 'express';
import handlebars from 'express-handlebars';
import session from `express-session`;
import mongoose from 'mongoose';
import config from './config/config.js';
import initSocket from './sockets.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/realTime.routes.js';
import sessionRouter from `./routes/session.routes.js`;
import profileRouter from `./routes/profile.routes.js`;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(`${config.dirname}/public`));

const httpServer = app.listen(config.port, async() => {
    await mongoose.connect(config.mongoDB_URI);
    console.log(`App activa en puerto ${config.port} conectada a bbdd`);
});

app.engine("handlebars", handlebars.engine());
app.set("views", `${config.dirname}/views`);
app.set("view engine", `handlebars`);

app.use(cookieParser(config.secret));
app.use(session({
    store: MongoStore.create({
        mongoURL: config.mongoDB_URI,
        ttl: 600
    }),
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}));

app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/sessions", sessionRouter)
app.use("/profile", profileRouter)
app.use("/static", express.static(`${config.dirname}/public`));


const io = initSocket(httpServer);
app.set("io", io);
