import { memo } from "react";


export default memo(function InputNewAddress({ onChange, value }) {
  
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
})
