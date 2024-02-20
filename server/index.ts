import { Express, Request, Response } from "express"
import express from "express"
import ProductController from "./controller/ProductController"
import bodyParser from "body-parser"
import cors from "cors"

const app: Express = express()

app.use(bodyParser.json())
app.use(cors())

app.get("/hello", (req:Request, res:Response) => {
    res.json({
        message: "Hello World"
    })
})

const productController = new ProductController(app)
productController.setup()

app.listen(8000, () => {
    console.log("Server Berjalan Pada Port 8000")
})