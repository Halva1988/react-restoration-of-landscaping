
const WorkArea = ({value, onChange}) => {

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

export default WorkArea