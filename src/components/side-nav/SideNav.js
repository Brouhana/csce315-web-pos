import SideNavItem from './SideNavItem'
import Skeleton from '../Skeleton'

function SideNav({ items, itemsIsLoading }) {
  return (
    <div className="side-nav">
      <ul className="side-nav-items">
        {itemsIsLoading
          ? Array.from({ length: 6 }).map(() => {
              return <Skeleton width="100%" height={72} />
            })
          : items.map((item) => {
              return <SideNavItem item={item} />
            })}
      </ul>
    </div>
  )
}

export default SideNav
