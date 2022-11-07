import axios from 'axios'
import { useQuery } from 'react-query'

import SideNav from '../../../components/side-nav/SideNav'
import { SERVER_URL } from '../../../constants'

function CheckoutSideNav() {
  let menuCategories = []

  const fetchMenuItems = async () => {
    return await axios.get(`${SERVER_URL}/menu`)
  }

  const {
    isLoading: menuIsLoading,
    isError: menuIsError,
    data: menuData,
  } = useQuery('menuItems', fetchMenuItems)

  if (menuData) {
    menuCategories.push(
      menuData.data.map((item) => {
        return item.category
      }),
    )
    menuCategories = Array.from(new Set(menuCategories[0]))
    menuCategories = ['All', ...menuCategories.sort()]
  }

  if (menuIsError) console.error('Error getting menu data')

  return <SideNav items={menuCategories} itemsIsLoading={menuIsLoading} />
}

export default CheckoutSideNav
