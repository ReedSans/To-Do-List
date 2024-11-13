  // -----FUNCTIONS-----  

  // -----FORMAT THE DATE FROM THE DEADLINE FIELD
  function dateFormatter(someDate){

    const [day, month, year] = someDate.split("-").reverse();
    const date = new Date(`${month}/${day}/${year}`);
    
    let betterDate = Intl.DateTimeFormat("en-US", {dateStyle: 'medium'}).format(date);
    
    return betterDate.replaceAll(",", "");
  }

  // ---DELETE A TASK
  function deleteTask(e){
    if (e.target.classList.contains('fa-trash')){
      if (window.confirm('Delete this task?')){
        e.target.parentElement.remove();
        updateTasks();
      }
    } 
  }  
  
  // ---CLEAR ALL FIELDS AFTER SUBMISSION
  function clearFields(){  
    const taskTitle = document.getElementById('txtTitle');
    const taskDesc = document.getElementById('txtDescription');
    const taskDeadline = document.getElementById('deadline');

    taskTitle.value = "";
    taskDesc.value = "";
    taskDeadline.value = "";
  } 

  // ---UPDATE REMAINING TASKS
  function updateTasks () {
    const tasksLeft = Array.from(itemList.querySelectorAll('.pending-task input')).filter(chkBox => !chkBox.checked).length;

    if (tasksLeft === 1){
    remainingTasks.innerHTML = `You have 1 task left:`;
    } else {
    remainingTasks.innerHTML = `You have ${tasksLeft} tasks left:`;
    }
  }

  // ---CREATE A TASK
  function createTask(e){
    e.preventDefault();
    
    const taskTitle = document.getElementById('txtTitle');
    const taskDesc = document.getElementById('txtDescription');
    const taskDeadline = document.getElementById('deadline');

    // -----CREATE h4 AND APPEND VALUE FROM THE TITLE
    const header = document.createElement('h4');
    header.innerHTML = (taskTitle.value);
    header.className = 'task-header';

    // -----CREATE p AND APPEND VALUE FROM THE DESCRIPTION
    const paragraph = document.createElement('p');
    paragraph.innerHTML = (taskDesc.value);
    paragraph.className = 'task-desc';

    // -----CREATE span AND APPEND VALUE FROM THE DEADLINE
    const dueDate = document.createElement('span');
    dueDate.innerHTML = (`Due ${dateFormatter(taskDeadline.value)}`);
    dueDate.className = 'task-due';
    
    
    // -----NOW CREATE div, ADD CLASS & APPEND h4, p & span
    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-info';
    taskDetails.append(header, paragraph, dueDate);

    // -----CREATE checkbox input 
    const chkBox = document.createElement('input');
    chkBox.setAttribute('type', 'checkbox');
    chkBox.addEventListener('change', updateTasks);

    // -----CREATE TRASH CAN icon
    const trashBtn = document.createElement('icon');
    trashBtn.className = 'fas fa-trash';

    // -----CREATE THE li, ADD STYLE & APPEND checkbox, div & icon
    const listItem = document.createElement('li');
    listItem.className = 'pending-task';
    listItem.append(chkBox, taskDetails, trashBtn);

    // -----NOW APPEND listItem TO THE EXISTING ul
    itemList.append(listItem);

    window.alert(`'${header.innerHTML}' has been added to tasks`);

    clearFields();  
    updateTasks();
  }
  
  // -----DOM MANIPULATION------  
  
  
  // ---DECLARE VARIABLES 
  const submitForm = document.getElementById('task-form');
  const itemList = document.getElementById('task-holder');

  const remainingTasks = document.querySelector('#rem-tasks');

  
  // ---EVENT LISTENERS 
  submitForm.addEventListener('submit', createTask);
  
  itemList.addEventListener('click', deleteTask);
 
  updateTasks();

  // TOGGLE BUTTON FOR ADDING TASKS
  const addTaskMenu = document.getElementById('new-task');
  const openBtn = document.getElementById('open-form');
  const closeBtn = document.getElementById('close-form');

  openBtn.addEventListener('click', () => { addTaskMenu.classList.add('open'); })
  closeBtn.addEventListener('click', () => { addTaskMenu.classList.remove('open'); })

  
  
  
  
  
  
  