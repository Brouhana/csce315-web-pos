import { Outlet } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system'
import ManageSideNav from './components/ManageSideNav'

function Manage() {
  return (
    <Container fluid>
      <Row>
        <Col md={2.5}>
          <br />
          <ManageSideNav />
        </Col>
        <Col>
          <br />
          <Outlet />
        </Col>
      </Row>
    </Container>
  )
}

export default Manage