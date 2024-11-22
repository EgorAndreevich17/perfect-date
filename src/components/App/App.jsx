import React, { useState } from "react";
import Joyride from "react-joyride"; // Импортируем Joyride
import { useSwipeContext } from "../Context/SwipeContext"; // Импортируем хук контекста
import { SwipeProvider } from "../Context/SwipeContext"; // Подключаем контекст
import Card from "../Card/Card"; // Компонент карточки
import './App.scss'

const AppContent = () => {
  const { cards, selectedActivities } = useSwipeContext(); // Получаем данные из контекста

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
    return (
      <div>
        <h1>Вы завершили выбор!</h1>
        <button onClick={handleSubmit}>Отправить результаты</button>
      </div>
    );
  }

  return <Card card={cards[0]} />;
};

const App = () => {
  const [run, setRun] = useState(true); // Состояние для запуска тура Joyride

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
      target: "body",
      content:
        "Здесь тебе будут попадаться различные карточки - это могут быть фильмы, музыка, еда, места, либо что-то абстрактное. Тебе нужно оценивать их, чтобы на основе твоих предпочтений мы могли создать идеальное свидание",
      placement: "center",
    },
    {
      //   disableBeacon: true,
      target: ".like-button",
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
      title: "Поехали!!!",
      disableBeacon: true,
      target: "body",
      content:
        "Собственно на этом всё, давай посмотрим, что тут за карточки",
      placement: "center",
    },
    // {
    //     title: "",
    //     disableBeacon: true,
    //     target: "body",
    //     content: "Поставь лайк карточке, если она тебе понравилась",
    //     placement: "center",
    //   },
  ];

  return (
    <SwipeProvider>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showSkipButton={false}
        showProgress={false}
        hideBackButton={true}
        hideCloseButton={true}
        // disableCloseOnEsc={true}
        styles={{
          options: {
            arrowColor: "357DED",
            backgroundColor: "#fff",
            beaconSize: 36,
            overlayColor: "rgba(0, 0, 0, 0.5)",
            primaryColor: "#357DED",
            spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
            textColor: "#333",
            width: undefined,
            zIndex: 100,
          },
        }}
        // styles={{
        //   options: {
        //     arrowColor: "#fff",
        //     backgroundColor: "#357DED", // Изменяем цвет поп-апа
        //     textColor: "#fff",
        //     primaryColor: "#fff",
        //     borderRadius: "10px", // Закругляем углы
        //   },
        // }}
      />
      <AppContent />
    </SwipeProvider>
  );
};

export default App;
