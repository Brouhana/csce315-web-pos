import { useContext } from 'react'
import { MdAdd } from 'react-icons/md'

import { LabelLarge, LabelMedium } from '../../../components/typography/Label'
import { CheckoutCartContext } from '../../../contexts/CheckoutCartContext'
import Skeleton from '../../../components/Skeleton'

function generateMenuCategoryColor(str) {
  // adapted from https://codepen.io/sergiopedercini/pen/RLJYLj
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 6) - hash)
  }
  let h = hash % 375
  return `hsl(${h}, 100%, 45%)`
}

function MenuItem({ item, itemsIsLoading }) {
  const { setCheckoutCartItems } = useContext(CheckoutCartContext)

  function handleClick() {
    setCheckoutCartItems((prev) => [...prev, item])
  }

  const menuCategoryColor = itemsIsLoading
    ? 'var(--white)'
    : generateMenuCategoryColor(item.category)

  if (itemsIsLoading) {
    return (
      <button
        className="menu-item"
        style={{
          borderColor: menuCategoryColor,
        }}
      >
        <div>
          <LabelLarge style={{ marginBottom: '6px' }}>
            <Skeleton width="150px" height="22px" />
          </LabelLarge>
          {/* <LabelMedium style={{ fontWeight: 500 }}>
            <Skeleton width="100%" height="16px" />
            <Skeleton width="150px" height="16px" />
          </LabelMedium> */}
          <LabelMedium>
            <Skeleton width="50px" height="16px" />
          </LabelMedium>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <MdAdd className="menu-item-icon" />
        </div>
      </button>
    )
  }

  return (
    <button
      className="menu-item"
      style={{
        borderColor: menuCategoryColor,
      }}
      onClick={() => handleClick()}
    >
      <div>
        <LabelLarge style={{ marginBottom: '6px' }}>{item.name}</LabelLarge>
        {/* <LabelMedium style={{ marginBottom: '10px' }}>
          {item?.description}
        </LabelMedium> */}
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
