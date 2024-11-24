import { createContext, useContext, useState } from "react";
import { CardsData } from "../../data/CardsData";
import FormMessage from "../FormMessage/FormMessage";

// Контекст и хук
const SwipeContext = createContext();
export const useSwipeContext = () => useContext(SwipeContext);

// Провайдер
export const SwipeProvider = ({ children }) => {
    const [cards, setCards] = useState(CardsData); // Список всех карточек
    const [selectedActivities, setSelectedActivities] = useState([]); // Лайкнутые карточки
    const [skippedActivities, setSkippedActivities] = useState([]); // Пропущенные карточки
    const [dislikedActivities, setDislikedActivities] = useState([]); // Дизлайкнутые карточки
    const [viewedCategories, setViewedCategories] = useState([]); // Отслеживание просмотренных категорий
    const [message, setMessage] = useState(""); // Сообщение для карточки
    const [confirmLoading, setConfirmLoading] = useState(false); // Статус загрузки
    const [modalContent, setModalContent] = useState(<FormMessage />); // Контент модалки
    const [open, setOpen] = useState(false); // Статус модалки

    // Массив всех категорий
    const categories = ['celebrity', 'idea', 'movie', 'music', 'food', 'drink', 'art', 'book', 'style', 'character'];

    // Фильтрация карточек по типу (категории), исключая уже просмотренные категории
    const filterCardsByCategory = () => {
        // Находим первую категорию, которая еще не была просмотрена
        const firstUnviewedCategory = categories.find(category => !viewedCategories.includes(category));

        if (!firstUnviewedCategory) {
            return []; // Если все категории просмотрены, возвращаем пустой массив
        }

        // Возвращаем только карточки из первой непосмотренной категории
        return CardsData.filter(card => card.type === firstUnviewedCategory);
    };

    // Функция для обработки действия с карточкой
    const swipe = (card, liked) => {
        if (liked) {
            setSelectedActivities([...selectedActivities, card]);
        }
        // Убираем карточку из текущего списка
        setCards(cards.slice(1));

        // После того как карточка свайпнута, помечаем категорию как просмотренную
        const currentCategory = card.type;
        if (!viewedCategories.includes(currentCategory)) {
            setViewedCategories([...viewedCategories, currentCategory]);
        }
        console.log(selectedActivities)
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

    // Функция показа модального окна
    const showModal = () => {
        console.log('ewofkwef');
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
            setOpen(false);
            setModalContent(renderInputForm(<FormMessage />)); // Возвращаем форму ввода
            console.log(selectedActivities);
        }, 2000);
    };

    return (
        <SwipeContext.Provider
            value={{
                cards: filterCardsByCategory(), // Фильтруем карточки по категории
                selectedActivities,
                skippedActivities,
                dislikedActivities,
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
