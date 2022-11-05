import { HeaderMedium } from "../../../components/typography/Header";
import axios from 'axios'
import { SERVER_URL } from '../../../constants'
import { useQuery } from 'react-query'
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme'
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui'

function ManageSales() {
  const fetchMenuItems = async () => {
    return await axios.get(`${SERVER_URL}/menu`)
  }

  const { data: menuData } = useQuery(
    'menuItems',
    fetchMenuItems,
  )

  const columns = [
    {label: 'Timestamp', renderCell: (item) => item.timestamp},
    {
      label: 'Items Sold',
      renderCell: (item) => {
        let itemsArray = item.menu_items_id.map((id, index, array) => {
          let name = ""

          for (let i = 0; i < Object.keys(menuData.data).length; ++i) {
            if (id === menuData.data.at(i).id) {
              name = menuData.data.at(i).name
            }
          }

          return name
        })

        let groupedItemsArray = []
        
        itemsArray.forEach(item => {
          const index = groupedItemsArray.findIndex((x) => x.name === item)
          if (index === -1) {
            groupedItemsArray.push({ name: item, count: 1})
          } else {
            ++groupedItemsArray[index].count
          }
        })

        return groupedItemsArray.map((item, index, array) => {
          if (index === array.length - 1) {
            return item.name + ' x' + item.count
          }

          return item.name + ' x' + item.count + ', '
        })
      },
    },
    {label: 'Total Price', renderCell: (item) => item.total_sales_price},
  ]

  const fetchSales = async () => {
    return await axios.get(`${SERVER_URL}/sales`)
  }

  const { data: salesRes } = useQuery(
    'sales',
    fetchSales,
  )

  const materialTheme = getTheme(DEFAULT_OPTIONS)
  const customTheme = {
    Table: `
      --data-table-library_grid-template-columns: 15% 70% 15%;
    `,
    HeaderRow: `
      background-color: var(--secondary);
      color: var(--white);
    `,
    Row: `
      &:nth-child(odd) {
        background-color: var(--gray-0);
      }
    `,
  }
  const theme = useTheme([materialTheme, customTheme])

  if (salesRes) {
    const salesData = { nodes: salesRes.data }

    return (
      <>
        <HeaderMedium>Sales</HeaderMedium>

        <div className="manage-table">
          <CompactTable columns={columns} data={salesData} theme={theme} layout={{ custom: true, fixedHeader: true }} />
        </div>
      </>
    )
  }
}

export default ManageSales