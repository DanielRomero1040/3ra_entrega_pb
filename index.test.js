const {ProductsController} = require("./src/controller/productsController");

const assert = require("assert");
const productsController = new ProductsController();

// describe("Test para productos",()=> {

//     it("Deberia traer todos los productos",()=>{
//         assert.notEqual(productsController.getAll().length,0)
//     });

//     it("Deberia agregar un producto", ()=>{

//         const  cantidadProductos = async ()=>{
//            return await productsController.getAll().length;
//         } 
            
//         const newProduct = {
//             body:
//             {title: "producto7 enviado desde el test unitario",
//             description: "descripcion",
//             thumbnail: "link",
//             stock: 2,
//             price: 2030}
//         }
//         productsController.addProduct(newProduct);

//         assert.equal(productsController.getAll().length, cantidadProductos );
 
//     });

// })

const newProduct = {
    body:
    {title: "producto7 enviado desde el test unitario",
    description: "descripcion",
    thumbnail: "link",
    stock: 2,
    price: 2030}
}

const newP = async ()=>{return await productsController.addProduct(newProduct)};

console.log(newP)
