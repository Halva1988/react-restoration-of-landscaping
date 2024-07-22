

export default function InputNewAddress({ onChange, value }) {
console.log("render InputNewAddress");
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
