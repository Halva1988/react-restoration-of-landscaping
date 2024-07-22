import { memo } from "react"


const InputWorkArea = memo(function InputWorkArea({ onChange, value }) {

  return (
    <label>
      <p>Площадь работ (м<sup>2</sup>):</p>
      <input
        type="number"
        value={value}
        onChange={onChange}
        min="1"
      />
    </label>
  )
})

export default InputWorkArea