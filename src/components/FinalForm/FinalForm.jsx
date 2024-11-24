import React, { useState } from "react";
import { useSwipeContext } from "../Context/SwipeContext";
import "./FinalForm.scss";

const FinalForm = () => {
    const { selectedActivities } = useSwipeContext();
    const [formData, setFormData] = useState(
        selectedActivities.map((activity) => ({
            ...activity,
        }))
    );

    const [comment, setComment] = useState(""); // Поле для общего комментария
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (index, field, value) => {
        const updatedData = [...formData];
        updatedData[index][field] = value;
        setFormData(updatedData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formattedData = {
            activities: formData.map(({ activity, type }) => ({
                activity,
                type,
            })),
            comment, // Добавляем общий комментарий
        };

        try {
            const response = await fetch("https://formspree.io/f/xpwzlngk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                setIsSubmitted(true); // Переход на страницу благодарности
            } else {
                console.error("Ошибка отправки формы:", response.statusText);
            }
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
        }
    };

    const fieldLabels = {
        celebrity: "Выбранная знаменитость",
        idea: "Выбранная идея",
        movie: "Выбранный фильм (сериал)",
        music: "Выбранная музыка",
        food: "Выбранная еда",
        drink: "Выбранный напиток",
        art: "Выбранное искусство",
        book: "Выбранная книга",
        style: "Выбранный стиль",
        character: "Выбранный персонаж",
    };

    if (isSubmitted) {
        return (
            <div className="final-form__thank-you">
                <h1>Спасибо за ответы!</h1>
                <p>Твое идеальное свидание уже близко...</p>
            </div>
        );
    }

    return (
        <form className="final-form" onSubmit={handleSubmit}>
            <h2 className="final-form__title">Твои предпочтения</h2>
            {formData.map((activity, index) => (
                <div className="final-form__item" key={index}>
                    <label className="final-form__label">
                        {fieldLabels[activity.type] || "Выбранная активность"}:
                    </label>
                    <input
                        type="text"
                        className="final-form__input"
                        value={activity.activity}
                        onChange={(e) =>
                            handleChange(index, "activity", e.target.value)
                        }
                    />
                </div>
            ))}
            <div className="final-form__comment">
                <label className="final-form__label">Общий комментарий:</label>
                <textarea
                    className="final-form__textarea"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>
            <button type="submit" className="final-form__submit">
                Отправить
            </button>
        </form>
    );
};

export default FinalForm;
