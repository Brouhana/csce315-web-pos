function Input({ value, setValue, placeholder }) {
  function handleChange(e) {
    setValue(e.target.value)
  }

  return (
    <input
      className="input"
      value={value}
      onChange={(e) => handleChange(e)}
      placeholder={placeholder}
    />
  )
}

export default Input
