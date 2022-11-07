import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system'
import CheckoutSideNav from './components/CheckoutSideNav'
import CheckoutCart from './components/CheckoutCart'
import { CheckoutCartContext } from '../../contexts/CheckoutCartContext'

function Checkout() {
  const [checkoutCartItems, setCheckoutCartItems] = useState([])

  return (
    <CheckoutCartContext.Provider
      value={{ checkoutCartItems, setCheckoutCartItems }}
    >
      <Container fluid>
        <Row>
          <Col md={2}>
            <br />
            <CheckoutSideNav />
          </Col>
          <Col md={6.5}>
            <br />
            <Outlet />
          </Col>
          <Col md={3.5}>
            <CheckoutCart />
          </Col>
        </Row>
      </Container>
    </CheckoutCartContext.Provider>
  )
}

export default Checkout
