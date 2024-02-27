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

    const [ formUpdate, setFormUpdate ] = useState({
      name: "",
      quantity: "",
      description: "",
      price: ""
    })

    const [ editingProduct, setEditingProduct ] = useState(null)
    const [ showAddModal, setShowAddModal ] = useState(false)
    const [ showUpdateModal, setShowUpdateModal ] = useState(false)
    const [ productToUpdate, setProductToUpdate ] = useState(null)

    const handleUpdate = (productID) => {
      // useEffect(() => {
      const productToUpdate = dataProduct && dataProduct.find((product) => product.id === productID)

      setFormUpdate({
        name: productToUpdate.name,
        quantity: productToUpdate.quantity,
        description: productToUpdate.description,
        price: productToUpdate.price
      })
      setEditingProduct(productToUpdate)
      setProductToUpdate(productToUpdate)
      setShowUpdateModal(true)
    }
    // }, [productToUpdate]) 
    const handleUpdateProduct = async (e, productId) => {
      e.preventDefault()

      const updatedProducts = {
        name: formUpdate.name,
        quantity: formUpdate.quantity,
        description: formUpdate.description,
        price: formUpdate.price
      }

      const response = await fetch(`http://localhost:8000/api/v1/products/${productId}`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'PUT',
        body: JSON.stringify(formUpdate)
      })

      if(response.ok){
        const updatedProductData = await response.json()
        const editProduct = dataProduct.map((product) => 
          product.id === productId ? updatedProductData : product  
        )

        setDataProduct(editProduct)
        setShowUpdateModal(false)

      } else {
        console.error("Gagal melakukan update data")
      }
  }

  const handleDeleteProduct = async (productId) => {
    const response = await fetch(`http://localhost:8000/api/v1/products/${productId}`,{
      method: 'DELETE',
    })

    if(response.ok){
      const updatedProducts = dataProduct.filter((product) => product.id !== productId)
      setDataProduct(updatedProducts)
    } else {
      console.error("Gagal melakukan penghapusan data")
    }
  }

  const handleShowModal = () => setShowAddModal(true)
  const handleCloseModal = () => setShowAddModal(false)
  const handleCloseUpdateModal = () => setShowUpdateModal(false)

  // Render modal untuk tambah produk
  const renderAddProductModal = () => (
    <Modal show={showAddModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
            <Modal.Title>Tambah Produk</Modal.Title>
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
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button variant="primary" onClick={handleProduct}>Tambahkan</Button>
        </Modal.Footer>
    </Modal>
);

  // Render modal untuk update
  const renderUpdateProductModal = () => (
    <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
            <Modal.Title>Update Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label>Nama Barang</Form.Label>
        <Form.Control type="text" value={formUpdate.name} onChange={(e) => setFormUpdate({...formUpdate, name: e.target.value})} placeholder="Nama Barang" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Kuantitas</Form.Label>
        <Form.Control type="text" value={formUpdate.quantity} onChange={(e) => setFormUpdate({...formUpdate, quantity: e.target.value})} placeholder="Jumlah Barang" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Deskripsi</Form.Label>
        <Form.Control type="text" value={formUpdate.description} onChange={(e) => setFormUpdate({...formUpdate, description: e.target.value})} placeholder="Deskripsi" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Harga</Form.Label>
        <Form.Control type="text" value={formUpdate.price} onChange={(e) => setFormUpdate({...formUpdate, price: e.target.value})} placeholder="Harga Barang" />
      </Form.Group>
    </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdateModal}>Close</Button>
            <Button variant="primary" onClick={(e) => handleUpdateProduct(e, editingProduct.id)}>Simpan Perubahan</Button>
        </Modal.Footer>
    </Modal>
  );

    // const handleUpdateSubmit = async () => {
    //   try {
    //     const response = await fetch("http://localhost:8000/api/v1/products", {
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       method: 'PUT',
    //       body: JSON.stringify(formProduct)
    //     })

    //     if(response.ok){
    //       const updatedProducts = [...dataProduct]
    //       updatedProducts[editingIndex] = formProduct
    //       setDataProduct(updatedProducts)

    //       setFormProduct({
    //         name: "",
    //         quantity: "",
    //         description: "",
    //         price: ""
    //       })
    //       setEditingIndex(null)
    //       setTampilkan(false)
    //     } else {
    //       console.error("Gagal melakukan update data")
    //     }
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }

    // const [ product, setProduct ] = useState([])

    const handleProduct = async(e) => {
        e.preventDefault()

        // const productToUpdate = {...dataProduct[editingIndex], ...formProduct}
        // const response = await fetch(`http://localhost:8000/api/v1/products/${productToUpdate.id}`, {
        //   headers: {
        //     "Content-Type": "application/json"
        //   },
        //   method: 'PUT',
        //   body: JSON.stringify(productToUpdate)
        // })

        // if(response.ok){
        //   const updatedProducts = [...dataProduct]
        //   updatedProducts[editingIndex] = await response.json()
        //   setDataProduct(updatedProducts)

        //   setFormUpdate({
        //     name: "",
        //     quantity: "",
        //     description: "",
        //     price: ""
        //   })
        //   setEditingIndex(null)
        //   setTampilkan(false)
        // } else {
        //   console.error("Gagal melakukan update data")
        // }

        const productAPI = await fetch("http://localhost:8000/api/v1/products", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(formProduct)
        })

        const result = await productAPI.json()
        console.log(result)

        // setProduct([...product, result.data])

        setDataProduct([...dataProduct, result.data])

        buttonClose()
        setShowAddModal(false)
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
            <Button className="shadow" variant="success" onClick={handleShowModal}>Tambah Product</Button>
        </div>
        {renderAddProductModal()}
        {showUpdateModal && renderUpdateProductModal()}

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
              <Button onClick={() => handleUpdate(product.id)} variant="warning">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>  
              </Button>{' '}
              <Button onClick={() => handleDeleteProduct(product.id)} variant="danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
              </Button>{' '}
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