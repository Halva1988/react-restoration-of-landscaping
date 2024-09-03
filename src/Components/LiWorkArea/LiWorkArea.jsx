
export default function LiWorkArea({ handleInputChange, style, work, title, name }) {

  
  return (
    <li className={style.li}>
      {name} <div className={style.wrapDiv}>
        =
        <input
          type="number"
          value={work}
          onChange={handleInputChange(title)}
        />
        м<sup>2</sup>
      </div>
    </li>
  )
}
