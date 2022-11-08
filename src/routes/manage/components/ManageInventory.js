import { HeaderMedium } from "../../../components/typography/Header";
import axios from 'axios'
import { INVENTORY_THEME, SERVER_URL } from '../../../constants'
import { useTheme } from '@table-library/react-table-library/theme'
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/material-ui'
import { Stack, TextField } from '@mui/material';
import { useEffect, useState } from "react";
import { usePagination } from '@table-library/react-table-library/pagination';
import Button from "../../../components/Button";
import ManageTable from "./ManageTable";

function ManageInventory() {
  const [ isLoading, setIsLoading ] = useState(false)

  const [ nameInput, setNameInput ] = useState("")
  const [ amountInput, setAmountInput ] = useState(0)
  const [ storageInput, setStorageInput ] = useState("")

  const [ storedData, setStoredData ] = useState({ nodes: [] })
  const [ displayedData, setDisplayedData ] = useState({ nodes: [] })

  useEffect(() => {
    renderTable()
  }, [])

  const columns = [
    {label: 'Name', renderCell: (item) => item.item_name},
    {
      label: 'Amount',
      renderCell: (item) => (
        <input
          type="text"
          style={{ width: '100%', border: 'none', fontSize: '1rem', padding: 0, margin: 0, backgroundColor: 'inherit' }}
          defaultValue={item.item_amount}
          tabIndex={0}
          onKeyDown={(event) => handleKeyDown(event, item.id, item.storage_location)}
        />
      )
    },
    {
      label: 'Storage Location',
      renderCell: (item) => (
        <select
          style={{ width: '100%', border: 'none', fontSize: '1rem', padding: 0, margin: 0, backgroundColor: 'inherit' }}
          defaultValue={item.storage_location.charAt(0).toUpperCase() + item.storage_location.slice(1)}
          onChange={(event) => handleUpdate(event.target.value, item.id, item.item_amount)}
        >
          <option value="Cold">Cold</option>
          <option value="Warm">Warm</option>
        </select>
      )
    },
  ]

  const materialTheme = getTheme(DEFAULT_OPTIONS)
  const theme = useTheme([materialTheme, INVENTORY_THEME])

  const pagination = usePagination(displayedData, {
    state: {
      page: 0,
      size: 5,
    },
  })

  async function renderTable() {
    let ingredientsRes = await axios.get(`${SERVER_URL}/ingredients`)

    if (ingredientsRes) {
      setDisplayedData({ nodes: ingredientsRes.data })
      setStoredData({ nodes: ingredientsRes.data })
    }
  }

  async function handleKeyDown(event, id, storage) {
    if (event.key === 'Enter') {
      event.target.blur()

      let intVal = parseInt(event.target.value, 10)
      let intId = parseInt(id, 10)

      await axios.put(`${SERVER_URL}/ingredients`, {
        id: intId,
        item_name: "",
        item_amount: intVal,
        storage_location: storage
      })

      renderTable()
    }
  } 

  async function handleUpdate(value, id, amount) {
    let intId = parseInt(id, 10)

    await axios.put(`${SERVER_URL}/ingredients`, {
      id: intId,
      item_name: "",
      item_amount: amount,
      storage_location: value
    })

    renderTable()
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

      renderTable()
    }

    setIsLoading(false)
  }

  return(
    <>
      <HeaderMedium>Inventory</HeaderMedium>

      <ManageTable 
        searchProps={{
          name: "Ingredients",
          property: "item_name",
          data: storedData,
          setData: setDisplayedData,
        }}
        columns={columns}
        displayedData={displayedData}
        theme={theme}
        pagination={pagination}
      />

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
    </>
  )
}

export default ManageInventory