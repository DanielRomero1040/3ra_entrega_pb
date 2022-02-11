const request = require("supertest")("http://localhost:8090");
const expect = require("chai").expect;

describe("API GET api/products/products ", ()=>{
    it("Deberia retornar un status 200 y retornar el array de productos",async()=>{
        let response = await request.get("/api/products/products");
        expect(response.status).to.eql(200);
        expect(response.body.productsArray.length).to.not.eql(0);

    })

    it("Deberia retornar estatus 200 y retornar el producto del id",async()=>{
        let idPrueba = "61f59c4ae8709f5844be031a";
        let response = await request.get(`/api/products/${idPrueba}`);
        expect(response.status).to.eql(200);
        expect(response.body.products.length).to.eql(1);
        expect(response.body.products[0]._id).to.eql(idPrueba);

    })

    it("Deberia agregar un producto en /api/products/add", async()=>{
        const newProduct = {
            title: "productoTest2",
            description: "descripcion",
            thumbnail: "link",
            stock: 2,
            price: 2030
        }

        let response = await request.post("/api/products/add").send(newProduct);
        expect(response.status).to.eql(200);

        const user = response.body.products;
        expect(user).to.include.keys("title","description","thumbnail","stock","price");

        expect(user.title).to.eql(newProduct.title);
        expect(user.description).to.eql(newProduct.description);
        expect(user.thumbnail).to.eql(newProduct.thumbnail);
        expect(user.stock).to.eql(newProduct.stock);
        expect(user.price).to.eql(newProduct.price);

    
    })

    it("Deberia modificat un producto en /api/products/update/id", async()=>{
        const modifiedProduct = {
            title: "productomodificado",
            description: "descripcion",
            thumbnail: "linkModificado",
            stock: 2,
            price: 2030
        }

        let idPrueba = "61f59c4ae8709f5844be031a";
        let response = await request.patch(`/api/products/update/${idPrueba}`).send(modifiedProduct);
        expect(response.status).to.eql(200);

        const user = response.body.products;
        expect(user).to.include.keys("title","description","thumbnail","stock","price");

        expect(user.title).to.eql(modifiedProduct.title);
        expect(user.description).to.eql(modifiedProduct.description);
        expect(user.thumbnail).to.eql(modifiedProduct.thumbnail);
        expect(user.stock).to.eql(modifiedProduct.stock);
        expect(user.price).to.eql(modifiedProduct.price);    
    })

    it("Deberia eliminar un producto por su id",async()=>{
        let idPrueba = "61f5a9f1bfe5c99891f80388";
        let arrayLengthBefore = await request.get(`/api/products/${idPrueba}`);

        let response = await request.delete(`/api/products/delete/${idPrueba}`);
        expect(response.status).to.eql(200);

        let response2 = await request.get(`/api/products/${idPrueba}`);
        expect(response2.body.products.length).to.not.eql(arrayLengthBefore.body.products.length);
        expect(response2.body.products[0]._id).to.not.include({_id:idPrueba});
    })
})
