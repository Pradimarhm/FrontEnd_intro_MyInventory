import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
    const baseURL = process.env.REACT_APP_BASE_URL;
    const apiKey = process.env.REACT_APP_API_KEY;

    const navigate = useNavigate();

    const [name, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const [image, setImage] = useState()
    const [validationError, setValidationError] = useState({});

    const createProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        // formData.append('image', image)

        await axios
        .post(`${baseURL}/product/create`, formData,
            {
                headers: {
                    'api_key': apiKey
                }
            }
        ).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message,
            });
            navigate("/product");
        })

        .catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors);
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error",
                });
            }
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card bg-black bg-opacity-50">
                        <div className="card-body">
                            <h4 className="card-title text-center text-white">Create Product</h4>
                            {Object.keys(validationError).length > 0 && (
                                <div className="row">
                                    <div className="col-12">
                                        <div className="alert alert-danger">
                                            <ul className="mb-0">
                                                {Object.entries(validationError).map(([key, value]) => (
                                                    <li key={key}>{value}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <Form onSubmit={createProduct}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="Name">
                                            <Form.Label className="text-white">Name</Form.Label>
                                            <Form.Control
                                                className="bg-black bg-opacity-75 border-0 text-white"
                                                type="text"
                                                value={name}
                                                onChange={(event) => {
                                                setTitle(event.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row className="my-3">
                                    <Col>
                                        <Form.Group controlId="Description">
                                            <Form.Label className="text-white">Description</Form.Label>
                                            <Form.Control
                                                className="bg-black bg-opacity-75 border-0 text-white"
                                                as="textarea"
                                                rows={3}
                                                value={description}
                                                onChange={(event) => {
                                                    setDescription(event.target.value);
                                                }}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="my-4 justify-content-end px-3 gap-2">
                                    {/* <Button variant="secondary" className="mt-2 w-25" size="lg" block="block" type="submit">
                                        Batal
                                    </Button> */}
                                    <Button variant="secondary" className="mt-2 w-100" size="lg" block="block" type="submit">
                                        Save
                                    </Button>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
