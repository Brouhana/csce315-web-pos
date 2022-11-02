import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-grid-system'
import { useQuery } from 'react-query'
import axios from 'axios'
import { SERVER_URL } from '../../../constants'
import MenuItem from './MenuItem'
import { HeaderLarge } from '../../../components/typography/Header'

function CheckoutMenu() {
  const { menuCategoryName } = useParams()

  const fetchMenuItems = async () => {
    return await axios.get(`${SERVER_URL}/menu`)
  }

  const { isLoading, isError, data: menuCategoryData, error } = useQuery(
    'menuCategoryItems',
    fetchMenuItems,
    {
      select: (items) =>
        items.data.filter((item) =>
          menuCategoryName === 'all'
            ? item.category.toLowerCase()
            : item.category.toLowerCase() === menuCategoryName,
        ),
    },
  )

  if (menuCategoryData) {
    return (
      <>
        <HeaderLarge>
          {menuCategoryName.charAt(0).toUpperCase() + menuCategoryName.slice(1)}
        </HeaderLarge>
        <Row>
          {menuCategoryData
            .sort((a, b) => {
              return a.category.localeCompare(b.category)
            })
            .map((item) => {
              return (
                <Col md={6} style={{ marginBottom: '16px' }} key={item.id}>
                  <MenuItem item={item} />
                </Col>
              )
            })}
        </Row>
      </>
    )
  }
}

export default CheckoutMenu
