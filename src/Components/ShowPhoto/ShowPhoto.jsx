import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function ShowPhoto({photos, style}) {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {
        photos.length > 1 ? (
          <Slider {...sliderSettings} className={style.slider}>
            {photos.map((photo, index) => (
              <div key={index}>
                <img src={photo} alt={`photo-${index}`} />
              </div>
            ))}
          </Slider>
        ) : (photos.length === 1 &&
          <div className={style.slider}>
            <img src={photos} alt={"photo"} />
          </div>
        )
      }
    </>
  )
}
