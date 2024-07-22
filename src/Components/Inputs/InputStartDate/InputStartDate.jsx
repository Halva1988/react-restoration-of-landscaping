import { memo } from "react";


export default memo(function InputStartDate({ onChange, value }) {
  
  return (
    <label>
      <p>Дата начала работ:</p>
      <input
        type="date"
        value={value}
        onChange={onChange}
        required
      />
    </label>
  )
})
