const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");

// Load habits
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Migrate older habit format
habits = habits.map(function (habit) {

    if (!Array.isArray(habit.completedDates)) {
        habit.completedDates = [];
    }

    return habit;

});

// Get today's date in local time
function getToday() {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

// Get date a certain number of days ago
function getDateDaysAgo(daysAgo) {

    const date = new Date();

    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - daysAgo);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

// Calculate current streak
function calculateCurrentStreak(completedDates) {

    let streak = 0;

    for (let i = 0; ; i++) {

        const date = getDateDaysAgo(i);

        if (completedDates.includes(date)) {
            streak++;
        } else {
            break;
        }

    }

    return streak;

}

// Calculate longest streak
function calculateLongestStreak(completedDates) {

    if (completedDates.length === 0) {
        return 0;
    }

    const dates = [...new Set(completedDates)].sort();

    let longest = 1;
    let current = 1;

    for (let i = 1; i < dates.length; i++) {

        const previousDate = new Date(dates[i - 1] + "T12:00:00");
        const currentDate = new Date(dates[i] + "T12:00:00");

        const difference =
            (currentDate - previousDate) / (1000 * 60 * 60 * 24);

        if (difference === 1) {

            current++;
            longest = Math.max(longest, current);

        } else {

            current = 1;

        }

    }

    return longest;

}

// Save habits
function saveHabits() {

    localStorage.setItem("habits", JSON.stringify(habits));

}

// Render habits
function renderHabits() {

    habitList.innerHTML = "";

    habits.forEach(function (habit) {

        const today = getToday();

        const completedToday = habit.completedDates.includes(today);

        const currentStreak = calculateCurrentStreak(
            habit.completedDates
        );

        const longestStreak = calculateLongestStreak(
            habit.completedDates
        );

        const habitCard = document.createElement("div");
        habitCard.classList.add("habit-card");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completedToday;

        const habitText = document.createElement("span");
        habitText.textContent = habit.name;

        const streakText = document.createElement("small");
        streakText.textContent =
            `🔥 ${currentStreak} day streak | 🏆 ${longestStreak} best`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        if (completedToday) {

            habitText.style.textDecoration = "line-through";
            habitText.style.color = "gray";

        }

        // Toggle today's completion
        checkbox.addEventListener("change", function () {

            if (checkbox.checked) {

                if (!habit.completedDates.includes(today)) {
                    habit.completedDates.push(today);
                }

            } else {

                habit.completedDates =
                    habit.completedDates.filter(function (date) {
                        return date !== today;
                    });

            }

            saveHabits();
            renderHabits();

        });

        // Delete habit
        deleteBtn.addEventListener("click", function () {

            habits = habits.filter(function (item) {
                return item.id !== habit.id;
            });

            saveHabits();
            renderHabits();

        });

        habitCard.appendChild(checkbox);
        habitCard.appendChild(habitText);
        habitCard.appendChild(streakText);
        habitCard.appendChild(deleteBtn);

        habitList.appendChild(habitCard);

    });

}

// Add new habit
addHabitBtn.addEventListener("click", function () {

    const habitName = habitInput.value.trim();

    if (habitName === "") {

        alert("Please enter a habit!");
        return;

    }

    const newHabit = {

        id: Date.now(),
        name: habitName,
        completedDates: []

    };

    habits.push(newHabit);

    saveHabits();
    renderHabits();

    habitInput.value = "";

});

// Initial render
const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
const totalHabits = document.getElementById("totalHabits");
const completedToday = document.getElementById("completedToday");
const progressPercentage = document.getElementById("progressPercentage");

// Load habits
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Migrate older habit format
habits = habits.map(function (habit) {

    if (!Array.isArray(habit.completedDates)) {
        habit.completedDates = [];
    }

    return habit;

});

// Get today's date in local time
function getToday() {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

// Get date a certain number of days ago
function getDateDaysAgo(daysAgo) {

    const date = new Date();

    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - daysAgo);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

}

// Calculate current streak
function calculateCurrentStreak(completedDates) {

    let streak = 0;

    for (let i = 0; ; i++) {

        const date = getDateDaysAgo(i);

        if (completedDates.includes(date)) {
            streak++;
        } else {
            break;
        }

    }

    return streak;

}

// Calculate longest streak
function calculateLongestStreak(completedDates) {

    if (completedDates.length === 0) {
        return 0;
    }

    const dates = [...new Set(completedDates)].sort();

    let longest = 1;
    let current = 1;

    for (let i = 1; i < dates.length; i++) {

        const previousDate = new Date(dates[i - 1] + "T12:00:00");
        const currentDate = new Date(dates[i] + "T12:00:00");

        const difference =
            (currentDate - previousDate) / (1000 * 60 * 60 * 24);

        if (difference === 1) {

            current++;
            longest = Math.max(longest, current);

        } else {

            current = 1;

        }

    }

    return longest;

}

// Save habits
function saveHabits() {

    localStorage.setItem("habits", JSON.stringify(habits));

}

//update dashboard 
function updateDashboard() {

    const today = getToday();

    const total = habits.length;

    const completed = habits.filter(function (habit) {
        return habit.completedDates.includes(today);
    }).length;

    let percentage = 0;

    if (total > 0) {
        percentage = Math.round((completed / total) * 100);
    }

    totalHabits.textContent = total;
    completedToday.textContent = completed;
    progressPercentage.textContent = percentage + "%";

}

// Render habits
function renderHabits() {
    updateDashboard();

    habitList.innerHTML = "";

    habits.forEach(function (habit) {

        const today = getToday();

        const completedToday = habit.completedDates.includes(today);

        const currentStreak = calculateCurrentStreak(
            habit.completedDates
        );

        const longestStreak = calculateLongestStreak(
            habit.completedDates
        );

        const habitCard = document.createElement("div");
        habitCard.classList.add("habit-card");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completedToday;

        const habitText = document.createElement("span");
        habitText.textContent = habit.name;

        const streakText = document.createElement("small");
        streakText.textContent =
            `🔥 ${currentStreak} day streak | 🏆 ${longestStreak} best`;
        
        const history = document.createElement("div");
        history.classList.add("history");

        for (let i = 6; i >= 0; i--) {

    const date = getDateDaysAgo(i);

    const dayBox = document.createElement("div");
    dayBox.classList.add("day-box");

    const dayName = document.createElement("small");

    const dateObject = new Date(date + "T12:00:00");

    dayName.textContent = dateObject.toLocaleDateString("en-US", {
        weekday: "short"
    });

    const dayStatus = document.createElement("span");

    if (habit.completedDates.includes(date)) {
        dayStatus.textContent = "✓";
        dayBox.classList.add("completed-day");
    } else {
        dayStatus.textContent = "·";
    }

    dayBox.appendChild(dayName);
    dayBox.appendChild(dayStatus);

    history.appendChild(dayBox);
}

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        if (completedToday) {

            habitText.style.textDecoration = "line-through";
            habitText.style.color = "gray";

        }

        // Toggle today's completion
        checkbox.addEventListener("change", function () {

            if (checkbox.checked) {

                if (!habit.completedDates.includes(today)) {
                    habit.completedDates.push(today);
                }

            } else {

                habit.completedDates =
                    habit.completedDates.filter(function (date) {
                        return date !== today;
                    });

            }

            saveHabits();
            renderHabits();

        });

        // Delete habit
        deleteBtn.addEventListener("click", function () {

            habits = habits.filter(function (item) {
                return item.id !== habit.id;
            });

            saveHabits();
            renderHabits();

        });

        habitCard.appendChild(checkbox);
        habitCard.appendChild(habitText);
        habitCard.appendChild(streakText);
        habitCard.appendChild(deleteBtn);
        habitCard.appendChild(history);
        habitList.appendChild(habitCard);

    });

}

// Add new habit
addHabitBtn.addEventListener("click", function () {

    const habitName = habitInput.value.trim();

    if (habitName === "") {

        alert("Please enter a habit!");
        return;

    }

    const newHabit = {

        id: Date.now(),
        name: habitName,
        completedDates: []

    };

    habits.push(newHabit);

    saveHabits();
    renderHabits();

    habitInput.value = "";

});

