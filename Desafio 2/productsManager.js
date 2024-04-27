import fs from "fs";

let storage = "./products.txt"

class ProductManager {
    constructor () {
        this.products = [];
        this.id = 1;
    }

    async addProduct(title, description, price, thumnail, code, stock) {
        let newProduct = {
            id: this.id++,
            title: title,
            description: description,
            price : price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        let isDuplicate = this.products.some((product) => product.code === code)

        if (newProduct && !isDuplicate) {
            this.products.push(product);
            
            let data = JSON.stringify(this.products, null);

            try {
                await fs.promises.writeFile(storage, data);
                console.log("El producto ha sido agregado con exito");
            } catch (error) {
                console.error("El producto no ha sido agregado", error);
            }
        } else {
            console.log("El producto ya existe");
        }
    }

    async getProducts() {
        try {
            let data = await fs.promises.readFile(storage, "UTF-8");
            let products = JSON.parse(data);
            products = products;
            return this.products;
        } catch (error) {
            console.error("Error al leer el archivo", error);
            return [];
        }
    }

    getProductById(id) {
        let foundProduct = this.products.find((product) => product.id === id);
        if (foundProduct) {
            console.log(`Producto encontrado ${product}`);
            return foundProduct;
        } else {
            console.error(`No se ha encontrado el producto que coincida con el id ${id}`)
        }
    }

    async updateProduct(id, updateField) {
        let foundIdProduct = this.products.findIndex((product) => product.id === id);
        if (foundIdProduct !== -1) {
            let updatedProduct = {...this.products[foundIdProduct], ...updateField};
            
            this.products[foundIdProduct] = updatedProduct;

            let data = JSON.stringify(this.products, null);

            try {
                await fs.promises.writeFile(storage, data);
                console.log("Su producto se ha actualizado");
            } catch (error) {
                console.error("Error al actualizar el producto", error);
            }
        } else {
            console.error(`No se ha encontrado el producto que coincida con el id ${id}`);
        }
    }

    async deteleProduct(id) {
        let updatedProduct = this.products.filter((product) => product.id !== id);

        if (updatedProduct.length < this.products.length) {
            let updatedData = JSON.stringify(updatedProduct, null);

            try{
                await fs.promises.writeFile(storage, updatedData);
                console.log("Su producto ha sido eliminado con exito");
            } catch (error) {
                console.error("Error al eliminar el producto", error);
            }
        } else {
            console.error(`No se ha encontrado el producto que coincida con el id ${id}`);
        }
    }

    async deleteFile() {
        try {
            await fs.promises.unlink(storage);
            console.log("Archivo eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar el archivo", error)
        }
    }
}

const PM = new ProductManager();

console.log("Productos iniciales: ", PM.getProducts());

PM.addProduct(
    "Titulo 3",
    "Descripcion 3",
    750,
    "/imagen.jpg",
    "CCC003",
    150
);

PM.addProduct(
    "Titulo 4",
    "Descripcion 4",
    1000,
    "/imagen.jpg",
    "CCC0004",
    200
);

console.log(PM.getProducts(), "Productos agregados con exito");

console.log(PM.getProductById(1));

console.log(PM.getProductById(4));