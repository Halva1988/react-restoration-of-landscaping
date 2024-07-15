import { useState } from "react";
import { addAddresses } from "../../DB/indexedDB";
import style from './NewAddresses.module.css';
import Wrapper from "../Wrapper/Wrapper";
import AddButton from "../AddButton/AddButton";


const NewAddresses = () => {
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState('');
  const [workArea, setWorkArea] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address && startDate && workArea) {
      try {
        await addAddresses({address, startDate, workArea});
        setAddress('');
        setStartDate('');
        setWorkArea('');
      } catch (error) {
        console.error(error); //!TODO Add error component
      }
    } else {
      alert('Заполните все поля')
    }
  }

  return (
    <Wrapper>
      <form className={style.form}>
        <label>
          Адрес:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <label>
          Дата начала работ:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </label>
        <label>
          Площадь работ:
          <input type="text" value={workArea} onChange={(e) => setWorkArea(e.target.value)} />
        </label>
        <AddButton onClick={handleSubmit}>Добавить адрес</AddButton>
      </form>
    </Wrapper>
  )
}

export default NewAddresses;