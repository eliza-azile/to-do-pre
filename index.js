let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	if (localStorage.getItem('tasks')) {
		return JSON.parse(localStorage.getItem('tasks'));
	} else {
		return items;
	}
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	deleteButton.addEventListener('click', function (evt) {
		clone.remove();
		const items = getTasksFromDOM();
		saveTasks(items);
	})
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	duplicateButton.addEventListener('click', function (evt) {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
	})
	const editButton = clone.querySelector(".to-do__item-button_type_edit");
	editButton.addEventListener('click', () => {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});
	textElement.addEventListener('blur', function () {
		textElement.setAttribute('contenteditable', 'false');
		saveTasks(getTasksFromDOM());
	})
	textElement.textContent = item;
	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];
	itemsNamesElements.forEach(item => tasks.push(item.textContent));
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

items = loadTasks()
items.forEach(item => listElement.append(createItem(item)));

formElement.addEventListener('submit', function (evt) {
	evt.preventDefault();
	listElement.prepend(createItem(inputElement.value));
	items = getTasksFromDOM();
	saveTasks(items);
	formElement.reset();
})