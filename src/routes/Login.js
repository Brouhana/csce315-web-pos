import { Container, Row, Col } from 'react-grid-system'
import {
  HeaderLarge,
  HeaderMedium,
  HeaderSmall,
} from '../components/typography/Header'
import { LabelLarge } from '../components/typography/Label'
import Button from '../components/Button'
import { RESTAURANT_NAME } from '../constants'

function Login() {
  return (
    <Container style={{ maxWidth: '1000px', marginTop: '30vh' }}>
      <Row>
        <Col xs={12} md={8}>
          <HeaderLarge>Choose a store</HeaderLarge>
          <Button size="lg">Start Order</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
