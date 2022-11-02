import { LabelMedium } from '../../../components/typography/Label'
import { MdRemove } from 'react-icons/md'
import { useSnackbar } from 'react-simple-snackbar'

function CheckoutItem({ name, price, count }) {
  const options = {
    position: 'bottom',
    style: {
      backgroundColor: 'var(--black)',
      color: 'var(--white)',
      fontFamily: 'Inter',
      fontSize: '18px',
      padding: '6px',
      textAlign: 'left',
      fontWeight: 600,
      borderRadius: '6px',
      marginLeft: '12px',
    },
    closeStyle: {
      fontSize: '16px',
    },
  }

  const [openSnackbar, closeSnackbar] = useSnackbar(options)

  function handleRemove() {
    openSnackbar(`Removed ×1 ${name}`)
  }

  return (
    <div class="checkout-cart-item">
      <div>
        <LabelMedium style={{ fontWeight: 600, marginBottom: '3px' }}>
          <span style={{ color: '#3e3e3e' }}>{count > 1 && `×${count} `}</span>
          {name}
        </LabelMedium>
        <LabelMedium style={{ color: '#3e3e3e' }}>
          {count > 1 && (
            <div className="checkout-cart-item-badge">
              ${(price * count).toFixed(2)}
            </div>
          )}
          ${price}
        </LabelMedium>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <button
          className="checkout-remove-item-button"
          onClick={() => handleRemove()}
        >
          <MdRemove className="checkout-item-icon" />
        </button>
      </div>
    </div>
  )
}

export default CheckoutItem
