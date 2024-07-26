
export default function LiWorkArea({ handleInputChange, style, work, title }) {

  
  return (
    <li className={style.li}>
      Асфальт <div className={style.wrapDiv}>
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
