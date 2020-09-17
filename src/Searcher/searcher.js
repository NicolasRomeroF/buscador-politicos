import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Row, Col, Tabs,Tab } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';



export default function Searcher(){
    const [key, setKey] = useState('politicos');
    const [query,setQuery] = useState("");
    const [politicos,setPoliticos] = useState([]);
    const [partidos,setPartidos] = useState([]);
    const [isLoading, setLoading] = useState(false);


    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        if(key==='politicos'){
            getPoliticos();
        }
        else{
            getPartidos();
        }
        
    }

    const getPoliticos = () => {
        axios.get(process.env.REACT_APP_API_URI+'/politico/search?name='+query)
        .then((res) => {
            setPoliticos(res.data.queryResult);
            setLoading(false)
        })
        .catch((error)=> {
            alert("Error");
            setLoading(false);
        });
    }

    const getPartidos = () => {
        axios.get(process.env.REACT_APP_API_URI+'/partido/search?name='+query)
        .then((res) => {
            setPartidos(res.data.queryResult);
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

    const ResultadosPoliticos = () => {
        if(politicos.length === 0){
            return <div></div>;
        }
        return politicos.map(politico => {
            return (
        <Row key={politico._id}>
            <Col md={{ span: 8, offset: 2 }}>
                <Card style={{marginTop: '10px'}}>
                    <Card.Header><strong>{politico.candidato}</strong></Card.Header>
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

    const ResultadosPartidos = () => {
        if(partidos.length === 0){
            return <div></div>;
        }
        return partidos.map(partido => {
            return (
        <Row key={partido._id}>
            <Col md={{ span: 8, offset: 2 }}>
                <Card style={{marginTop: '10px'}}>
                    <Card.Header>{partido.nombre}</Card.Header>

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
                <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                transition={false}
            >
                <Tab eventKey="politicos" title="politicos"/>

                
                <Tab eventKey="partidos" title="partidos"/>
                

                </Tabs>
            </Col>
        </Row>

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
        {key==='politicos' ? <ResultadosPoliticos/> : <ResultadosPartidos/>}
        </Container>

        
    )
}