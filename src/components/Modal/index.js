import React, { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { parser } from "../../helpers/parser";
import "./style.scss";

export default function Modal({ isOpen, onClose, vehicleData }) {
  if (!isOpen) return null;

  const dialog = useRef();

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useLayoutEffect(() => {
    const currentDialog = dialog.current;

    currentDialog.showModal();

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      currentDialog.close();
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const {
    id, media, meta, price
  } = vehicleData;

  return createPortal(
    <dialog
      aria-modal="true"
      aria-labelledby="dialog-title"
      className="modal-dialog"
      ref={dialog}
    >
      <img
        className="modal-dialog__image"
        src={media[0].url}
        alt={`${id} ${media[0].name}`}
      />
      <h2 id="dialog-title" className="modal-dialog__h2">
        {id}
        <span className="modal-dialog__price">{price}</span>
      </h2>
      <div className="modal-dialog__content">
        <p className="modal-dialog__p">Body styles:</p>
        <ul className="modal-dialog__ul">
          {meta.bodystyles.map((style) => (
            <li
              key={style}
              className="modal-dialog__li modal-dialog__li--uppercase"
            >
              {style}
            </li>
          ))}
        </ul>
        <p className="modal-dialog__p">Drivetrain:</p>
        <ul className="modal-dialog__ul">
          {meta.drivetrain.map((drive) => (
            <li key={drive} className="modal-dialog__li">
              {drive}
            </li>
          ))}
        </ul>
        <p className="modal-dialog__p">Passengers:</p>
        <ul className="modal-dialog__ul">
          <li className="modal-dialog__li">{meta.passengers}</li>
        </ul>
        {parser(meta.emissions) && (
          <>
            <p className="modal-dialog__p">Emissions:</p>
            <ul className="modal-dialog__ul">
              <li className="modal-dialog__li">{parser(meta.emissions)}</li>
            </ul>
          </>
        )}
        <button
          onClick={onClose}
          className="modal-dialog__close-button"
          aria-label="Close modal"
          tabIndex={0}
          type="button"
        >
          &#x2715;
        </button>
      </div>
    </dialog>,
    document.body
  );
}
