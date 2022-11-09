import axios from 'axios'
import { useContext, useState } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import { useSnackbar } from 'react-simple-snackbar'
import useSound from 'use-sound'

import Button from '../../../components/Button'
import { LabelLarge, LabelMedium } from '../../../components/typography/Label'
import { SERVER_URL, TX_SALES_TAX } from '../../../constants'
import { SNACKBAR_STYLE } from '../../../constants'
import { CheckoutCartContext } from '../../../contexts/CheckoutCartContext'
import purchaseSfx from '../../../sounds/purchase.mp3'
import CheckoutItem from './CheckoutItem'

function CheckoutCart() {
  const [isLoading, setIsLoading] = useState(false)
  const { checkoutCartItems, setCheckoutCartItems } = useContext(
    CheckoutCartContext,
  )
  const [play] = useSound(purchaseSfx)
  const [openSnackbar] = useSnackbar(SNACKBAR_STYLE)

  let grandTotal = 0.0,
    total = 0.0,
    salesTax = 0.0

  const groupedCartItems = checkoutCartItems.reduce((a, b) => {
    const i = a.findIndex((x) => x.id === b.id)
    return i === -1 ? a.push({ id: b.id, item: b, count: 1 }) : a[i].count++, a
  }, [])

  for (let i = 0; i < groupedCartItems.length; i++) {
    total += groupedCartItems[i].item.price * groupedCartItems[i].count
  }

  salesTax = total * TX_SALES_TAX
  grandTotal += salesTax + total

  async function handleSubmit() {
    setIsLoading(true)

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const payload = {
      menu_items_id: checkoutCartItems.map((item) => {
        return item.id
      }),
      employee_id: 1,
      total_sales_price: grandTotal,
    }

    const result = await axios.post(`${SERVER_URL}/sales`, payload, config)

    if (result.status === 200) {
      play()
      setCheckoutCartItems([])
      setIsLoading(false)
      openSnackbar('Order Created')
    }

    if (result.status !== 200) {
      setIsLoading(false)
      console.error('Error adding sale')
    }
  }

  function handleClear() {
    setCheckoutCartItems([])
    openSnackbar(`Order Cleared`)
  }

  return (
    <div className="checkout-cart">
      <div className="checkout-cart-header">
        <LabelLarge>Order</LabelLarge>
      </div>

      <div className="checkout-cart-body">
        <div className="checkout-cart-items">
          {groupedCartItems.length > 0 ? (
            <>
              {groupedCartItems.map((item, index) => {
                return (
                  <div key={index}>
                    <CheckoutItem
                      id={item.item.id}
                      name={item.item.name}
                      price={item.item.price}
                      count={item.count}
                    />
                  </div>
                )
              })}
              <div style={{ height: 'var(--sm)' }} />
              <Button size="sm" type="secondary" onClick={() => handleClear()}>
                Clear all
              </Button>
            </>
          ) : (
            <div className="checkout-cart-empty">
              <MdAddShoppingCart
                size={35}
                style={{ color: 'var(--gray-1)', marginBottom: 'var(--md)' }}
              />
              <LabelMedium style={{ color: 'var(--gray-1)' }}>
                Added items will appear here
              </LabelMedium>
            </div>
          )}
        </div>

        <div className="checkout-cart-footer">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '20px 0',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <LabelLarge>Tax</LabelLarge>
            </div>
            <div style={{ textAlign: 'right' }}>
              <LabelLarge>${salesTax.toFixed(2)}</LabelLarge>
            </div>
          </div>

          <Button
            size="lg"
            fullWidth
            isLoading={isLoading}
            onClick={() => handleSubmit()}
            disabled={grandTotal === 0.0}
          >
            Charge ${grandTotal.toFixed(2)}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutCart
