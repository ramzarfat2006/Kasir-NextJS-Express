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
}

export default ProductController