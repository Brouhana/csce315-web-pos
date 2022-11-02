export function HeaderLarge({ children, ...props }) {
  return (
    <h1 className="header header-lg" {...props}>
      {children}
    </h1>
  )
}

export function HeaderMedium({ children, ...props }) {
  return (
    <h2 className="header" {...props}>
      {children}
    </h2>
  )
}

export function HeaderSmall({ children, ...props }) {
  return (
    <h3 className="header" {...props}>
      {children}
    </h3>
  )
}
