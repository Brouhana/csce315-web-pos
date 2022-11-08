import { HeaderMedium } from "../../../components/typography/Header";
import axios from 'axios'
import { SALES_THEME, SERVER_URL } from '../../../constants'
import { useTheme } from '@table-library/react-table-library/theme'
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui'
import { Stack, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { usePagination } from '@table-library/react-table-library/pagination';
import Button from "../../../components/Button";
import ManageTable from "./ManageTable";

function ManageSales() {
  const [ isLoading, setIsLoading ] = useState(false)

  const [ fromInput, setFromInput ] = useState("")
  const [ toInput, setToInput ] = useState("")
  
  const [ storedData, setStoredData ] = useState({ nodes: [] })
  const [ displayedData, setDisplayedData ] = useState({ nodes: [] })

  const fetchMenuItems = async () => {
    return await axios.get(`${SERVER_URL}/menu`)
  }

  const { data: menuData } = useQuery(
    'menuItems',
    fetchMenuItems,
  )

  useEffect(() => {
    renderTable()
  }, [])

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

  const materialTheme = getTheme(DEFAULT_OPTIONS)
  const theme = useTheme([materialTheme, SALES_THEME])

  const pagination = usePagination(displayedData, {
    state: {
      page: 0,
      size: 5,
    },
  })

  async function renderTable() {
    if (storedData.nodes.length === 0) {
      let salesRes = await axios.get(`${SERVER_URL}/sales`)

      if (salesRes) {
        setDisplayedData({ nodes: salesRes.data })
        setStoredData({ nodes: salesRes.data })
      }
    } else {
      setIsLoading(true)

      setDisplayedData({ nodes: filterSalesData(fromInput, toInput) })
      pagination.fns.onSetPage(0)

      setIsLoading(false)
    }
  } 

  function filterSalesData(from, to) {
    if (from && to) {
      return storedData.nodes.filter((item) => 
        item.timestamp.toString() >= from && item.timestamp.toString() <= to
      )
    } else if (from) {
      return storedData.nodes.filter((item) => 
        item.timestamp.toString() >= from
      )
    } else if (to) {
      return storedData.nodes.filter((item) => 
        item.timestamp.toString() <= to
      )
    } 

    return storedData.nodes
  }

  return(
    <>
      <HeaderMedium>Sales</HeaderMedium>

      <ManageTable 
        columns={columns}
        displayedData={displayedData}
        theme={theme}
        pagination={pagination}
      />

      <Stack direction="row" spacing={2}>
        <TextField 
          id="from-field"
          label="From"
          fullWidth
          placeholder={"YYYY-MM-DD"}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setFromInput(event.target.value)}
        />

        <TextField 
          id="to-field"
          label="To"
          fullWidth
          placeholder={"YYYY-MM-DD"}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setToInput(event.target.value)}
        />

        <Button
          size="lg"
          fullWidth
          isLoading={isLoading}
          onClick={() => renderTable()}
        >
          Render Table
        </Button>
      </Stack>
    </>
  )
}

export default ManageSales