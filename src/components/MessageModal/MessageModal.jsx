import { Modal } from "antd";
import { useSwipeContext } from "../Context/SwipeContext";

const MessageModal = () => {
    const {
        modalContent,
        open,
        setOpen,
        // handleOk
    } = useSwipeContext();

    return (
        <Modal
            open={open}
            footer={null} // Отключаем стандартные кнопки
            onCancel={() => setOpen(false)}
            // onOk={handleOk}
        >
            {modalContent}
        </Modal>
    );
};

export default MessageModal
