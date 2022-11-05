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

  const { data: ingredientsRes } = useQuery(
    'ingredients',
    fetchIngredients,
  )

  const materialTheme = getTheme(DEFAULT_OPTIONS)
  const customTheme = {
    Table: `
      --data-table-library_grid-template-columns: 50% 25% 25%;
      height: 480px;
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

  if (ingredientsRes) {
    const ingredientsData = { nodes: ingredientsRes.data }

    return (
      <>
        <HeaderMedium>Inventory</HeaderMedium>

        <div className="manage-table">
          <CompactTable columns={columns} data={ingredientsData} theme={theme} layout={{ custom: true, fixedHeader: true }} />
        </div>
      </>
    )
  }
}

export default ManageInventory