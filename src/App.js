import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import CreateProduct from './components/products/create.component';
import EditProduct from "./components/products/edit.component";
import ListProduct from "./components/products/list.component";

function App() {
  return (
    <div className="bg-dark min-vh-100 text-white">
      <Router>
        <Navbar bg="black">
          <Container>
            <Link to={"/"} className="navbar-brand text-white">
              Basic Crud App
            </Link>
          </Container>
        </Navbar>

        <Container className="mt-5">
          <Row>
            <Col md="12">
              <Routes>
                <Route path="/product/create" element={<CreateProduct />} />
                <Route path="/product/edit/:id" element={<EditProduct />} />
                <Route exact path='/product' element={<ListProduct />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>

    // <div className="App bg-black h-100">
    //   <Router>
    //     <Routes>
    //       {/* Halaman utama (misal daftar produk) */}
    //       <Route path="/" element={<div className="App-header">
    //         <img src={logo} className="App-logo" alt="logo" />
    //         <p>
    //           Edit <code>src/App.js</code> and save to reload.
    //         </p>
    //         <a
    //           className="App-link"
    //           href="https://reactjs.org"
    //           target="_blank"
    //           rel="noopener noreferrer"
    //         >
    //           Learn React
    //         </a>
    //       </div>} />
          
    //       {/* Halaman tambah produk */}
    //       <Route path="/create" element={<CreateProduct />} />
    //     </Routes>
    //   </Router>
    // </div>
  );
}

export default App;

