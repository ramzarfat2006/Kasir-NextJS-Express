import { Express, Request, Response } from "express"
import ProductService from "../service/ProductService"
import { ProductEntity } from "../service/ProductService"

class ProductController{
    app: Express

    constructor(app: Express){
        this.app = app
    }

    setup(){
        this.app.post("/api/v1/products", this.create)
        this.app.get("/api/v1/products", this.findAll)
        this.app.put("/api/v1/products/:id", this.update)
        this.app.delete("/api/v1/products/:id", this.delete)
    }

    async create(req:Request, res:Response){
        const service = new ProductService()

        const { name, price, quantity, description } = req.body
        try {
            const data: ProductEntity = {
                name: name,
                quantity: parseInt(quantity),
                description: description,
                price: parseInt(price)
            }
            const hasil = await service.store(data)
            res.status(200).json({
                message: "Berhasil Menambahkan Product",
                data: hasil
            })
        } catch (error) {
            return res.status(500).json({
                message: "Terdapat Kesalahan di sisi server"
            })
        }
    }

    async findAll(req:Request, res:Response){
        const service = new ProductService()

        try {
            const hasil = await service.getAll()
            return res.status(200).json({
                message: "Berhasil Menampilkan Data",
                data: hasil
            })
        } catch (error) {
            return res.status(500).json({
                message: "Terdapat Kesalahan di sisi server"
            })
        }
    }

    async update(req:Request, res:Response){
        const service = new ProductService()
        const { id } = req.params
        const { name, price, quantity, description } = req.body

        try {
            const data: ProductEntity = {
                name: name,
                quantity: parseInt(quantity),
                description: description,
                price: parseInt(price)
            }

            const result = await service.edit(parseInt(id), data)

            return res.status(200).json({
                message: "Berhasil Memperbarui data",
                data: result
            })

        } catch (error) {
            console.error(error)
        }
    }

    async delete (req:Request, res:Response){
        const service = new ProductService()
        const { id } = req.params

        try {
            const result = await service.delete(parseInt(id))

            return res.status(200).json({
                message: "Berhasil menghapus data",
                data: result
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export default ProductController