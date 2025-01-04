class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  _handelEscapeClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handelEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
  }

  setEventListeners() {
     this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup") || evt.target.classList.contains ("popup__close")) {
        this.close();
      };
  });
}
}

export default Popup;
