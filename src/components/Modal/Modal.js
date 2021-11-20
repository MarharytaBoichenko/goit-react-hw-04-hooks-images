import { useEffect } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

//создаем  в index.html  div , куда будет  встроена модалка  и  выбираем его
const modalRoot = document.querySelector("#modal-root");

export default function Modal({ largeImageURL, onClose }) {
  useEffect(() => {
    window.addEventListener("keydown", onEscapeHandler);
    return () => {
      window.removeEventListener("keydown", onEscapeHandler);
    };
  }, []);

  //обработчик  клика на  бекдроп для закрытия
  const handleBackdrop = (e) => {
    console.log(e.target);
    console.log(e.currentTarget);
    if (e.target === e.currentTarget) {
      // вызываем  ф-ю,  которая  указана в props    модалки который прописан  в Аpp -  onClose
      onClose();
    }
  };

  const onEscapeHandler = (e) => {
    console.log(e.code);
    if (e.code === "Escape") {
      // вызываем  ф-ю,  которая  указана в props    модалки который прописан  в Аpp -  onClose
      onClose();
    }
  };
  ///при рендере  создется  портал , где становится модалка,   в  скобках  -  что  ставим,   куда

  return createPortal(
    <div className={s.overlay} onClick={handleBackdrop}>
      <div className={s.modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
}
