import { useContext } from 'react'
import { MdAdd } from 'react-icons/md'
import { LabelLarge, LabelMedium } from '../../../components/typography/Label'
import { CheckoutCartContext } from '../../../contexts/CheckoutCartContext'

function generateMenuCategoryColor(str) {
  // adapted from https://codepen.io/sergiopedercini/pen/RLJYLj
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 6) - hash)
  }
  let h = hash % 375
  return `hsl(${h}, 100%, 45%)`
}

function MenuItem({ item }) {
  const { setCheckoutCartItems } = useContext(CheckoutCartContext)

  function handleClick() {
    setCheckoutCartItems((prev) => [...prev, item])
  }

  return (
    <button
      className="menu-item"
      style={{
        borderColor: generateMenuCategoryColor(item?.category),
      }}
      onClick={() => handleClick()}
    >
      <div>
        <LabelLarge style={{ marginBottom: '6px' }}>{item?.name}</LabelLarge>
        <LabelMedium style={{ marginBottom: '10px' }}>
          {item?.description}
        </LabelMedium>
        <LabelMedium style={{ fontWeight: 500 }}>
          ${item?.price.toFixed(2)}
        </LabelMedium>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <MdAdd className="menu-item-icon" />
      </div>
    </button>
  )
}

export default MenuItem
