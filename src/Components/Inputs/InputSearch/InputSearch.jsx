


export default function InputSearch({ searchTerm, onSearch}) {

const handleChange = (e) => {
  onSearch(e.target.value)
}

  return (
    <input type="text" placeholder="Поиск" value={searchTerm} onChange={handleChange}/>
  )
}


