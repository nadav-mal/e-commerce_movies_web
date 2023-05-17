import React from 'react';
import Search from './components/Search'
import 'bootstrap/dist/css/bootstrap.min.css';// This is not needed since we imported it to package.json
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Container, Row } from 'react-bootstrap';
import Title from './components/Title'
const App = () => {
    return (
        <div>
            <Container>
                <Title/>
                <Search/>
            </Container>y
        </div>
    );
};

export default App;
