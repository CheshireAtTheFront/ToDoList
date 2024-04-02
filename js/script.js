const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

// if(localStorage.getItem('todo')) {
// 	toDoData = JSON.parse(localStorage.getItem('todo'));
// }
// возращает массив данных
const getData = function() {
	return JSON.parse(localStorage.getItem('todo')) || [];
}	

toDoData = getData();
// для работы с элементами
const render = function() {
	todoList.innerHTML = '';
	todoCompleted.innerHTML = '';

	toDoData.forEach(function(item) {
		const li = document.createElement('li');
		
		li.classList.add('todo-item');

		li.innerHTML = '<span class="text-todo">' + item.text + '</span>' + 
				'<div class="todo-buttons">' +
				'<button class="todo-remove"></button>' +
				'<button class="todo-complete"></button>' +
				'</div>';

		li.querySelector('.todo-complete').addEventListener('click', function() {
			item.completed = !item.completed;
		
			render();
			setData();
		});

		li.querySelector('.todo-remove').addEventListener('click', function() {
			const itemIndex = toDoData.indexOf(item);
			toDoData.splice(itemIndex, 1);

			render();
			setData();
		});

		if(item.completed) {
			todoCompleted.append(li);
		} else {
			todoList.append(li);
		}
	})
	setData();
}

todoControl.addEventListener('submit', function(event) {
	event.preventDefault();

	const newToDo = {
		text: headerInput.value,
		completed: false,
	}
	
	if(!newToDo.text) {
		return false
	} else {
		toDoData.push(newToDo);
		headerInput.value = '';
	}
	render();
});

// сохраняет элементы
const setData = function() {
	localStorage.setItem('todo', JSON.stringify(toDoData));
}

render();
