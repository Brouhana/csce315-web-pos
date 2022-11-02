import Spinner from './Spinner'

function Button({ size, fullWidth, isLoading, onClick, children }) {
  let buttonClass = 'btn btn-primary'

  buttonClass = fullWidth ? buttonClass + ' btn-full' : buttonClass

  switch (size) {
    case 'lg':
      buttonClass += ' btn-lg'
      break
    case 'sm':
      buttonClass += ' btn-sm'
      break
  }

  if (isLoading) {
    return (
      <button type="button" onClick={onClick} className={buttonClass} disabled>
        <Spinner />
      </button>
    )
  }

  return (
    <button type="button" onClick={onClick} className={buttonClass}>
      {children}
    </button>
  )
}

export default Button
