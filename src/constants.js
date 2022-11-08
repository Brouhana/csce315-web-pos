export const SERVER_URL = 'http://127.0.0.1:8080/api'
export const RESTAURANT_NAME = 'Cabo Grille'
export const TX_SALES_TAX = '.0825'
export const SNACKBAR_STYLE = {
  position: 'bottom-center',
  style: {
    backgroundColor: 'var(--black)',
    color: 'var(--white)',
    fontFamily: 'Inter',
    fontSize: '18px',
    padding: '4px 0',
    textAlign: 'center',
    fontWeight: 600,
    borderRadius: '8px',
    boxShadow: 'rgb(0 0 0 / 22%) 0px 16px 48px',
  },
  closeStyle: {
    display: 'none',
  },
}
export const INVENTORY_THEME = {
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
  RowCell: `
    .input {
      background-color: inherit;
    }
  `,
}
export const SALES_THEME = {
  Table: `
    --data-table-library_grid-template-columns: 10% 75% 15%;
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