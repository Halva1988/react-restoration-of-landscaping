import { memo, useState } from "react";
import style from "./InputPhoto.module.css";
import btn from "../../ButtonChangeDetailed/ButtonChangeDetailed.module.css"

export default memo(function InputPhoto({ onChange }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files)
  }

  const addFiles = () => {
    onChange(files)
  }

  return (
    <div className={style.addPhoto}>
      <input type="file" multiple onChange={handleFileChange} />
      <button className={`${btn.btn} ${style.btn}`} onClick={addFiles}>Добавить фото</button>
    </div>
  )
})
