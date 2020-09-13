import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';



export default function Searcher(){
    const [query,setQuery] = useState("");
    const [politicos,setPoliticos] = useState([]);
    const [isLoading, setLoading] = useState(false);


    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        axios.get(process.env.REACT_APP_API_URI+'/search?name='+query)
        .then((res) => {
            setPoliticos(res.data.queryResult);
            setLoading(false)
        })
        .catch((error)=> {
            alert("Error");
            setLoading(false);
        });
    }

    const handleKeyDown = event => {
        if(event.key === 'Enter'){
            handleSubmit(event)
        }
    }

    const Resultados = () => {
        if(politicos.length === 0){
            return <div></div>;
        }
        return politicos.map(politico => {
            return (
        <Row key={politico._id}>
            <Col md={{ span: 8, offset: 2 }}>
                <Card style={{marginTop: '10px'}}>
                    <Card.Header>{politico.candidato}</Card.Header>
                    <Card.Body>
                            <div><strong>Nivel:</strong> {politico.nivel}</div>
                    
                            <div><strong>Partido:</strong> {politico.partido}</div>
                            <div><strong>Pacto:</strong> {politico.pacto}</div>
                            <div><strong>Subpacto:</strong> {politico.subpacto}</div>
                            <div><strong>Comuna:</strong> {politico.comuna}</div>
                            <div><strong>Provincia:</strong> {politico.provincia}</div>
                            <div><strong>Region:</strong> {politico.region} </div>                      
                    </Card.Body>
                </Card>
            </Col>
        </Row>

            )
            })

    }

    return(
        <Container>

        <Row>
            <Col md={{ span: 8, offset: 2 }}>
            <InputGroup>
                <FormControl
                size="lg"
                placeholder="Ingrese busqueda"
                aria-describedby="basic-addon2"
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                />
                <InputGroup.Append>
                    <Button disabled={isLoading} 
                    variant="primary" 
                    onClick={handleSubmit} >
                        {isLoading ? 'Buscando...' : 'Buscar'}
                    </Button>
                </InputGroup.Append>
            </InputGroup>
            </Col>
        </Row>
        <Resultados/>
        </Container>

        
    )
}