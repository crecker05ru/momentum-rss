export default function (userOptions) {
  const todoTasks = {
    inbox: [],
    today: [],
    done: [],
  }
  const todo = document.querySelector(".todo-container")
  const todoToggle = document.querySelector(".todo-toggle")
  const inboxList = document.querySelector(".inbox-list")
  const todayList = document.querySelector(".today-list")
  const doneList = document.querySelector(".done-list")
  const input = document.querySelector(".todo-input")
  const listDropdown = document.querySelector(".todo-list__select-dropdown")
  const todoSelectList = document.querySelector(".todo-select__list")
  const selectItems = document.querySelectorAll(".todo-select__item")
  const todoList = document.querySelector(".todo-content__list")
  const todoHead = document.querySelector(".todo-list__select-text")
  const itemMenus = document.querySelectorAll(".todo-content__item-menu")
  let todoListData = {
    Inbox: [{text: "one inbox",isDone: false}],
    Today: [{text: "one today",isDone: false}],
    Done: [{text: "one done",isDone: true}],
  }

  let currentList = todoHead.innerText
  todoToggle.addEventListener("click", () => {
    todo.classList.toggle("todo-show")
  })

  listDropdown.addEventListener("click", () => {
    todoSelectList.classList.toggle("select-list-show")
  })



  function createTodo(text, list) {
    let li = document.createElement("li")
    let checkbox = document.createElement("input")
    let span = document.createElement("span")
    checkbox.type = "checkbox"
    span.innerText = text
    list.append(li)
    li.append(checkbox)
    li.append(span)
  }

  function drawTodoItem(data, list) {
    let li = document.createElement("li")
    let itemMenuLi = document.createElement("li")
    li.classList.add('todo-content__item')
    itemMenuLi.classList.add('item-menu-option')
    let itemMenuSpan = document.createElement("span")
    itemMenuSpan.classList.add('item-menu-text')
    itemMenuSpan.innerText = "Delete"
    let label = document.createElement("label")
    label.classList.add('todo-content__item-label')
    label.htmlFor = data.text
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.classList.add('todo-content__item-input')
    checkbox.id = data.text
    let span = document.createElement("span")
    let menuSpan = document.createElement("span")
    span.classList.add('todo-content__item-text')
    menuSpan.classList.add('todo-content__item-button')
    let itemMenu = document.createElement("ul")
    itemMenu.classList.add('todo-content__item-menu')
    span.innerText = data.text
    list.append(li)
    li.append(label)
    li.append(span)
    li.append(menuSpan)
    li.append(itemMenu)
    itemMenu.append(itemMenuLi)
    itemMenuLi.append(itemMenuSpan)
    label.append(checkbox)
    // label.append(span)
    // label.append(menuSpan)
    if(data.isDone){
      span.classList.add('todo-content__item-checked')
      checkbox.checked = true
    }else {
      span.classList.remove('todo-content__item-checked')
      checkbox.checked = false
    }
    checkbox.addEventListener('change',ifChecked.bind(this,span,checkbox,data))
    itemMenuLi.addEventListener('click',() => {
      console.log('data.text',data.text)
      todoListData[currentList] = todoListData[currentList].filter(item => item.text !== data.text)
      updateTodo()
    })
    menuSpan.addEventListener('click',() => {
      itemMenu.classList.toggle('item-menu-show')
    })
  }


function ifChecked(span,checkbox,data){
  console.log('onchange')
  console.log('todoListData',todoListData)
if(checkbox.checked === true){
  data.isDone = true
  span.classList.add('todo-content__item-checked')
  todoListData["Done"].push(data)
  
}else {
  data.isDone = false
  span.classList.remove('todo-content__item-checked')
  todoListData["Done"] = todoListData["Done"].filter(item => item.text !== data.text)
}
updateTodo()
}

  function updateTodo() {
    todoList.innerText = ''
    todoListData[currentList].forEach((data) => {
      drawTodoItem(data, todoList)
    })
    selectItems.forEach(el => {
      console.log('el.dataset.list',el.dataset.list)
      console.log('el.children',el.children)
      if(todoListData[el.dataset.list])
      el.children[0].innerText = todoListData[el.dataset.list].length
    })
  }

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      // createTodo(e.target.value,todoList)
      let newTodo = {text: e.target.value, isDone: false}
      if(currentList === "Done"){
        newTodo.isDone = true
      }
      todoListData[currentList].push(newTodo)
      e.target.value = ""
      updateTodo()
      console.log('todoListData[currentList]', todoListData[currentList])
    }
  })

  // userOptions['en']["Show"][6].isChecked ? todo.classList.add('todo-show') :todo.classList.remove('todo-show')
  window.addEventListener("load", () => {
    console.log('todoHead.innerText',todoHead.innerText)
    console.log('currentList',currentList)
    //userOptions['en']["Show"][userOptions['en']["Show"].indexOf("Todo")].isCheked ? todoList.classList.add('todo-show') : todoList.classList.remove('todo-show')
    selectItems.forEach((el) => {
      el.addEventListener("click", (e) => {
        console.log("e.target.innerText", e.currentTarget.dataset.list)
        for (const key in todoListData) {
          if (e.currentTarget.dataset.list === key) {
            todoHead.innerText = key
            currentList = key
            console.log("currentList", currentList)
            todoSelectList.classList.toggle("select-list-show")
            todoList.innerText = ""
            todoListData[key].forEach((data) => {
              drawTodoItem(data, todoList)
            })
          }
        }
      })
    })
    
    if(localStorage.getItem('todoListData')){
      let data = localStorage.getItem('todoListData')
      todoListData = JSON.parse(data)
      console.log('todoListData',todoListData)
    }
    updateTodo()
    console.log('userOptions["en"]["Show"][6]',userOptions['en']["Show"][6])
    if(userOptions['en']["Show"][6].isChecked){
      todo.classList.add('todo-show')
    }else if(!userOptions['en']["Show"][6].isChecked){
      todo.classList.remove('todo-show')
    }
    
  })
  
  window.addEventListener("beforeunload", () => {
    console.log('todoHead.innerText',todoHead.innerText)
    console.log('currentList',currentList)
    localStorage.setItem('todoListData',JSON.stringify(todoListData) )
    updateTodo()
  })
}

