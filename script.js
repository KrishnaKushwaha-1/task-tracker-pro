/*==================================================
            TASK TRACKER PRO
            SECTION 1 - CORE SETUP
==================================================*/

/*==========================
    DOM ELEMENTS
==========================*/

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskPriority = document.getElementById("taskPriority");
const addTaskBtn = document.getElementById("addTaskBtn");

const searchTask = document.getElementById("searchTask");
const filterTask = document.getElementById("filterTask");

const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const completionRate = document.getElementById("completionRate");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const themeBtn = document.getElementById("themeBtn");

/* Calendar */

const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");

const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");

/* Toast */

const toast = document.getElementById("toast");

/*==========================
      GLOBAL VARIABLES
==========================*/

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let searchText = "";

let filter = "all";

let selectedDate = "";

let currentDate = new Date();

let currentMonth = currentDate.getMonth();

let currentYear = currentDate.getFullYear();

/*==========================
      LOCAL STORAGE
==========================*/

function saveTasks() {

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)

    );

}

function loadTasks() {

    const stored = localStorage.getItem("tasks");

    if (stored) {

        tasks = JSON.parse(stored);

    }

}

/*==========================
      TOAST MESSAGE
==========================*/

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}

/*==========================
      CLEAR INPUTS
==========================*/

function clearInputs() {

    taskInput.value = "";

    taskDate.value = "";

    taskPriority.value = "Medium";

}

/*==========================
      GENERATE UNIQUE ID
==========================*/

function generateId() {

    return Date.now() + Math.floor(Math.random() * 1000);

}

/*==========================
      DATE FORMAT
==========================*/

function formatDate(dateString) {

    if (!dateString) {

        return "No Due Date";

    }

    const options = {

        day: "numeric",

        month: "short",

        year: "numeric"

    };

    return new Date(dateString)

        .toLocaleDateString(

            "en-IN",

            options

        );

}

/*==========================
      SORT TASKS
==========================*/

function sortTasks() {

    tasks.sort((a, b) => {

        if (a.completed === b.completed) {

            if (!a.dueDate) return 1;

            if (!b.dueDate) return -1;

            return new Date(a.dueDate) -

                new Date(b.dueDate);

        }

        return a.completed - b.completed;

    });

}

/*==========================
    UPDATE DASHBOARD
==========================*/

function updateDashboard() {

    const total = tasks.length;

    const completed = tasks.filter(

        task => task.completed

    ).length;

    const pending = total - completed;

    totalTasks.textContent = total;

    pendingTasks.textContent = pending;

    completedTasks.textContent = completed;

    const percent =

        total === 0

            ? 0

            : Math.round(

                (completed / total) * 100

            );

    completionRate.textContent =

        percent + "%";

    progressText.textContent =

        percent + "%";

    progressFill.style.width =

        percent + "%";

}

/*==========================
      THEME
==========================*/

function loadTheme() {

    const theme =

        localStorage.getItem("theme");

    if (theme === "dark") {

        document.body.classList.add(

            "dark"

        );

    }

}

function saveTheme() {

    localStorage.setItem(

        "theme",

        document.body.classList.contains("dark")

            ? "dark"

            : "light"

    );

}

/*==========================
      INITIAL LOAD
==========================*/

loadTasks();

loadTheme();

updateDashboard();








/*==================================================
        SECTION 2 - CRUD OPERATIONS
==================================================*/

/*==========================
      ADD TASK
==========================*/

function addTask() {

    const title = taskInput.value.trim();
    const dueDate = taskDate.value;
    const priority = taskPriority.value;

    if (title === "") {
        alert("Please enter a task.");
        taskInput.focus();
        return;
    }

    const newTask = {

        id: generateId(),

        title,

        dueDate,

        priority,

        completed: false,

        createdAt: new Date().toISOString()

    };

    tasks.push(newTask);

    sortTasks();

    saveTasks();

    clearInputs();

    renderTasks();

    showToast("Task Added Successfully");

}

/*==========================
      DELETE TASK
==========================*/

function deleteTask(id) {

    const confirmDelete = confirm(
        "Delete this task?"
    );

    if (!confirmDelete) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();

    renderTasks();

    showToast("Task Deleted");

}

/*==========================
      TOGGLE TASK
==========================*/

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });

    sortTasks();

    saveTasks();

    renderTasks();

    showToast("Task Updated");

}

/*==========================
      EDIT TASK
==========================*/

function editTask(id) {

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) return;

    const updatedTitle = prompt(
        "Edit Task",
        task.title
    );

    if (updatedTitle === null) return;

    if (updatedTitle.trim() === "") {

        alert("Task cannot be empty.");

        return;

    }

    task.title = updatedTitle.trim();

    saveTasks();

    renderTasks();

    showToast("Task Edited");

}

/*==========================
      UPDATE DUE DATE
==========================*/

function updateTaskDate(id, newDate) {

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) return;

    task.dueDate = newDate;

    saveTasks();

    renderTasks();

}

/*==========================
      UPDATE PRIORITY
==========================*/

function updatePriority(id, priority) {

    const task = tasks.find(
        task => task.id === id
    );

    if (!task) return;

    task.priority = priority;

    saveTasks();

    renderTasks();

}

/*==========================
      CLEAR COMPLETED
==========================*/

function clearCompletedTasks() {

    const completed = tasks.filter(
        task => task.completed
    );

    if (completed.length === 0) {

        alert("No completed tasks.");

        return;

    }

    if (!confirm("Delete all completed tasks?"))
        return;

    tasks = tasks.filter(
        task => !task.completed
    );

    saveTasks();

    renderTasks();

    showToast("Completed Tasks Cleared");

}

/*==========================
      MARK ALL COMPLETE
==========================*/

function completeAllTasks() {

    tasks.forEach(task => {

        task.completed = true;

    });

    saveTasks();

    renderTasks();

    showToast("All Tasks Completed");

}

/*==========================
      RESET ALL TASKS
==========================*/

function resetTasks() {

    if (!confirm("Remove all tasks?"))
        return;

    tasks = [];

    saveTasks();

    renderTasks();

    showToast("All Tasks Removed");

}

/*==========================
      ENTER KEY
==========================*/

taskInput.addEventListener(

    "keypress",

    function (e) {

        if (e.key === "Enter") {

            addTask();

        }

    }

);

/*==========================
      ADD BUTTON
==========================*/

addTaskBtn.addEventListener(

    "click",

    addTask

);





/*==================================================
        SECTION 3A - RENDER ENGINE
==================================================*/

/*==========================
        RENDER TASKS
==========================*/

function renderTasks() {

    sortTasks();

    taskList.innerHTML = "";

    /* -----------------------------
       SEARCH + FILTER
    ------------------------------ */

    let filteredTasks = tasks.filter(task => {

        const matchesSearch =
            task.title.toLowerCase()
                .includes(searchText.toLowerCase());

        let matchesFilter = true;

        switch (filter) {

            case "pending":
                matchesFilter = !task.completed;
                break;

            case "completed":
                matchesFilter = task.completed;
                break;

            default:
                matchesFilter = true;

        }

        /* Calendar filter (Section 5) */

        let matchesDate = true;

        if (selectedDate !== "") {

            matchesDate =
                task.dueDate === selectedDate;

        }

        return (
            matchesSearch &&
            matchesFilter &&
            matchesDate
        );

    });

    /* -----------------------------
       EMPTY STATE
    ------------------------------ */

    if (filteredTasks.length === 0) {

        taskList.innerHTML = `

        <div class="empty-message">

            <i class="fa-solid fa-list-check"></i>

            <p>No Tasks Found</p>

        </div>

        `;

        updateDashboard();

        return;

    }

    /* -----------------------------
       CREATE TASK CARDS
    ------------------------------ */

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        if (task.completed) {

            li.classList.add("completed");

        }

        li.innerHTML = `

<div class="task-info">

<input
type="checkbox"
${task.completed ? "checked" : ""}
onclick="toggleTask(${task.id})">

<div class="task-details">

<span class="task-title">

${task.title}

</span>

<span class="task-date">

<i class="fa-regular fa-calendar"></i>

${formatDate(task.dueDate)}

</span>

<span class="priority ${task.priority.toLowerCase()}">

${task.priority}

</span>

</div>

</div>

<div class="task-actions">

<button
class="edit-btn"
onclick="editTask(${task.id})">

<i class="fa-solid fa-pen"></i>

</button>

<button
class="delete-btn"
onclick="deleteTask(${task.id})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

`;

        taskList.appendChild(li);

    });

    updateDashboard();

}








/*==================================================
        SECTION 3B-1
        HELPERS + SEARCH + FILTER
==================================================*/

/*==========================
      FORMAT DATE
==========================*/

function formatDate(dateString) {

    if (!dateString) {

        return "No Due Date";

    }

    const options = {

        day: "numeric",

        month: "short",

        year: "numeric"

    };

    return new Date(dateString).toLocaleDateString(
        "en-IN",
        options
    );

}

/*==========================
      DUE STATUS
==========================*/

function getDueStatus(dateString) {

    if (!dateString) {

        return "";

    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const due = new Date(dateString);

    due.setHours(0, 0, 0, 0);

    const diff =
        (due - today) / (1000 * 60 * 60 * 24);

    if (diff < 0) {

        return "Overdue";

    }

    if (diff === 0) {

        return "Today";

    }

    if (diff === 1) {

        return "Tomorrow";

    }

    return "";

}

/*==========================
      SEARCH
==========================*/

searchTask.addEventListener("input", function () {

    searchText = this.value.trim();

    renderTasks();

});

/*==========================
      FILTER
==========================*/

filterTask.addEventListener("change", function () {

    filter = this.value;

    renderTasks();

});

/*==========================
      DATE FILTER
==========================*/

function filterByDate(date) {

    selectedDate = date;

    renderTasks();

}

function clearDateFilter() {

    selectedDate = "";

    renderTasks();

}

/*==========================
      REFRESH UI
==========================*/

function refreshUI() {

    sortTasks();

    saveTasks();

    updateDashboard();

    renderTasks();

}







/*==================================================
        SECTION 3B-2
        THEME + INITIALIZATION
==================================================*/

/*==========================
      DARK MODE
==========================*/

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    saveTheme();

    if (document.body.classList.contains("dark")) {

        showToast("Dark Mode Enabled");

    } else {

        showToast("Light Mode Enabled");

    }

});

/*==========================
      PAGE SHORTCUTS
==========================*/

document.addEventListener("keydown", function (e) {

    /* Ctrl + Enter => Add Task */

    if (e.ctrlKey && e.key === "Enter") {

        addTask();

    }

    /* ESC => Clear Search */

    if (e.key === "Escape") {

        searchTask.value = "";

        searchText = "";

        renderTasks();

    }

});

/*==========================
      AUTO SORT
==========================*/

function autoSort() {

    tasks.sort((a, b) => {

        /* Pending first */

        if (a.completed !== b.completed) {

            return a.completed - b.completed;

        }

        /* High Priority */

        const priorityOrder = {

            High: 1,

            Medium: 2,

            Low: 3

        };

        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {

            return priorityOrder[a.priority] - priorityOrder[b.priority];

        }

        /* Due Date */

        if (a.dueDate && b.dueDate) {

            return new Date(a.dueDate) - new Date(b.dueDate);

        }

        return 0;

    });

}

/*==========================
      AUTO SAVE
==========================*/

function autoSave() {

    autoSort();

    saveTasks();

}

/*==========================
      PAGE LOAD
==========================*/

window.addEventListener("load", () => {

    loadTasks();

    loadTheme();

    autoSort();

    updateDashboard();

    renderTasks();

});

/*==========================
      BEFORE UNLOAD
==========================*/

window.addEventListener("beforeunload", () => {

    saveTasks();

});

/*==========================
      HELPER FUNCTIONS
==========================*/

function getCompletedCount() {

    return tasks.filter(task => task.completed).length;

}

function getPendingCount() {

    return tasks.filter(task => !task.completed).length;

}

function getTotalCount() {

    return tasks.length;

}

/*==========================
      TODAY DATE
==========================*/

function getToday() {

    const today = new Date();

    return today.toISOString().split("T")[0];

}

/*==========================
      DEFAULT DATE
==========================*/

if (taskDate) {

    taskDate.min = getToday();

}

/*==========================
      START APPLICATION
==========================*/

renderTasks();

showToast("Task Tracker Ready 🚀");






/*==================================================
            SECTION 4A
        CALENDAR ENGINE
==================================================*/

let today = new Date();

let selectedDay = today.getDate();

/*==========================
      MONTH NAMES
==========================*/

const months = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",

    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];

/*==========================
      DAYS IN MONTH
==========================*/

function getDaysInMonth(month, year) {

    return new Date(

        year,

        month + 1,

        0

    ).getDate();

}

/*==========================
      FIRST DAY
==========================*/

function getFirstDay(month, year) {

    return new Date(

        year,

        month,

        1

    ).getDay();

}

/*==========================
      DRAW CALENDAR
==========================*/

function renderCalendar() {

    calendar.innerHTML = "";

    monthYear.textContent =

        `${months[currentMonth]} ${currentYear}`;

    const firstDay =

        getFirstDay(

            currentMonth,

            currentYear

        );

    const totalDays =

        getDaysInMonth(

            currentMonth,

            currentYear

        );

    /* Empty Boxes */

    for (let i = 0; i < firstDay; i++) {

        const empty =

            document.createElement("div");

        empty.classList.add("empty");

        calendar.appendChild(empty);

    }

    /* Days */

    for (let day = 1; day <= totalDays; day++) {

        const dateBox =

            document.createElement("div");

        dateBox.classList.add("day");

        dateBox.innerText = day;

        /* Today's Highlight */

        if (

            day === today.getDate() &&

            currentMonth === today.getMonth() &&

            currentYear === today.getFullYear()

        ) {

            dateBox.classList.add("today");

        }

        /* Selected Day */

        if (

            selectedDay === day &&

            selectedDate !== "" &&

            currentMonth === new Date(selectedDate).getMonth() &&

            currentYear === new Date(selectedDate).getFullYear()

        ) {

            dateBox.classList.add("selected");

        }

        /* Save Full Date */

        const fullDate =

            `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        dateBox.dataset.date = fullDate;

        calendar.appendChild(dateBox);

    }

}








/*==================================================
            SECTION 4B
        CALENDAR INTERACTION
==================================================*/

/*==========================
      TASK DOTS
==========================*/

function addTaskDots() {

    const dayElements = document.querySelectorAll(".day");

    dayElements.forEach(day => {

        const date = day.dataset.date;

        if (!date) return;

        const hasTask = tasks.some(task => task.dueDate === date);

        if (hasTask) {

            day.classList.add("has-task");

        } else {

            day.classList.remove("has-task");

        }

    });

}

/*==========================
      DATE CLICK
==========================*/

calendar.addEventListener("click", function (e) {

    if (!e.target.classList.contains("day")) return;

    if (!e.target.dataset.date) return;

    document
        .querySelectorAll(".day")
        .forEach(day => day.classList.remove("selected"));

    e.target.classList.add("selected");

    selectedDate = e.target.dataset.date;

    renderTasks();

});

/*==========================
      PREVIOUS MONTH
==========================*/

prevMonth.addEventListener("click", () => {

    currentMonth--;

    if (currentMonth < 0) {

        currentMonth = 11;

        currentYear--;

    }

    renderCalendar();

    addTaskDots();

});

/*==========================
      NEXT MONTH
==========================*/

nextMonth.addEventListener("click", () => {

    currentMonth++;

    if (currentMonth > 11) {

        currentMonth = 0;

        currentYear++;

    }

    renderCalendar();

    addTaskDots();

});

/*==========================
      RESET FILTER
==========================*/

function showAllTasks() {

    selectedDate = "";

    renderTasks();

    renderCalendar();

    addTaskDots();

}

/*==========================
      CALENDAR REFRESH
==========================*/

function refreshCalendar() {

    renderCalendar();

    addTaskDots();

}

/*==========================
      INITIAL CALENDAR
==========================*/

refreshCalendar();











/*==================================================
            SECTION 4C
     CALENDAR ENHANCEMENTS
==================================================*/

/*==========================
      TODAY BUTTON
==========================*/

function goToToday() {

    const now = new Date();

    currentMonth = now.getMonth();

    currentYear = now.getFullYear();

    selectedDate = now.toISOString().split("T")[0];

    renderCalendar();

    addTaskDots();

    renderTasks();

}

/*==========================
      HIGHLIGHT DUE DATES
==========================*/

function highlightTaskDates() {

    document.querySelectorAll(".day").forEach(day => {

        const date = day.dataset.date;

        if (!date) return;

        const taskListForDate = tasks.filter(
            task => task.dueDate === date
        );

        if (taskListForDate.length === 0) return;

        const hasPending = taskListForDate.some(
            task => !task.completed
        );

        const hasCompleted = taskListForDate.every(
            task => task.completed
        );

        if (hasPending) {

            day.style.border = "2px solid #F59E0B";

        }

        if (hasCompleted) {

            day.style.border = "2px solid #10B981";

        }

    });

}

/*==========================
      OVERDUE DATES
==========================*/

function markOverdueDates() {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    document.querySelectorAll(".day").forEach(day => {

        const date = day.dataset.date;

        if (!date) return;

        const taskExists = tasks.some(task =>

            task.dueDate === date &&

            !task.completed

        );

        if (!taskExists) return;

        const due = new Date(date);

        due.setHours(0, 0, 0, 0);

        if (due < today) {

            day.style.background = "#FEE2E2";

            day.style.color = "#B91C1C";

        }

    });

}

/*==========================
      CALENDAR STATS
==========================*/

function getTasksOnSelectedDate() {

    if (selectedDate === "") {

        return tasks.length;

    }

    return tasks.filter(task =>

        task.dueDate === selectedDate

    ).length;

}

/*==========================
      CALENDAR REFRESH
==========================*/

const oldRefreshCalendar = refreshCalendar;

refreshCalendar = function () {

    oldRefreshCalendar();

    highlightTaskDates();

    markOverdueDates();

};

/*==========================
      DOUBLE CLICK
==========================*/

calendar.addEventListener("dblclick", function () {

    selectedDate = "";

    renderTasks();

    refreshCalendar();

});

/*==========================
      KEYBOARD SHORTCUT
==========================*/

document.addEventListener("keydown", function (e) {

    if (e.key.toLowerCase() === "t") {

        goToToday();

    }

});

/*==========================
      INITIAL REFRESH
==========================*/

refreshCalendar();