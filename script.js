/******************************** SELECTORS ***************************************/
const input = document.getElementById('input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('list');

let todos;

/******************************** EVENTS ***************************************/

addBtn.addEventListener('click', createListItem);
list.addEventListener('click', checkAndDel);
document.addEventListener('DOMContentLoaded', showTodosUI);

/******************************** FUNCTIONS ***************************************/

/*********** LISTITEM *************/
function createListItem(e){
    //PREVENT SUBMITTING
    e.preventDefault();

    if(input.value !== ''){
        //PLACE IN LOCALSTORAGE ONLY TEXT
        saveTodoStorage(input.value);

        //MAKE ITEM FUNCTION
        listItem(input.value);
    }
    
    //DELETE INPUT
    input.value = '';
}

function listItem(todo){
    //CREATE DIV & APPEND TO LIST
    const todoDiv  = document.createElement('div');
    todoDiv.classList.add('todo-div');
    list.appendChild(todoDiv);

    //CREATE ICON FOR CHECK MARK
    const checkMark = document.createElement('button');
    checkMark.innerHTML = '<i class="fas fa-check checked"></i>';
    checkMark.classList.add('check-btn');
    todoDiv.appendChild(checkMark);

    //CREATE LI 
    const listItem = document.createElement('li');
    listItem.innerHTML = todo;
    listItem.classList.add('todo');
    todoDiv.appendChild(listItem);

    //CREATE DELETE BUTTON
    const delBtn = document.createElement('button');
    delBtn.innerHTML = '<i class="fas fa-trash"></i>';
    delBtn.classList.add('del-btn');
    todoDiv.appendChild(delBtn);

}

/*********** CHECKMARK & DELETING *************/

function checkAndDel(e){
    const item = e.target;
    const parentItem = item.parentElement;

    //CHECKED TODOITEM AND TODODIV GOES OPACITY 0.5
    if(parentItem.classList[0] === 'check-btn'){
        const child = parentItem.children[0];
        const mainParent = parentItem.parentElement;
        child.classList.toggle('show');
        mainParent.classList.toggle('check');
    }

    //DELETE TODOITEM
    if(item.classList[0] === 'del-btn'){
        parentItem.remove();
        removeTodoStorage(parentItem);
    }
    
}

/*********** LOCAL STORAGE *************/

//CHECK LOCALSTORAGE: Is there already something in there?
function checkLocalStorage(){
    if(localStorage.getItem('todos') === null){//No? Make []
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));//Yes? Get!
    }
}

//ADD NEW ITEM IN TODOS ARRAY IN LOCALSTORAGE
function saveTodoStorage(todo){
    checkLocalStorage();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//SHOW IN DE UI
function showTodosUI(){
    checkLocalStorage();
    todos.forEach(function(todo){
            listItem(todo);
    })
}

//REMOVE FROM LOCAL STORAGE
function removeTodoStorage(todo){
    checkLocalStorage();
    const getIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(getIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
