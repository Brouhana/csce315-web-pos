import { useState } from 'react'
import axios from 'axios'
import { Col, Row } from 'react-grid-system'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { HeaderLarge } from '../../../components/typography/Header'
import { SERVER_URL } from '../../../constants'
import MenuItem from './CheckoutMenuItem'
import CheckoutMenuHeader from './CheckoutMenuHeader'

function CheckoutMenu() {
  const [searchFilter, setSearchFilter] = useState('')
  const { menuCategoryName } = useParams()

  const fetchMenuItems = async () => {
    return await axios.get(`${SERVER_URL}/menu`)
  }

  const {
    isLoading: menuCategoryIsLoading,
    isError: menuCategoryIsError,
    data: menuCategoryData,
  } = useQuery('menuCategoryItems', fetchMenuItems, {
    select: (items) =>
      items.data.filter((item) =>
        menuCategoryName === 'all'
          ? item.category.toLowerCase()
          : item.category.toLowerCase() === menuCategoryName,
      ),
  })

  const categoryName =
    menuCategoryName.charAt(0).toUpperCase() + menuCategoryName.slice(1)

  if (menuCategoryIsError) {
    console.error(`Error getting menu items for category: ${menuCategoryName}`)
  }

  if (menuCategoryIsLoading) {
    return (
      <>
        <CheckoutMenuHeader
          title={categoryName}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <Row>
          {Array.from({ length: 6 }).map((index) => {
            return (
              <Col md={6} style={{ marginBottom: 'var(--lg)' }} key={index}>
                <MenuItem itemsIsLoading />
              </Col>
            )
          })}
        </Row>
      </>
    )
  }

  if (menuCategoryData) {
    return (
      <>
        <CheckoutMenuHeader
          title={categoryName}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <Row>
          {menuCategoryData
            .sort((a, b) => {
              return a.category.localeCompare(b.category)
            })
            .filter((item) => {
              return item.name
                .toLowerCase()
                .includes(searchFilter.toLowerCase())
            })
            .map((item) => {
              return (
                <Col md={6} style={{ marginBottom: 'var(--lg)' }} key={item.id}>
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
