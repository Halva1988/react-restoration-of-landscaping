

export default function TitleDateWork({ style, startDate }) {
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(startDate).toLocaleString("ru", option);

  return (
    <h3 className={style.dateWork}>Дата начала работ: {date}</h3>
  )
}
