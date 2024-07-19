import { updateInProgress } from "../../DB/indexedDB";
import style from "./CompletedButton.module.css";


export default function CompletedButton({ address, onComplete }) {
  const handleInProgress = async () => {
    await updateInProgress(address.id)
    onComplete()
  }

  return (
    <button onClick={handleInProgress} className={style.btn}>Завершить</button>
  )
}
