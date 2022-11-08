import { Stack, TextField } from '@mui/material';
import { FaSearch } from 'react-icons/fa';

function ManageSearch({ name, property, data, setData, pagination }) {
  function handleSearch(event) {
    setData({ 
      nodes: data.nodes.filter((item) => 
        item[property].toLowerCase().includes(event.target.value.toLowerCase())
      ) 
    })

    pagination.fns.onSetPage(0)
  }

  return(
    <Stack spacing={10}>
      <TextField label={`Search ${name}`} icon={<FaSearch />} onChange={(event) => handleSearch(event)} size="small" />
    </Stack>
  )

}

export default ManageSearch