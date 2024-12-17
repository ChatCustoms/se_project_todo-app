class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(
          inputElement,
          inputElement.validationMessage,
        );
      } else {
        this._hideInputError(inputElement);
      }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );

    

    const buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );


    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
