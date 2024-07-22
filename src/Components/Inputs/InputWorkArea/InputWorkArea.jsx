

const InputWorkArea = ({ onChange, value }) => {
console.log("render InputWorkArea");
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
}

export default InputWorkArea