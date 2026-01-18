import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import Swal from 'sweetalert2'

function ListProduct(props) {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetchProducts()
    },[])

    const fetchProducts = async () => {
        await axios.get(`http://localhost:8000/api/product`).then(({data})=>{
            setProducts(data)
        })
    }

    const deleteProduct = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result)=> {
            return result.isConfirmed
        })

        if (!isConfirm){
            return;
        }

        await axios.delete(`http://localhost:8000/api/product/delete/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            fetchProducts()
        }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
        })
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <Link className='btn btn-secondary mb-2 float-end' to={"/product/create"}>
                        Create Product
                    </Link>
                </div>
                <div className='col-12'>
                    <div className='card card-body bg-black bg-opacity-50'>
                        <div className='table-responsive'>
                            <table className="table table-borderless mb-0 text-start">
                                <thead>
                                    <tr>
                                        <th className='col bg-transparent text-white'>Name</th>
                                        <th className='col bg-transparent text-white'>Description</th>
                                        <th className='col bg-transparent text-white'>Action</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {
                                        products.length > 0 && (
                                            products.map((row, key)=>(
                                                <tr className='col' key={key}>
                                                    <td className='bg-transparent text-white align-content-center'>{row.name}</td>
                                                    <td className='bg-transparent text-white align-content-center'>{row.description}</td>
                                                    <td className='bg-transparent text-white align-content-center'>
                                                        <Link className='w-auto me-4 btn btn-secondary' to={`/product/edit/${row.id}`}>Edit</Link>
                                                        <Button className='w-auto' variant='danger' onClick={()=> deleteProduct(row.id)}>Delete</Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListProduct;