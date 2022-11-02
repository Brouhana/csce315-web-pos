import { useContext, useState } from 'react'
import Button from '../../../components/Button'
import { LabelLarge, LabelMedium } from '../../../components/typography/Label'
import CheckoutItem from './CheckoutItem'
import { CheckoutCartContext } from '../../../contexts/CheckoutCartContext'
import { SERVER_URL } from '../../../constants'
import axios from 'axios'
import { MdRestaurant } from 'react-icons/md'

function CheckoutCart() {
  const [isLoading, setIsLoading] = useState(false)
  const { checkoutCartItems, setCheckoutCartItems } = useContext(
    CheckoutCartContext,
  )
  let cartTotal = 0.0

  const groupedCartItems = checkoutCartItems.reduce((a, b) => {
    const i = a.findIndex((x) => x.id === b.id)
    return i === -1 ? a.push({ id: b.id, item: b, count: 1 }) : a[i].count++, a
  }, [])

  for (let i = 0; i < groupedCartItems.length; i++) {
    cartTotal += groupedCartItems[i].item.price * groupedCartItems[i].count
  }

  async function handleSubmit() {
    setIsLoading(true)

    console.log(checkoutCartItems)

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const payload = {
      menu_items_id: checkoutCartItems,
      employee_id: 1,
      total_sales_price: cartTotal,
    }

    const result = await axios.post(`${SERVER_URL}/sales`, payload, config)

    if (result.status === 200) {
      setIsLoading(false)
      setCheckoutCartItems([])
    }

    if (result.status !== 200) {
      setIsLoading(false)
      console.error('Error adding sale')
    }
  }

  return (
    <div className="checkout-cart">
      <div className="checkout-cart-header">
        <LabelLarge>Order</LabelLarge>
      </div>

      <div className="checkout-cart-body">
        <div className="checkout-cart-items">
          {groupedCartItems.length > 0 ? (
            groupedCartItems.map((item, index) => {
              return (
                <div key={index}>
                  <CheckoutItem
                    name={item.item.name}
                    price={item.item.price}
                    count={item.count}
                  />
                </div>
              )
            })
          ) : (
            <div className="checkout-cart-empty">
              <MdRestaurant
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
            <div>
              <LabelLarge>Total</LabelLarge>
            </div>
            <div>
              <LabelLarge>${cartTotal.toFixed(2)}</LabelLarge>
            </div>
          </div>

          <Button
            size="lg"
            fullWidth
            isLoading={isLoading}
            onClick={() => handleSubmit()}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutCart
