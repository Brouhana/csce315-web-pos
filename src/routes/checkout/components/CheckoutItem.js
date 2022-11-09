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
        <LabelMedium style={{ fontWeight: 600 }}>
          <div
            className="checkout-cart-item-badge"
            style={{ marginRight: '8px' }}
          >
            ×{count}
          </div>
          {name}
        </LabelMedium>
      </div>
      <div
        style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
      >
        <div style={{ marginRight: '5px' }}>
          <LabelMedium style={{ color: '#3e3e3e' }}>
            ${groupedPrice}
          </LabelMedium>
        </div>
        <div style={{ marginLeft: '5px' }}>
          <button
            className="checkout-remove-item-button"
            onClick={() => handleRemove()}
          >
            <MdRemove className="checkout-item-icon" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItem
