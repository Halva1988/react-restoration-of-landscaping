

export default function InputStartDate({ onChange, value }) {
  console.log("render InputStartDate");
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
}
