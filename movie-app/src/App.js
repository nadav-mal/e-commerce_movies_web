import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Container } from 'react-bootstrap';
import Navbar from './components/utils/Navbar';
import SearchComponent from './components/searchPage/SearchComponent';
import Cart from './components/cartPage/Cart';
import HomePage from "./components/homePage/HomePage";
const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Container>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/search" element={<SearchComponent />} />
                        <Route path="/cart" element={<Cart/>} />
                    </Routes>
                </Container>
            </div>
        </Router>
    );
};

export default App;
