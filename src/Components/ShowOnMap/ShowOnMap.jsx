
export default function ShowOnMap({link, style}) {
  return (
    <>
      {link && (
        <h4 className={style.linkMap}>
          <a className={style.link} href={link} target="_blank">
            Показать на карте
          </a>
        </h4>
      )}
    </>
  )
}
