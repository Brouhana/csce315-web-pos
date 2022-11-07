import { useContext } from 'react'
import { MdRemove } from 'react-icons/md'
import { useSnackbar } from 'react-simple-snackbar'

import { LabelMedium } from '../../../components/typography/Label'
import { SNACKBAR_STYLE } from '../../../constants'
import { CheckoutCartContext } from '../../../contexts/CheckoutCartContext'

function CheckoutItem({ id, name, price, count }) {
  const [openSnackbar] = useSnackbar(SNACKBAR_STYLE)
  const { checkoutCartItems, setCheckoutCartItems } = useContext(
    CheckoutCartContext,
  )

  function handleRemove() {
    const itemIndex = checkoutCartItems.findIndex((e) => e.id === id)

    setCheckoutCartItems([
      ...checkoutCartItems.slice(0, itemIndex),
      ...checkoutCartItems.slice(itemIndex + 1),
    ])

    openSnackbar(`Removed ×1 ${name}`)
  }

  price = price.toFixed(2)
  const groupedPrice = (price * count).toFixed(2)

  return (
    <div className="checkout-cart-item">
      <div>
        <LabelMedium style={{ fontWeight: 600, marginBottom: '3px' }}>
          <span style={{ color: '#3e3e3e' }}>{count > 1 && `×${count} `}</span>
          {name}
        </LabelMedium>
        <LabelMedium style={{ color: '#3e3e3e' }}>
          {count > 1 && (
            <div className="checkout-cart-item-badge">${price}</div>
          )}
          ${count > 1 ? groupedPrice : price}
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
