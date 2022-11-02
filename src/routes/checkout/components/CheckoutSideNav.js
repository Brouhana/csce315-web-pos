import axios from 'axios'
import { useQuery } from 'react-query'
import { SERVER_URL } from '../../../constants'
import SideNav from '../../../components/side-nav/SideNav'

function CheckoutSideNav() {
  let menuCategories = []

  const fetchMenuItems = async () => {
    return await axios.get(`${SERVER_URL}/menu`)
  }

  const { isLoading, isError, data: menuData, error } = useQuery(
    'menuItems',
    fetchMenuItems,
  )

  if (menuData) {
    menuCategories.push(
      menuData.data.map((item) => {
        return item.category
      }),
    )
    menuCategories = Array.from(new Set(menuCategories[0]))
    menuCategories = ['All', ...menuCategories]
  }

  if (menuData) {
    return <SideNav items={menuCategories} />
  }
}

export default CheckoutSideNav
