import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSwipeContext } from "../Context/SwipeContext";

import { CardsTags } from "../../data/CardsData";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Card.scss";

const Card = () => {
    const {
        swipe,
        returnToSkipped,
        dislikeCard,
        skipCard,
        // addMessage,
        // message,
        // setMessage,
        // handleOk,
        // confirmLoading,
        // setConfirmLoading,
        showModal,
        cards,
        // modalText,
        // setModalText,
        // renderInputForm,
        // open,
        // setOpen
    } = useSwipeContext(); // Добавлен addMessage
    const swiperRef = useRef(null); // Для управления слайдером

    const tags = CardsTags;

    const resetSlider = () => {
        swiperRef.current.slideTo(0, 0);
    };

    const handleAction = (action, ...args) => {
        resetSlider();
        action(...args);
    };

    return (
        <>
            <div className="card">
                <div className="swiper-wrapper">
                    <Swiper
                        loop={true}
                        pagination={{ clickable: true }}
                        className="swiper-container"
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {cards[0].pics.map((pic, idx) => (
                            <SwiperSlide key={idx}>
                                <img
                                    src={pic}
                                    alt={`${cards[0].activity}-${idx}`}
                                    className="card-image"
                                />
                                {idx === 0 && (
                                    <div className="card-content">
                                        <div className="card-content--title">
                                            {cards[0].activity}
                                        </div>
                                        <div className="tags">
                                            {cards[0].tags.map((tag, idx) => (
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
                                            {cards[0].description}
                                        </p>
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="actions">
                    <button
                        className="return-button"
                        onClick={() => handleAction(returnToSkipped)}
                    >
                        <img
                            src="static/icons/return.png"
                            alt={cards[0].activity}
                        />
                    </button>
                    <button
                        className="close-button"
                        onClick={() => handleAction(dislikeCard, cards[0])}
                    >
                        <img src="static/icons/close.png" alt={cards[0].activity} />
                    </button>
                    <button className="message-button" onClick={() => showModal()}>
                        <img
                            src="static/icons/message.png"
                            alt={cards[0].activity}
                        />
                    </button>
                    <button
                        className="like-button"
                        onClick={() => handleAction(swipe, cards[0], true)}
                    >
                        <img src="static/icons/heart.png" alt={cards[0].activity} />
                    </button>
                    <button
                        className="next-button"
                        onClick={() => handleAction(skipCard, cards[0])}
                    >
                        <img src="static/icons/next.png" alt={cards[0].activity} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Card;
