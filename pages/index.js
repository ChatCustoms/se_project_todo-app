import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import PopupWithForm from "../components/PopupWithForm.js";
import { initialTodos, validationConfig, Section } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const todosList = document.querySelector(".todos__list");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const section = new Section(
  {
    items: initialTodos,
    renderer: (item) => {
      const todo = generateTodo(item);
      section.addItem(todo);
    },
  },
  ".todos__list"
);

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (_formValues) => {
    const name = _formValues.name;
    const dateInput = _formValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo);
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

function handleTotal(increment) {
  todoCounter.updateTotal(increment);
}

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleCheck,
    handleDelete,
    handleTotal
  );
  const todoElement = todo.getView();

  return todoElement;
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

initialTodos.forEach((item) => {
  renderTodo(item);
});

addTodoPopup.setEventListeners();

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
