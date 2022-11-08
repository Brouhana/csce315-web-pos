import { CompactTable } from '@table-library/react-table-library/compact';
import { usePagination } from '@table-library/react-table-library/pagination';
import { Stack, TablePagination } from '@mui/material';
import ManageSearch from "./ManageSearch";

function ManageTable({searchProps, columns, displayedData, theme }) {
  function renderSearch() {
    if (searchProps.render) {
      return(
        <ManageSearch name={searchProps.name} property={searchProps.property} data={searchProps.data} setData={searchProps.setData} pagination={pagination} />  
      )
    }
  }

  const pagination = usePagination(displayedData, {
    state: {
      page: 0,
      size: 5,
    },
  })

  return(
    <>
      {renderSearch()}

      <br />

      <div className="manage-table">
        <CompactTable 
          columns={columns} 
          data={displayedData} 
          theme={theme} 
          layout={{ custom: true }} 
          pagination={pagination} 
        />
      </div>

      <br />
        <Stack spacing={10}>
          <TablePagination
            count={displayedData.nodes.length}
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
    </>
  )
}

export default ManageTable