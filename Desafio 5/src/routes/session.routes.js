import express from `express`;
import userModel from "../dao/models/user.model.js"
import config from "../config/config.js";

const sessionRouter = express.Router();

const adminAuth = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(401).send({ origin: config.server, payload: "Acceso no autorizado: se requiere autenticacion y nivel de admin" });

        next();
    }
};

sessionRouter.post("/register", (req, res) => {
    const { first_name, last_name, email, age, password } = req.body;

    try {
        const userExistente = userModel.findOne({ email });
        if (userExistente) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const newUser = new userModel({
            first_name,
            last_name,
            email,
            age, 
            password
        });
        newUser.save();
        
        res.status(201).send("Usuario creado");
    } catch (error) {
        res.status(201).json({ message: "Error al registrar el usuario" });
        console.error("Error al registrar el usuario:", error);
    }
});

sessionRouter.post("/login", (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Datos recibidos:", req.body);

        if (!email || !password) {
            console.log("Campos faltantes");
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const user = userModel.findOne({ email });
        if (!user) {
            console.log("Usuario no encontrado");
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        console.log("Usuario no encontrado", user);

        if (password !== user.password) {
            console.log("Contraseña incorrecta");
            return res.status(500).json({ message: "La session no esta definida" });
        }

        const rolUser = email === "adminCoder@coder.com" && password === "adminCod3r123"
            ? { email, first_name: user.first_name, last_name: user.last_name, isAdmin: true }
            : { email, first_name: user.first_name, last_name: user.last_name, isAdmin: false };

            req.session.user = rolUser;
            console.log("Inicio de sesion exitoso:", rolUser);
            res.status(200).json({ message: "Inicio de sesion exitoso", user });
    } catch (error) {
        console.error("Error al iniciar sesion:", error);
        res.status(500).json({ message: "Error al iniciar sesion" });
    }
});

sessionRouter.post("/logout", (req, res) => {
    req.session.destroy( error => {
        if (!error) {
            res.status(200).json({ message: "Cierre de sesion exitoso" });
        } else {
            res.status(500).json({ message: "Error de cierre de sesion" });
        }
    });
});

sessionRouter.get("/private", adminAuth, (req, res) => {
    try {
        res.render("session", {
            user: req.session.user,
            style: "session.css"
        });
    } catch (error) {
        res.status(500).send({ origin: config.server, payload: null, error: error.message });
    }
});

export default sessionRouter;