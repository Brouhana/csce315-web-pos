import { HeaderLarge } from '../../../components/typography/Header'
import Input from '../../../components/Input'

function CheckoutMenuHeader({ title, searchFilter, setSearchFilter }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '6px',
      }}
    >
      <div>
        <HeaderLarge>{title}</HeaderLarge>
      </div>

      <div>
        <Input
          value={searchFilter}
          setValue={setSearchFilter}
          placeholder={title === 'All' ? 'Find...' : `Find ${title}...`}
        />
      </div>
    </div>
  )
}

export default CheckoutMenuHeader
