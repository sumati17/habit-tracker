# Habit Tracker

A simple and interactive **Habit Tracker** built with HTML, CSS, and JavaScript.
The app allows users to create habits, track daily progress, maintain streaks, and view their 7-day completion history.

##  Features

*  Add new habits
*  Mark habits as completed for the current day
*  Track current streaks
*  Track longest streaks
*  View 7-day habit history
*  Dashboard with:

  * Total habits
  * Habits completed today
  * Today's progress percentage
*  Delete habits
*  Persistent data using **LocalStorage**
*  Responsive design for different screen sizes
*  Clean and modern user interface

## Technologies Used

* **HTML5** — Structure of the application
* **CSS3** — Styling, layout, responsive design
* **JavaScript (ES6)** — Application logic and DOM manipulation
* **LocalStorage** — Saving habits and completion history in the browser

## Project Structure

```text
habit-tracker/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

##  How to Run

1. Clone the repository:

```bash
git clone https://github.com/sumati17/habit-tracker.git
```

2. Open the project folder:

```bash
cd habit-tracker
```

3. Open `index.html` in your browser.

No backend or database setup is required.

##  How It Works

Each habit is stored as an object containing its name, unique ID, and the dates on which it was completed.

Example:

```javascript
{
    id: 123456789,
    name: "Workout",
    completedDates: [
        "2026-09-23",
        "2026-09-24",
        "2026-09-25"
    ]
}
```

The application uses these completion dates to calculate:

* Current streak
* Longest streak
* Today's completion status
* 7-day history
* Overall daily progress

All habit data is stored in the browser using `localStorage`, so the data remains available even after refreshing or reopening the browser.

## 📊 Dashboard

The dashboard provides a quick overview of daily progress:

| Statistic        | Description                          |
| ---------------- | ------------------------------------ |
| Total Habits     | Number of habits created             |
| Completed Today  | Habits completed today               |
| Today's Progress | Percentage of habits completed today |

##  Streak Tracking

The app automatically calculates two types of streaks:

**Current Streak**
The number of consecutive days the habit has been completed up to today.

**Longest Streak**
The longest consecutive sequence of completed days recorded for the habit.

## 7-Day History

Each habit displays its completion history for the last seven days, making it easy to see consistency at a glance.

## Data Persistence

Habit data is stored using browser `localStorage`.

This means:

* Data survives page refreshes
* Habits remain available after reopening the browser
* No external database is required

## Future Improvements

Some features that could be added in future versions:

*  Dark mode
*  Habit reminders
*  Monthly and yearly statistics
*  Achievement badges
*  Full calendar view
*  Edit existing habits
*  Search and filter habits
*  Export habit data
* ️ User accounts and cloud synchronization.

##  Author

**Sumati Dani**

Built as a learning project to practice:

* JavaScript
* DOM manipulation
* LocalStorage
* Date handling
* Array methods
* Dynamic UI rendering
* Responsive CSS
* Git & GitHub


