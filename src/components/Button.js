import Spinner from './Spinner'

function Button({
  size,
  type,
  fullWidth,
  isLoading,
  onClick,
  disabled,
  children,
}) {
  let buttonClass = 'btn'

  buttonClass = fullWidth ? buttonClass + ' btn-full' : buttonClass

  switch (size) {
    case 'lg':
      buttonClass += ' btn-lg'
      break
    case 'sm':
      buttonClass += ' btn-sm'
      break
  }

  switch (type) {
    case 'secondary':
      buttonClass += ' btn-secondary'
      break
    default:
      buttonClass += ' btn-primary'
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={buttonClass}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  )
}

export default Button
