class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDate(data) {
    console.log(data);
    if(data && data.date) {
    this._dueDate = new Date(data.date);
    this._todoDate = this._todoElement.querySelector(".todo__date");
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
    
    else {
      // Handle invalid date strings gracefully.  Maybe set a default message or nothing.
      this._todoDate.textContent = ""; // Example
      console.error("Invalid date string:", data.date);
    }
//  else {
//     // Handle the case where data or data.date is missing.  Set a default, hide the date element, or log an error.
//     console.warn("Todo item is missing a date property:", data);
//     this._todoDate.textContent = "";  // Or hide the element
//     // Example:  this._todoDate.style.display = "none";
// }
    
  }
}

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setEventListeners();
    this._generateDate();

    return this._todoElement;
  }
}

export default Todo;
