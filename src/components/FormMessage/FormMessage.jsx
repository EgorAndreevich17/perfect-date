import { Button } from "antd";
// import { useState } from "react";
import { useSwipeContext } from "../Context/SwipeContext";

import "./FormMessage.scss";

const FormMessage = () => {
    const { message, setMessage, handleOk, confirmLoading } = useSwipeContext(); // Добавлен addMessage

    // const [message, setMessage] = useState(""); // Храним текст сообщения
    return (
        <div className="form-container">
            <input
                onChange={(e) => setMessage(e.target.value)}
                className="form-input"
                value={message}
                // onChange={(e) => setMessage(e.target.value)}
                placeholder="Поделись своими мыслями"
            />
            <Button
                type="primary"
                className="custom-ok-button"
                loading={confirmLoading}
                onClick={handleOk}
            >
                Подтвердить
            </Button>
        </div>
    );
};

export default FormMessage;
