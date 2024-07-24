

export default function InputPhoto({onChange}) {
  const handleFileChange = (e) => {
    const files = e.target.files
    onChange(files)
  }

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange}/>
    </div>
  )
}
