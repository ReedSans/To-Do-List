  // -----FUNCTIONS-----  

  // ---CREATE A TASK
  function createTask(e){
    e.preventDefault();

    const taskTitle = document.getElementById('txtTitle');
    const taskDesc = document.getElementById('txtDescription');
    const taskDeadline = document.getElementById('deadline');

    // CREATE TASK OBJECT
    const task = {
      title: taskTitle.value,
      description: taskDesc.value,
      deadline: taskDeadline.value,
    }

    itemList.innerHTML += `
      <li class="pending-task">
        <input type="checkbox" name="" id="chkTask">
        <div class="task-info">
          <h4 class="task-header">${task.title}</h4>
          <p class="task-desc">${task.description}</p>
          <span class="task-due">Due ${dateFormatter(task.deadline)}</span>
        </div>
        <i class="fas fa-trash"></i>
      </li>
    `

    window.alert(`'${task.title}' has been added to tasks`);

    taskTitle.value = taskDesc.value = taskDeadline.value = ''
    // clearFields(task);  
    updateTasks();
  }

  // -----FORMAT THE DATE FROM THE DEADLINE FIELD
  function dateFormatter(someDate){

    const [day, month, year] = someDate.split("-").reverse();
    const date = new Date(`${month}/${day}/${year}`);
    
    let betterDate = Intl.DateTimeFormat("en-US", {dateStyle: 'medium'}).format(date);
    
    return betterDate.replaceAll(",", "");
  }
  
  // // ---CLEAR ALL FIELDS AFTER SUBMISSION
  // function clearFields(task){
  //   task.title.value = "";
  //   task.description.value = "";
  //   task.deadline.value = "";
  // } 
  
  // ---UPDATE REMAINING TASKS
  function updateTasks () {
    const tasksLeft = Array.from(itemList.querySelectorAll('.pending-task input')).filter(chkBox => !chkBox.checked).length;

    if (tasksLeft === 1){
    remainingTasks.innerHTML = `You have 1 task left:`;
    } else {
    remainingTasks.innerHTML = `You have ${tasksLeft} tasks left:`;
    }
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

  
  // -----DOM MANIPULATION------  
  
  
  // ---DECLARE VARIABLES 
  const submitForm = document.getElementById('task-form');
  const itemList = document.getElementById('task-holder');

  // SPAN FOR READING REMAINING TASKS
  const remainingTasks = document.querySelector('#rem-tasks');

  // TOGGLE BUTTON FOR ADD-TASKS MODAL
  const openBtn = document.getElementById('open-modal');
  const closeBtn = document.getElementById('close-modal');
  
  // ADD-TASKS MODAL
  const addTaskModal = document.getElementById('new-task');


  // ---EVENT LISTENERS 
  submitForm.addEventListener('submit', createTask);
  
  itemList.addEventListener('click', deleteTask);
  itemList.addEventListener('change', updateTasks);
 
  openBtn.addEventListener('click', () => addTaskModal.classList.add('open'))
  closeBtn.addEventListener('click', () => addTaskModal.classList.remove('open'))
  updateTasks();



  
  
  
  
  
  
  