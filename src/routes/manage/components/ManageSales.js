import { HeaderMedium } from "../../../components/typography/Header";
import axios from 'axios'
import { SERVER_URL } from '../../../constants'
import { useQuery } from 'react-query'
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme'
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui'
import { usePagination } from '@table-library/react-table-library/pagination';
import { Stack, TablePagination } from '@mui/material';
import { useState } from "react";
import Button from "../../../components/Button";

function ManageSales() {
  const [isLoading, setIsLoading] = useState(false)

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
      --data-table-library_grid-template-columns: 10% 75% 15%;
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

  const [ salesData, setSalesData ] = useState({ nodes: [] })

  const pagination = usePagination(salesData, {
    state: {
      page: 0,
      size: 7,
    },
    onChange: onPaginationChange,
  })

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  function renderTable() {
    setIsLoading(true)

    if (salesRes) {
      setSalesData({ nodes: salesRes.data })
      setIsLoading(false)
    }
  }

  return (
    <>
      <HeaderMedium>Sales</HeaderMedium>

      <div className="manage-table">
        <CompactTable columns={columns} data={salesData} theme={theme} layout={{ custom: true, fixedHeader: true }} pagination={pagination} />
      </div>

      <br />
        <Stack spacing={10}>
          <TablePagination
            count={salesData.nodes.length}
            page={pagination.state.page}
            rowsPerPage={pagination.state.size}
            rowsPerPageOptions={[1, 2, 5, 7]}
            onRowsPerPageChange={(event) =>
              pagination.fns.onSetSize(parseInt(event.target.value, 10))
            }
            onPageChange={(event, page) => pagination.fns.onSetPage(page)}
          />
        </Stack>
      <br />

      <Button
        size="lg"
        fullWidth
        isLoading={isLoading}
        onClick={() => renderTable()}
      >
        Render Table
      </Button>
    </>
  )
}

export default ManageSales