import { memo } from "react";


export default memo(function ButtonChangeDetailed({ onClick }) {
  return (
    <button onClick={onClick}>Изменить</button>
  )
})
