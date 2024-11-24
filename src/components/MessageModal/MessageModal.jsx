import { Modal } from "antd";
import './MessageModal.scss'
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
            className="modal-box"
            open={open}
            footer={null} // Отключаем стандартные кнопки
            onCancel={() => setOpen(false)}
            // onOk={handleOk}
        >
            {modalContent}
        </Modal>
    );
};

export default MessageModal;
