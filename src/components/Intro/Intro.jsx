import { useState, useEffect } from "react";
import "./Intro.scss";

const Intro = ({ onFinish }) => {
    const [currentText, setCurrentText] = useState(""); // Текущий текст
    const [visible, setVisible] = useState(true); // Видимость текста
    const textSequence = [
        { text: "Привет, Соня", delay: 3000 },
        { text: "Удивлять друг друга уже становится нашей традицией", delay: 4000 },
        {
            text: "И я долго думал, как я могу переплюнуть Китайскую оперу и Новодевичье кладбище...",
            delay: 6000,
        },
        { text: "И поэтому", delay: 2000 },
        { text: "Я решил вернуться назад в твинби", delay: 4000 },
        { text: "Которое я сделал специально для тебя...", delay: 3000 },
        { text: "Добро пожаловать...", delay: 2000 },
    ];

    useEffect(() => {
        let timeout;
        let index = 0;

        const showNextText = () => {
            if (index < textSequence.length) {
                setCurrentText(textSequence[index].text);
                setVisible(true);

                timeout = setTimeout(() => {
                    setVisible(false);
                    timeout = setTimeout(() => {
                        index++;
                        showNextText();
                    }, 1000); // Время для исчезновения текста
                }, textSequence[index].delay);
            } else {
                onFinish(); // Переход к основному интерфейсу
            }
        };

        showNextText();

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="intro">
            <div className={`intro-text ${visible ? "visible" : "hidden"}`}>
                {currentText}
            </div>
        </div>
    );
};

export default Intro;
