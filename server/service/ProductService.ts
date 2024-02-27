const db = require("../models")

// method bawaan sequelize CRUD
// create: ADD data
// findAll: GET semua data
// findOne: GET satu data
// update: PUT data
// destroy: DELETE data

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

    // Update Operation
    async edit(id: number, data: ProductEntity){
        try {
            const hasil = await db.product.update({
                name: data.name,
                quantity: data.quantity,
                description: data.description,
                price: data.price
            },
            { where: { id: id } } )
            return hasil
        } catch (error) {
            return error
        }
    }

    // Delete Operation
    async delete(id: number){
        try {
            const result = await db.product.destroy({
                where: { id: id },
            })
            return result
        } catch (error) {
            return error            
        }
    }
}

export default ProductService