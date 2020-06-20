import React from 'react'
import { Carousel } from 'antd';

const IntroCarousel = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    autoplaySpeed: 5500,
    slidesToShow: 1,
    rtl: true,
  }

  return (
    <Carousel {...settings} autoplay style={{ height: '200px' }}>
      <div>
        <h4>🥑</h4>
        <h3>איך זה עובד? הזינו את המוצרים שאכלתם לפי כל ארוחה (אם לא מצאתם, אפשר ורצוי להוסיף בעצמכם)</h3>
      </div>
      <div>
        <h4>💾</h4>
        <h3> בסיום, שמרו את התפריט בלחצן התחתון</h3>
      </div>
      <div>
        <h4>📊</h4>
        <h3> צפו בגרפים המתארים את צריכת הקלוריות היומית וההתפלגות שלה (לפי פחמימות, חלבונים ושומנים)</h3>
      </div>
      <div>
        <h4>📆</h4>
        <h3> בכל זמן שתרצו, דפדפו בתאריכים קודמים לצפייה בתפריטים ששמרתם</h3>
      </div>
      <div>
        <h4>☁️</h4>
        <h3>באפליקציה זו תוכלו לחשב את התזונה היומית שלכם, לנתח אותה, ולשמור את כל המידע בענן</h3>
      </div>
    </Carousel>
  )
}
export default IntroCarousel;
