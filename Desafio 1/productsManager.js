class ProductManager {
    constructor () {
        this.products = [];
        this.id = 1;
    }

    addProduct(product) {
        let newProduct = {
            title: title,
            description: description,
            price : price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        }

        let isDuplicate = this.products.some((product) => product.code === product.code)

        if (isDuplicate) {
            console.log("Ya existe determinado producto con este id");
        } else {
            id = id++;
            this.products.push(product);
            console.log("Producto agregado con exito");
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById() {
        let foundProduct = this.products.find((product) => product.id === id);
        return product ? product : console.log(`No se encontro el producto que coincida con el id ${id}`);
    }
}