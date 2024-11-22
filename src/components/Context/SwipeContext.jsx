import React, { createContext, useContext, useState } from "react";
import { CardsData } from "../../CardsData";

// Контекст и хук
const SwipeContext = createContext();
export const useSwipeContext = () => useContext(SwipeContext);

// Провайдер
export const SwipeProvider = ({ children }) => {
  const [cards, setCards] = useState(CardsData);

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [skippedActivities, setSkippedActivities] = useState([]);
  const [dislikedActivities, setDislikedActivities] = useState([]);
  const [messages, setMessages] = useState([]);

  // Функция для обработки действий с карточками
  const swipe = (card, liked) => {
    if (liked) {
      setSelectedActivities([...selectedActivities, card]);
    }
    setCards(cards.slice(1)); // Удаляем верхнюю карточку
  };

  // Функция дизлайка слайда
  const dislikeCard = (card) => {
    setDislikedActivities([...dislikedActivities, card]);
    setCards(cards.filter((c) => c !== card)); // Удаляем карточку из предложенных
  };

  // Функция добавления сообщения к слайду
  const addMessage = (card, message) => {
    setMessages([...messages, { card: card, message: message }]);
  };

  // Функция для пропуска слайда
  const skipCard = (card) => {
    setSkippedActivities([...skippedActivities, card]);
    setCards(cards.filter((c) => c !== card)); // Удаляем карточку из предложенных
  };

  // Функция для возврата к пропущенным слайдам
  const returnToSkipped = () => {
    setCards([...skippedActivities, ...cards]);
    setSkippedActivities([]); // Очистим массив пропущенных, так как они уже вернутся
  };

  return (
    <SwipeContext.Provider
      value={{
        cards,
        selectedActivities,
        skippedActivities,
        dislikedActivities,
        messages,
        swipe,
        dislikeCard,
        addMessage,
        skipCard,
        returnToSkipped,
      }}
    >
      {children}
    </SwipeContext.Provider>
  );
};
