import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import PopupWithForm from "../components/PopupWithForm.js";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import TodoCounter from "../components/TodoCounter.js";
import Section from "../components/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function renderTodo(todoItem) {
  const todoElement = generateTodo(todoItem);
  section.addItem(todoElement);
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formValues) => {
    const name = formValues.name;
    const dateInput = formValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    const todoElement = generateTodo(values);
    renderTodo(todoElement);
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
console.log(data);
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoItem = generateTodo(item);
    renderTodo(todoItem);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
