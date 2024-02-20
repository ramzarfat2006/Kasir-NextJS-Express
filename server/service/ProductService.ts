const db = require("../models")

// method bawaan sequelize CRUD

export interface ProductEntity{
    name:string,
    quantity:number,
    description:string,
    price:number
}

class ProductService{
    // Create Operation
    async store(data: ProductEntity){
       try{
        const result = await db.product.create({
            name: data.name,
            quantity: data.quantity,
            description: data.description,
            price: data.price
        })
        return result
       } catch (error){
            return error
       }
    }

    // Read Operation
    async getAll(){
        try {
            const products = await db.product.findAll()
            return products
        } catch (error) {
            return error
        }
    }
}

export default ProductService