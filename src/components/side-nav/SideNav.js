import SideNavItem from './SideNavItem'

function SideNav({ items }) {
  return (
    <div className="side-nav">
      <ul class="side-nav-items">
        {items.map((item) => {
          return <SideNavItem item={item} />
        })}
      </ul>
    </div>
  )
}

export default SideNav
