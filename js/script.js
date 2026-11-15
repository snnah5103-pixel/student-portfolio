document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. ACADEMIC PLANNER FUNCTIONALITY
  // ==========================================
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');

  // Load saved tasks from localStorage or start with an empty list
  let tasks = JSON.parse(localStorage.getItem('academicTasks')) || [];

  function saveAndRenderTasks() {
    localStorage.setItem('academicTasks', JSON.stringify(tasks));
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;

      // Task text (click to toggle completed state)
      const taskText = document.createElement('span');
      taskText.textContent = task.text;
      taskText.title = 'Click to mark as completed';
      taskText.addEventListener('click', () => {
        tasks[index].completed = !tasks[index].completed;
        saveAndRenderTasks();
      });

      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        saveAndRenderTasks();
      });

      li.appendChild(taskText);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  function addNewTask() {
    const text = taskInput.value.trim();
    if (text === '') {
      alert('Please enter an academic task before adding.');
      return;
    }

    tasks.push({ text: text, completed: false });
    taskInput.value = '';
    saveAndRenderTasks();
  }

  // Add task via button click or Enter key
  addTaskBtn.addEventListener('click', addNewTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addNewTask();
    }
  });

  // Initial render on page load
  saveAndRenderTasks();

  // ==========================================
  // 2. CONTACT FORM FUNCTIONALITY
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && phone && message) {
      formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
      contactForm.reset();

      // Clear feedback message after 5 seconds
      setTimeout(() => {
        formFeedback.textContent = '';
      }, 5000);
    }
  });

  // ==========================================
  // 3. ACTIVE NAVIGATION LINK ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
});
