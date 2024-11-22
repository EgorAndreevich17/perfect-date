import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwipeContext } from "../Context/SwipeContext";

import { CardsTags } from "../../CardsData";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Card.scss";

const Card = ({ card }) => {
  const { swipe, returnToSkipped, dislikeCard, addMessage, skipCard } =
    useSwipeContext();

  const tags = CardsTags;

  // Реф для управления слайдером
  const swiperRef = useRef(null);

  // Обработчик сброса слайдера на первый слайд
  const resetSlider = () => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(0, 0); // Сброс на первый слайд без анимации
    }
  };

  // Универсальный обработчик переключения карточек
  const handleAction = (action, ...args) => {
    resetSlider();
    action(...args);
  };

  return (
    <div className="card">
      <div className="swiper-wrapper">
        <Swiper
          loop={true}
          pagination={{ clickable: true }}
          className="swiper-container"
          onSwiper={(swiper) => {
            swiperRef.current = swiper; // Присваиваем экземпляр Swiper в реф
          }}
        >
          {card.pics.map((pic, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={pic}
                alt={`${card.activity}-${idx}`}
                className="card-image"
              />
              {/* Условный рендеринг контента в зависимости от индекса слайда */}
              {idx === 0 && (
                <div className="card-content">
                  <div className="card-content--title">{card.activity}</div>
                  <div className="tags">
                    {card.tags.map((tag, idx) => (
                      <span key={idx} className="tag">
                        {tags[tag]}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {idx === 1 && (
                <div className="card-content">
                  <p className="card-content--description">
                    {card.description}
                  </p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Фиксированные действия внизу карточки */}
      <div className="actions">
        <button
          className="return-button"
          onClick={() => handleAction(returnToSkipped)}
        >
          <img src="static/icons/return.png" alt={card.activity} />
        </button>
        <button
          className="close-button"
          onClick={() => handleAction(dislikeCard, card)}
        >
          <img src="static/icons/close.png" alt={card.activity} />
        </button>
        <button
          className="message-button"
          onClick={() => addMessage(card, "Ваше сообщение")}
        >
          <img src="static/icons/message.png" alt={card.activity} />
        </button>
        <button
          className="like-button"
          onClick={() => handleAction(swipe, card, true)}
        >
          <img src="static/icons/heart.png" alt={card.activity} />
        </button>
        <button
          className="next-button"
          onClick={() => handleAction(skipCard, card)}
        >
          <img src="static/icons/next.png" alt={card.activity} />
        </button>
      </div>
    </div>
  );
};

export default Card;
