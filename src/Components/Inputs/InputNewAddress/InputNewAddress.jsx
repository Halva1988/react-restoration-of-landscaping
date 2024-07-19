

export default function InputNewAddress({ onChange, value }) {

  return (
    <label>
      <p>Адрес:</p>
      <input
        type="text"
        value={value}
        onChange={onChange}
        required
      />
    </label>
  )
}
