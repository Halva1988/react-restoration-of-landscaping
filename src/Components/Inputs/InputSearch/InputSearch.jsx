import style from './InputSearch.module.css';


export default function InputSearch({ searchTerm, onSearch}) {

const handleChange = (e) => {
  onSearch(e.target.value)
}

  return (
    <input className={style.input} type="text" placeholder="Поиск" value={searchTerm} onChange={handleChange}/>
  )
}


