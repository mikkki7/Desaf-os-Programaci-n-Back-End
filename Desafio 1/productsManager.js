class ProductManager {
    constructor () {
        this.products = [];
        this.id = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
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

        if (isDuplicate) {
            console.log("Ya existe determinado producto con este id");
        } else {
            this.products.push(newProduct);
            console.log("Producto agregado con exito");
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById() {
        let foundProduct = this.products.find((product) => product.id === id);
        return foundProduct ? foundProduct : console.log(`No se encontro el producto que coincida con el id ${id}`);
    }
}

const PM = new ProductManager();

console.log("Productos iniciales: ", PM.getProducts());

PM.addProduct( 
    "Titulo 1",
    "Descripcion 1",
    250,
    "/img.jpg",
    "CCC001",
    50
);

PM.addProduct(
    "Titulo 2",
    "Descripcion 2",
    500,
    "/img.jpg",
    "CCC002",
    100
);

console.log(PM.getProducts(), "Productos agregados con exito");

console.log(PM.getProductById(1));

console.log(PM.getProductById(4));