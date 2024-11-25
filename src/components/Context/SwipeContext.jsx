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
    const categories = [
        "celebrity",
        "idea",
        "movie",
        "music",
        "food",
        "drink",
        "art",
        "book",
        "style",
        "character",
    ];

    // Фильтрация карточек по типу (категории), исключая уже просмотренные категории
    const filterCardsByCategory = () => {
        // Первая карточка должна быть типа 'intro'
        if (cards.some((card) => card.type === "intro")) {
            return [cards.find((card) => card.type === "intro")]; // Вернем только карточку типа intro
        }

        // Ищем первую категорию, где либо нет выбранных карточек, либо есть пропущенные карточки
        const firstUnresolvedCategory = categories.find((category) => {
            const isCategorySelected = selectedActivities.some(
                (activity) => activity.type === category
            );
            const isCategoryDisliked = cards
                .filter((card) => card.type === category)
                .every((card) => dislikedActivities.includes(card));
            return !isCategorySelected && !isCategoryDisliked;
        });

        if (!firstUnresolvedCategory) {
            return []; // Если все категории решены (выбраны или отклонены), возвращаем пустой массив
        }

        // Возвращаем карточки из категории, которую нужно показать снова
        return cards.filter((card) => card.type === firstUnresolvedCategory);
    };

    // Функция для обработки действия с карточкой (лайк)
    const swipe = (card, liked) => {
        if (card.type === "intro") {
            setCards(cards.filter((c) => c !== card));
            return;
        }

        if (liked) {
            setSelectedActivities([...selectedActivities, card]); // Добавляем в выбранные
            setViewedCategories([...viewedCategories, card.type]); // Помечаем категорию как заполненную
        }

        // Убираем карточку из текущего списка
        setCards(cards.filter((c) => c !== card));
    };

    // Функция дизлайка слайда
    const dislikeCard = (card) => {
        if (card.type === 'intro') return; // Игнорируем дизлайк для карточки типа 'intro'
    
        setDislikedActivities([...dislikedActivities, card]);
        setCards(cards.filter(c => c !== card)); // Убираем карточку из текущего списка
    };

    // Функция добавления сообщения к слайду (с автоматическим лайком)
    const addMessage = (card, message) => {
        if (card.type === "intro") return; // Игнорируем действие для карточки типа 'intro'

        const updatedCard = { ...card, message }; // Добавляем сообщение в карточку

        // Добавляем карточку с сообщением и лайкаем её
        setSelectedActivities([...selectedActivities, updatedCard]);

        // Убираем карточку из текущего списка
        setCards(cards.filter((c) => c !== card));

        // Помечаем категорию как просмотренную
        const currentCategory = card.type;
        if (!viewedCategories.includes(currentCategory)) {
            setViewedCategories([...viewedCategories, currentCategory]);
        }
    };

    // Функция для пропуска слайда
    const skipCard = (card) => {
        if (card.type === 'intro') return; // Игнорируем пропуск для карточки типа 'intro'
    
        setSkippedActivities([...skippedActivities, card]);
        setCards(cards.filter(c => c !== card)); // Убираем карточку из текущего списка
    };

    // Функция для возврата к пропущенным слайдам
    const returnToSkipped = () => {
        // Возвращаем пропущенные карточки в начало списка и очищаем их
        setCards([...skippedActivities, ...cards]);
        setSkippedActivities([]); // Очистим массив пропущенных
    };

    // Функция показа модального окна
    const showModal = () => {
        setOpen(true);
        setModalContent(renderInputForm());
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
            setModalContent(renderInputForm()); // Возвращаем форму ввода
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
