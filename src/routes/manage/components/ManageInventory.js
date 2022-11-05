import { HeaderMedium } from "../../../components/typography/Header";
import axios from 'axios'
import { SERVER_URL } from '../../../constants'
import { useQuery } from 'react-query'
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme'
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui'

function ManageInventory() {
  const columns = [
    {label: 'Name', renderCell: (item) => item.item_name},
    {label: 'Amount', renderCell: (item) => item.item_amount},
    {label: 'Storage Location', renderCell: (item) => item.storage_location.charAt(0).toUpperCase() + item.storage_location.slice(1)},
  ]

  const fetchIngredients = async () => {
    return await axios.get(`${SERVER_URL}/ingredients`)
  }

  const { data } = useQuery(
    'ingredients',
    fetchIngredients,
  )

  const materialTheme = getTheme(DEFAULT_OPTIONS)
  const customTheme = {
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

  if (data) {
    const ingredientsData = { nodes: data.data }

    return (
      <>
        <HeaderMedium>Inventory</HeaderMedium>

        <div className="manage-inventory-table">
          <CompactTable columns={columns} data={ingredientsData} theme={theme} layout={{ fixedHeader: true }} />
        </div>
      </>
    )
  }
}

export default ManageInventory