import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

export const Footer = () => {

    const date = new Date();

    return (
        <footer>
            <Container>
            <Row>
                <Col className='text-center py-3'>Copyright {String.fromCharCode(169)} {date.getFullYear()} </Col>
            </Row>
            </Container>
        </footer>
    )
}
