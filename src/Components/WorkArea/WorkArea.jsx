

const WorkArea = ({value, onChange}) => {

  return (
    <label>
      <p>Площадь работ (м<sup>2</sup>):</p>
      <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  )
}

export default WorkArea