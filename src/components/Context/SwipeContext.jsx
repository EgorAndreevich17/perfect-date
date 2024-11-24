import { createContext, useContext, useState } from "react";
import { CardsData } from "../../data/CardsData";
import FormMessage from "../FormMessage/FormMessage";

// Контекст и хук
const SwipeContext = createContext();
export const useSwipeContext = () => useContext(SwipeContext);

// Провайдер
export const SwipeProvider = ({ children }) => {
    const [cards, setCards] = useState(CardsData);

    const [selectedActivities, setSelectedActivities] = useState([]);
    const [skippedActivities, setSkippedActivities] = useState([]);
    const [dislikedActivities, setDislikedActivities] = useState([]);
    // const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalContent, setModalContent] = useState(<FormMessage />); // Управление контентом модалки
    const [open, setOpen] = useState(false);

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
        setSelectedActivities([
            ...selectedActivities,
            { card: card, message: message },
        ]);
        setCards(cards.slice(1));
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

    //Функция показа модального окна
    const showModal = () => {
        console.log('ewofkwef')
        setOpen(true);
        setModalContent(renderInputForm(<FormMessage />)); // Устанавливаем исходное состояние
    };

    const renderInputForm = () => (
        <FormMessage
            message={message}
            setMessage={setMessage}
            confirmLoading={confirmLoading}
            handleOk={handleOk}
        />
    );

    // Функция подтверждения отправки формы с сообщением
    const handleOk = () => {
        if (message.trim() === "") return; // Не даём отправить пустое сообщение
        setModalContent("Запоминаю твои мысли...");
        setConfirmLoading(true);

        setTimeout(() => {
            addMessage(cards[0], message); // Добавляем сообщение через контекст
            setMessage(""); // Сбрасываем текст инпута
            setConfirmLoading(false);
            setOpen(false)
            setModalContent(renderInputForm(<FormMessage />)); // Возвращаем форму ввода
            console.log(selectedActivities)
        }, 2000);
    };

    return (
        <SwipeContext.Provider
            value={{
                cards,
                selectedActivities,
                skippedActivities,
                dislikedActivities,
                // messages,
                swipe,
                dislikeCard,
                addMessage,
                skipCard,
                returnToSkipped,
                message,
                setMessage,
                handleOk,
                showModal,
                modalContent,
                setModalContent,
                open,
                setOpen,
                confirmLoading,
            }}
        >
            {children}
        </SwipeContext.Provider>
    );
};
