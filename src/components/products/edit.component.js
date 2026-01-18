import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

function EditProduct(props) {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const apiKey = process.env.REACT_APP_API_KEY;

    const navigate = useNavigate();
    const { id } = useParams()

    const [name, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState(null)
    const [validationError,setValidationError] = useState({})
    
    useEffect(()=>{
        fetchProduct()
    },[])

    const fetchProduct = async () => {
        await axios.get(`${baseURL}/product/${id}`
            , {
                headers: {
                    'api_key': apiKey
                }
            }
        ).then(({data})=>{
            const { name, description } = data.product
            setTitle(name)
            setDescription(description)
            }).catch(({response:{data}})=>{
                Swal.fire({
                text:data.message,
                icon:"error"
            })
        })
    }

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
    };

    const updateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('_method', 'PATCH');
        formData.append('name', name)
        formData.append('description', description)

        if(image!==null){
            formData.append('image', image)
        }

        await axios.post(`${baseURL}/product/update/${id}`, formData,
            {
                headers: {
                    'api_key': apiKey
                }
            }
        )
        .then(({data})=> {
            Swal.fire({
                icon:"success",
                text:data.message
            })
            navigate("/product")
        })
        .catch(({response})=>{
            if(response.status===422){
                setValidationError(response.data.errors)
            }else{
                Swal.fire({
                    text:response.data.message,
                    icon:"error"
                })
            }
        })
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-12 col-md-6">
                        <div className="card bg-black bg-opacity-50">
                            <div className="card-body">
                                <h4 className="card-title text-center text-white">Update Product</h4>
                                {/* <hr /> */}
                                <div className="form-wrapper">
                                    {
                                        Object.keys(validationError).length >  0 && (
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="alert alert-danger">
                                                        <ul className="mb-0">
                                                        {
                                                            Object.entries(validationError).map(([key, value])=>(
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    <Form onSubmit={updateProduct}>
                                        <Row>
                                            <Col>
                                                <Form.Group controlId="Name">
                                                    <Form.Label className="text-white">Title</Form.Label>
                                                    <Form.Control className="bg-black bg-opacity-75 border-0 text-white" type="text" value={name} onChange={(event)=>{
                                                    setTitle(event.target.value)
                                                    }}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="my-3">
                                        <Col>
                                            <Form.Group controlId="Description">
                                                <Form.Label className="text-white">Description</Form.Label>
                                                    <Form.Control className="bg-black bg-opacity-75 border-0 text-white" as="textarea" rows={3} value={description}
                                                    onChange={(event) => {
                                                        setDescription(event.target.value);
                                                    }}/>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row className="my-3">
                                            <Col>
                                                <Form.Group  controlId="Image" className="mb-3">
                                                    <Form.Label className="text-white">Image</Form.Label>
                                                    <Form.Control className="bg-black bg-opacity-75 border-0 text-secondary" type="file" onChange={changeHandler} />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Link className="w-100 mt-4 btn btn-lg btn-danger" to={`/product`}>
                                            Batal
                                        </Link>
                                        <Button variant="secondary" className="w-100 mt-2" size="lg" block="block" type="submit">
                                            Update
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}    
// }

export default EditProduct;