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
renderHabits();