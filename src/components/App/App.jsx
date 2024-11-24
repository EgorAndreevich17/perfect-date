import { useState } from "react";
import Joyride from "react-joyride";
import { useSwipeContext } from "../Context/SwipeContext";
import { SwipeProvider } from "../Context/SwipeContext";
import Card from "../Card/Card";
import MessageModal from "../MessageModal/MessageModal";
import Intro from "../Intro/Intro";
import FinalForm from "../FinalForm/FinalForm";
import "./App.scss";

const AppContent = () => {
    const { cards, selectedActivities } = useSwipeContext();
    const [showIntro, setShowIntro] = useState(true);

    const handleIntroFinish = () => {
        setShowIntro(false); // Завершение вступления
    };

    const handleSubmit = () => {
        const form = document.createElement("form");
        form.action = "https://formspree.io/f/yourFormId";
        form.method = "POST";

        selectedActivities.forEach((activity, idx) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = `activity_${idx}`;
            input.value = activity.activity;
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    };

    if (cards.length === 0) {
        return <FinalForm></FinalForm>;
    }

    return showIntro ? <Intro onFinish={handleIntroFinish} /> : <Card />;
};

const App = () => {
    const [runJoyride, setRunJoyride] = useState(false); // Отвечает за запуск Joyride

    const steps = [
        {
            title: "Добро пожаловать!",
            disableBeacon: true,
            target: "body",
            content:
                "Я написал это приложение, чтобы мы могли создать идеальное свидание. Позволь познакомить тебя с его функционалом",
            placement: "center",
        },
        {
            title: "Навстречу идеальному свиданию",
            disableBeacon: true,
            target: "body",
            content: `Тебе будут попадаться различные карточки - это могут быть фильмы, музыка, еда, места, либо что-то абстрактное. Оценивай их, чтобы на основе твоих предпочтений я придумал идеальное свидание`,
            placement: "center",
        },
        {
            target: ".like-button",
            disableBeacon: true,
            content: "Поставь лайк карточке, если она тебе понравилась",
            placement: "top",
        },
        {
            target: ".close-button",
            content: "Если карточка тебе не нравится - нажми на крестик",
            placement: "top",
        },
        {
            target: ".message-button",
            content:
                "Ты можешь написать сообщение, привязанное к карточке, например поделиться своими мыслями и идеями.",
            placement: "top",
        },
        {
            target: ".next-button",
            content:
                "Нажми сюда, чтобы пропустить карточку. Ты сможешь вернуться к ней позже.",
            placement: "top",
        },
        {
            target: ".return-button",
            content: "Нажми сюда, чтобы вернуться к пропущенным карточкам",
            placement: "top",
        },
        {
            title: "Время выбирать свое свидание",
            disableBeacon: true,
            target: "body",
            content: "Скорее начинай оценивать карточки :)",
            placement: "center",
        },
    ];

    return (
        <SwipeProvider>
            <MessageModal />
            <AppContent />
            {/* Joyride запускается после завершения Intro */}
            {!runJoyride && (
                <Intro
                    onFinish={() => {
                        setRunJoyride(true);
                    }}
                />
            )}
            {runJoyride && (
                <Joyride
                    steps={steps}
                    run={runJoyride}
                    continuous
                    showSkipButton={false}
                    disableCloseOnEsc={true}
                    showProgress={false}
                    hideBackButton={true}
                    hideCloseButton={true}
                    spotlightClicks={false}
                    disableOverlayClose={true}
                    spotlightAnimation={false}
                    styles={{
                        options: {
                            arrowColor: "#FDFFFC",
                            backgroundColor: "#FDFFFC",
                            overlayColor: "rgba(0, 0, 0, 0.5)",
                            primaryColor: "#DE89BE",
                            width: "280px",
                            height: "auto",
                            zIndex: 100,
                        },
                        tooltip: {
                            textAlign: "center",
                            fontSize: "14px",
                            "@media (max-width: 480px)": {
                                fontSize: "22px",
                            },
                        },
                    }}
                />
            )}
        </SwipeProvider>
    );
};

export default App;
