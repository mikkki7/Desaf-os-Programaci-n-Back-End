import fs from 'fs';

let storage = "./products.json";

class productManager {
    constructor (file) {
        this.file = file;
        this.products = [];
    }

    async addProduct(newProduct) {
        await this.getProducts(0);

        let codeExist = this.products.some((product) => product.code === newProduct.code);

        if (!codeExist) {
            newProduct.id = this.product.length + 1;
            this.products.push(newProduct);
            await fs.promises.writeFile(this.file, JSON.stringify(this.products), "UTF-8");
        } else {
            console.log(`El producto con el codigo (${newProduct.code})`);
        }
    }

    async getProducts(limit) {
        let products = await fs.promises.readFile(this.file, "UTF-8");
        let parsedProducts = await JSON.parse(products);
        this.products = parsed.products;

        return limit === 0 ? parsedProducts : parsedProducts.slice(0, limit);
    }

    async getProductById(id) {
        let products = await fs.promises.readFile(this.file, "UTF-8");

        let parsedProducts = await JSON.parse(products);
        this.products = parsedProducts;

        let product = this.products.find((product) => product.id === parseInt(id) || {});

        return product;
    }

    async updateProduct(id, updateField) {
        let foundIdProduct = this.products.findIndex((product) => product.id === parseInt(id));

        if(foundIdProduct !== -1) {
            let updatedProduct = {...this.products[foundIdProduct], ...updateField};

            this.products[foundIdProduct] = updatedProduct

            let data = JSON.stringify(this.products, null, "UTF-8");

            try {
                await fs.promises.writeFile(storage, data);
                console.log("Su producto ha sido actualizado");
            } catch (error) {
                console.error("Error al actualizar el producto", error);
            }
        } else {
            console.error(`No se ha encontrado el producto que coincida con el id ${id}`)
        }
    }

    async deleteProduct(id) {
        let updatedProduct = this.products.filter((product) => product.id !== parseInt(id));

        if(this.updateProduct.length < this.products.length) {
            let updatedData = JSON.stringify(updatedProduct, null, "UTF-8");

            try {
                await fs.promises.writeFile(storage, updatedData);
                console.log("Su producto ha sido eliminado");
            } catch (error) {
                console.error("Error al eliminar el producto", error);
            }
        } else {
            console.error(`No se ha encontrado el producto que coincida con el id ${id}`);
        }
    }
}

export default productManager;