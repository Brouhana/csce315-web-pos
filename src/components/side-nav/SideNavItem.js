import { NavLink } from 'react-router-dom'

function SideNavItem({ item }) {
  return (
    <li key={item} className="side-nav-item">
      <NavLink to={encodeURIComponent(item.toLowerCase())}>
        <button className="side-nav-button">{item}</button>
      </NavLink>
    </li>
  )
}

export default SideNavItem
