import { HeaderMedium } from "../../../components/typography/Header";
import axios from 'axios'
import { SERVER_URL } from '../../../constants'
import { useQuery } from 'react-query'
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme'
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui'
import { usePagination } from '@table-library/react-table-library/pagination';
import { Stack, TablePagination, TextField } from '@mui/material';
import { useState } from "react";
import Button from "../../../components/Button";
import { FaSearch } from 'react-icons/fa';

function ManageInventory() {
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isRendering, setIsRendering ] = useState(false)

  const [ nameInput, setNameInput ] = useState("")
  const [ amountInput, setAmountInput ] = useState(0)
  const [ storageInput, setStorageInput ] = useState("")

  const [ ingredientsData, setIngredientsData ] = useState({ nodes: [] })

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
    `,
    HeaderRow: `
      background-color: var(--secondary);
      color: var(--white);
    `,
    Row: `
      &:nth-of-type(odd) {
        background-color: var(--gray-0);
      }
    `,
  }
  const theme = useTheme([materialTheme, customTheme])

  const [ search, setSearch ] = useState("")

  const handleSearch = (event) => {
    setSearch(event.target.value);

    setIngredientsData({ 
      nodes: ingredientsRes.data.filter((item) => 
        item.item_name.toLowerCase().includes(search.toLowerCase())
      ) 
    })
  }

  const pagination = usePagination(ingredientsData, {
    state: {
      page: 0,
      size: 7,
    },
    onChange: onPaginationChange,
  })

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  async function updateInventory() {
    setIsLoading(true)

    if (nameInput && amountInput && storageInput) {
      await axios.post(`${SERVER_URL}/ingredients`, {
        id: 0,
        item_name: nameInput,
        item_amount: parseInt(amountInput, 10),
        storage_location: storageInput
      })

      setIsLoading(false)
    }
  }

  async function renderTable() {
    setIsRendering(true)

    let ingredientsRes = await axios.get(`${SERVER_URL}/ingredients`)

    if (ingredientsRes) {
      setIngredientsData({ nodes: ingredientsRes.data })
      pagination.fns.onSetPage(0)
      setIsRendering(false)
    }
  }

  return (
    <>
      <HeaderMedium>Inventory</HeaderMedium>

      <Stack spacing={10}>
        <TextField label="Search Ingredients" value={search} icon={<FaSearch />} onChange={handleSearch} size="small" />
      </Stack>

      <br />

      <div className="manage-table">
        <CompactTable 
          columns={columns} 
          data={ingredientsData} 
          theme={theme} 
          layout={{ custom: true, fixedHeader: true }} 
          pagination={pagination} 
        />
      </div>

      <br />
        <Stack spacing={10}>
          <TablePagination
            count={ingredientsData.nodes.length}
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

      <Stack direction="row" spacing={2}>
        <TextField 
          id="name-field"
          label="Name"
          fullWidth
          placeholder={"Enter Name"}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setNameInput(event.target.value)}
        />

        <TextField 
          id="amount-field"
          label="Amount"
          fullWidth
          placeholder={"Enter Amount"}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setAmountInput(event.target.value)}
        />

        <TextField 
          id="storage-field"
          label="Storage Location"
          fullWidth
          placeholder={"Warm/Cold"}
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setStorageInput(event.target.value)}
        />

        <Button
          size="lg"
          fullWidth
          isLoading={isLoading}
          onClick={() => updateInventory()}
        >
          Add Ingredient
        </Button>
      </Stack>

      <br />

      <Button
        size="md"
        fullWidth
        isLoading={isRendering}
        onClick={() => renderTable()}
      >
        Render Table
      </Button>
    </>
  )
}

export default ManageInventory