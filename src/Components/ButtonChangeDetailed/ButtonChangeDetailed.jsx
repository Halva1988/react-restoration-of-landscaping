import { memo } from "react";


export default memo(function ButtonChangeDetailed({ onClick }) {
  console.log('click');
  return (
    <button onClick={onClick}>&#9997;</button>
  )
})
