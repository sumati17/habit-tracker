const addHabitBtn = document.getElementById("addHabitBtn");
const habitList = document.getElementById("habitList");
const totalHabits = document.getElementById("totalHabits");
const completedToday = document.getElementById("completedToday");
const progressPercentage = document.getElementById("progressPercentage");
const habitCategory = document.getElementById("habitCategory");

// Load habits from LocalStorage
let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Ensure every habit has a completedDates array
habits = habits.map(function (habit) {
    if (!Array.isArray(habit.completedDates)) {
        habit.completedDates = [];
    }
    return habit;
});

// Get today's date in YYYY-MM-DD format
function getToday() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// Get a date from a specified number of days ago
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

// Save habits to LocalStorage
function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
}

// Update dashboard statistics
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

// Display all habits
function renderHabits() {
    updateDashboard();

    habitList.innerHTML = "";

    habits.forEach(function (habit) {
        const today = getToday();

        const isCompletedToday =
            habit.completedDates.includes(today);

        const currentStreak = calculateCurrentStreak(
            habit.completedDates
        );

        const longestStreak = calculateLongestStreak(
            habit.completedDates
        );

        // Create habit card
        const habitCard = document.createElement("div");
        habitCard.classList.add("habit-card");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = isCompletedToday;

        // Create habit name
        const habitText = document.createElement("span");
        habitText.textContent = habit.name;

        const categoryText = document.createElement("small");
        categoryText.textContent = `📌 ${habit.category || "Personal"}`;

        // Create streak information
        const streakText = document.createElement("small");
        streakText.textContent =
            `🔥 ${currentStreak} day streak | 🏆 ${longestStreak} best`;

        // Create 7-day history
        const history = document.createElement("div");
        history.classList.add("history");

        for (let i = 6; i >= 0; i--) {
            const date = getDateDaysAgo(i);

            const dayBox = document.createElement("div");
            dayBox.classList.add("day-box");

            const dayName = document.createElement("small");

            const dateObject = new Date(date + "T12:00:00");

            dayName.textContent = dateObject.toLocaleDateString(
                "en-US",
                { weekday: "short" }
            );

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

        // Create Edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        // Create Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        // Style completed habits
        if (isCompletedToday) {
            habitText.style.textDecoration = "line-through";
            habitText.style.color = "gray";
        }

        // Checkbox event
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

        // Delete event
        deleteBtn.addEventListener("click", function () {
            habits = habits.filter(function (item) {
                return item.id !== habit.id;
            });

            saveHabits();
            renderHabits();
        });

        // Edit event
        editBtn.addEventListener("click", function () {
            const newName = prompt(
                "Enter the new habit name:",
                habit.name
            );

            if (newName === null) {
                return;
            }

            const trimmedName = newName.trim();

            if (trimmedName === "") {
                alert("Habit name cannot be empty!");
                return;
            }

            habit.name = trimmedName;

            saveHabits();
            renderHabits();
        });

        // Add elements to habit card
        habitCard.appendChild(checkbox);
        habitCard.appendChild(habitText);
        habitCard.appendChild(categoryText);
        habitCard.appendChild(streakText);
        habitCard.appendChild(history);
        habitCard.appendChild(editBtn);
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
        category: habitCategory.value,
        completedDates: []
    };

    habits.push(newHabit);

    saveHabits();
    renderHabits();

    habitInput.value = "";
});

// Initial render
renderHabits();

