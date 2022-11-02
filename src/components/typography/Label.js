export function LabelLarge({ children, ...props }) {
  return (
    <h4 className="label label-lg" {...props}>
      {children}
    </h4>
  )
}

export function LabelMedium({ children, ...props }) {
  return (
    <span className="label label-md" {...props}>
      {children}
    </span>
  )
}

export function LabelSmall({ children, ...props }) {
  return (
    <span className="label label-sm" {...props}>
      {children}
    </span>
  )
}
