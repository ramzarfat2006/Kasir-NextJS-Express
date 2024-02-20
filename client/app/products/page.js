"use client"

import Sidebar from "@/components/Sidebar";
import Wrapper from "@/components/Wrapper";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Products(){
    const [ formProduct, setFormProduct ] = useState({
        name: "",
        quantity: "",
        description: "",
        price: ""
    })

    const [ product, setProduct ] = useState([])

    const handleProduct = async(e) => {
        e.preventDefault()

        const productAPI = await fetch("http://localhost:8000/api/v1/products", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(formProduct)
        })

        const result = await productAPI.json()
        console.log(result)

        setProduct([...product, result.data])

        setDataProduct([...dataProduct, result.data])

        buttonClose()
    }

    const [tampilkan,setTampilkan] = useState(false)

    const handleModals = () => {
        setTampilkan(true)
    }

    const buttonClose = () => {
        setTampilkan(false)
    }

    // State data API
    const [dataProduct, setDataProduct] = useState([])

    useEffect(() => { 
        const ambilData = async() => {
        const ambil = await fetch("http://localhost:8000/api/v1/products")
        const ambilJSON = await ambil.json()
        setDataProduct(ambilJSON.data)
    }
    ambilData()
    },[])

    return(
        <>
        <Sidebar />
        <Wrapper childrenElement={<>
        <div className="ms-3 mb-4">
            <h2>Product</h2>
            <Button className="shadow" variant="success" onClick={handleModals}>Tambah Product</Button>
        </div>
        <Modal show={tampilkan}>
        <Modal.Header>
          <Modal.Title>Tambah Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label>Nama Barang</Form.Label>
        <Form.Control type="text" value={formProduct.name} onChange={(e) => setFormProduct({...formProduct, name: e.target.value})} placeholder="Nama Barang" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Kuantitas</Form.Label>
        <Form.Control type="text" value={formProduct.quantity} onChange={(e) => setFormProduct({...formProduct, quantity: e.target.value})} placeholder="Jumlah Barang" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Deskripsi</Form.Label>
        <Form.Control type="text" value={formProduct.description} onChange={(e) => setFormProduct({...formProduct, description: e.target.value})} placeholder="Deskripsi" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Harga</Form.Label>
        <Form.Control type="text" value={formProduct.price} onChange={(e) => setFormProduct({...formProduct, price: e.target.value})} placeholder="Harga Barang" />
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={buttonClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
      <Table responsive="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Kuantitas</th>
            <th>Deskripsi</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
            {dataProduct.map((product, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.description}</td>
            <td>{product.price}</td>
            <td>
              <Button variant="warning">Update</Button>{' '}
              <Button variant="danger">Delete</Button>{' '}
            </td>
          </tr>
          ))}
        </tbody>
      </Table>
    </div>
        </> } />
        </>
    )
}