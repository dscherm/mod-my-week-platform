# Lesson 2.3: Charts with Chart.js - Data Visualization

## Lesson Overview
| Item | Details |
|------|---------|
| **Duration** | 60-75 minutes |
| **Week** | Week 2 - Live Data & Visualization |
| **Day** | Day 8 |
| **Prerequisites** | fetch(), async/await, updating data (Days 1-7) |
| **Platform Exercises** | w2d3-1, w2d3-2 |

## Learning Objectives
By the end of this lesson, students will be able to:
1. **Set up** Chart.js in an HTML page
2. **Create** bar charts, line charts, and pie charts
3. **Populate** charts with data from APIs
4. **Update** chart data dynamically
5. **Choose** appropriate chart types for different data

## Vocabulary Terms
- **Chart.js** - JavaScript library for creating interactive charts
- **Canvas** - HTML element where charts are drawn
- **Dataset** - Collection of values to display in a chart
- **Labels** - Text identifying data points (x-axis categories)
- **Legend** - Key explaining what colors/lines represent
- **Axes** - The x (horizontal) and y (vertical) reference lines

## Libraries Used
- **Chart.js** - Chart rendering and interaction
- **fetch()** - For loading data to visualize

## Materials Needed
- CyberEd Range platform access
- Computer with modern browser
- Internet connection
- Projector for demonstrations

---

## Phase 1: EXPLORE (10-15 minutes)

### Purpose
- See how charts communicate data better than text
- Understand different chart types and their uses
- Create motivation for learning Chart.js

### Activity: "Numbers vs Pictures"

**Setup:**
Display this data as text:

```
Monthly Sales Data:
January: $12,000
February: $15,000
March: $18,000
April: $14,000
May: $22,000
June: $28,000
```

**Then show as a bar chart:**
```
Sales ($)
30k │              ████
25k │         ████ ████
20k │    ████ ████ ████
15k │    ████ ████ ████
10k │████████████████████
    └─────────────────────
     Jan Feb Mar Apr May Jun
```

**Discussion Prompts:**
- "Which format helps you understand the trend faster?"
- "Can you spot the best month instantly in the chart?"
- "What if we had 50 months of data instead of 6?"
- "When would text numbers be better than a chart?"

**Show Different Chart Types:**
- **Bar Chart**: Comparing categories
- **Line Chart**: Showing trends over time
- **Pie Chart**: Showing parts of a whole
- **Scatter Plot**: Showing relationships

**Key Discovery Points:**
Students should realize:
- Charts reveal patterns humans can't see in numbers
- Different data needs different chart types
- Charts make data accessible and understandable
- Interactive charts are even more powerful

**Transition:**
> "Let's learn Chart.js - a library that makes it easy to create beautiful, interactive charts with JavaScript!"

---

## Phase 2: EXPLAIN (15-20 minutes)

### Part 1: Chart.js Setup

**HTML Structure:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>My Charts</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <canvas id="myChart" width="400" height="200"></canvas>
  <script src="script.js"></script>
</body>
</html>
```

### Part 2: Creating a Bar Chart

```javascript
// Get the canvas context
const ctx = document.getElementById('myChart').getContext('2d');

// Create the chart
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Sales ($)',
      data: [12000, 15000, 18000, 14000, 22000, 28000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
```

### Part 3: Different Chart Types

**Line Chart (for trends):**
```javascript
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Temperature (°C)',
      data: [12, 19, 15, 17, 22],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }
});
```

**Pie Chart (for proportions):**
```javascript
new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
    }]
  }
});
```

**Doughnut Chart (pie with hole):**
```javascript
new Chart(ctx, {
  type: 'doughnut',
  data: { /* same as pie */ }
});
```

### Part 4: Charts with API Data

```javascript
async function loadDataAndCreateChart() {
  // Fetch data from API
  const response = await fetch('https://api.example.com/stats');
  const data = await response.json();

  // Extract values for chart
  const labels = data.map(item => item.name);
  const values = data.map(item => item.count);

  // Create chart with API data
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Count',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      }]
    }
  });
}

loadDataAndCreateChart();
```

### Part 5: Updating Charts

```javascript
let myChart;

function createChart(labels, data) {
  const ctx = document.getElementById('myChart').getContext('2d');

  // Destroy old chart if exists
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Data',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      }]
    }
  });
}

// Or update existing chart data:
function updateChart(newData) {
  myChart.data.datasets[0].data = newData;
  myChart.update();
}
```

### Chart Type Guide:

```
┌─────────────────────────────────────────────────────────────┐
│                 WHEN TO USE EACH CHART                       │
├─────────────────────────────────────────────────────────────┤
│  BAR CHART     │ Comparing categories                       │
│  █ █ █ █       │ "Sales by region", "Votes by candidate"   │
├─────────────────────────────────────────────────────────────┤
│  LINE CHART    │ Showing trends over time                   │
│  ╱╲_╱╲         │ "Temperature over week", "Stock prices"   │
├─────────────────────────────────────────────────────────────┤
│  PIE CHART     │ Parts of a whole (100%)                    │
│  ◐            │ "Browser market share", "Budget breakdown" │
├─────────────────────────────────────────────────────────────┤
│  SCATTER       │ Relationship between two variables         │
│  · · ·        │ "Height vs Weight", "Study time vs Grade" │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 3: APPLY (15-20 minutes)

### Guided Practice: "Weather Forecast Chart"

**Task 1: Create Temperature Line Chart**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Weather Chart</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .chart-container { width: 80%; margin: 0 auto; }
  </style>
</head>
<body>
  <h1>5-Day Temperature Forecast</h1>
  <div class="chart-container">
    <canvas id="tempChart"></canvas>
  </div>

  <script>
    // Sample forecast data (would come from API)
    const forecast = [
      { day: 'Monday', high: 72, low: 58 },
      { day: 'Tuesday', high: 75, low: 60 },
      { day: 'Wednesday', high: 68, low: 55 },
      { day: 'Thursday', high: 70, low: 57 },
      { day: 'Friday', high: 78, low: 62 }
    ];

    const labels = forecast.map(d => d.day);
    const highs = forecast.map(d => d.high);
    const lows = forecast.map(d => d.low);

    const ctx = document.getElementById('tempChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'High (°F)',
            data: highs,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            fill: true
          },
          {
            label: 'Low (°F)',
            data: lows,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '5-Day Temperature Forecast'
          }
        }
      }
    });
  </script>
</body>
</html>
```

**Task 2: Platform Exercise w2d3-1**
Have students complete "Basic Chart Creation" exercise.
- Create bar chart with provided data
- Add labels and colors
- Customize title

---

## Phase 4: PRACTICE (15-20 minutes)

### Independent Challenge: "Data Dashboard"

**Exercise 1: Dynamic Pie Chart** (Platform: w2d3-1)
Students create a pie chart showing:
- Category breakdown from API data
- Custom colors for each slice
- Percentage labels

**Exercise 2: Live Updating Line Chart** (Platform: w2d3-2)
Students create a chart that:
- Fetches new data every 10 seconds
- Adds new point to line chart
- Keeps last 10 data points (removes old)
- Shows real-time data stream

**Code for Adding Points:**
```javascript
function addDataPoint(chart, label, value) {
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(value);

  // Keep only last 10 points
  if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }

  chart.update();
}
```

**Goal:** Complete both exercises earning 30 points total.

---

## Phase 5: CHALLENGE (10-15 minutes)

### Mini-Challenge: "Analytics Dashboard"

**Scenario:**
> "Build a dashboard that visualizes data from multiple sources using different chart types!"

**Level 1 (Basic):**
Create a bar chart showing data from one API endpoint.

**Level 2 (Intermediate):**
Create TWO charts side by side:
- Bar chart for categories
- Line chart for trends

**Level 3 (Advanced):**
Create a complete dashboard with:
- 3+ different chart types
- Data from real APIs
- Charts update on button click
- Responsive layout

**BONUS:**
Add chart type selector - let user switch between bar, line, and pie for the same data!

---

## Wrap-Up & Reflection (5 minutes)

### Key Takeaways
1. Chart.js creates beautiful, interactive charts easily
2. Match chart type to your data (bar=compare, line=trend, pie=proportion)
3. Use `map()` to extract labels and values from API data
4. Call `chart.update()` to refresh with new data
5. Destroy old chart before creating new one with same ID

### Exit Ticket
> "When would you use a line chart instead of a bar chart?"

**Expected Answer:**
- Line chart: showing trends over time, continuous data
- Bar chart: comparing distinct categories
- Line chart connects points to show progression
- Bar chart shows independent values side by side

### Preview Next Lesson
> "Tomorrow we'll combine multiple data sources into one dashboard - pulling from different APIs and showing them together!"

---

## Differentiation

### For Struggling Students
- Provide complete HTML template
- Use static data before API data
- Focus on one chart type only
- Pair with successful student

### For Advanced Students
- Challenge them to create custom plugins
- Implement real-time streaming charts
- Research additional chart types (radar, bubble)
- Add animations and transitions

---

## Assessment Rubric

| Criterion | Excellent (4) | Good (3) | Developing (2) | Beginning (1) |
|-----------|---------------|----------|----------------|---------------|
| **Chart Creation** | Creates multiple chart types perfectly | Creates basic charts correctly | Creates charts with help | Cannot create charts |
| **Data Integration** | Seamlessly uses API data in charts | Uses API data with minor issues | Uses static data only | Cannot connect data |
| **Chart Updates** | Smooth real-time updates | Updates work with minor issues | Basic updates only | Cannot update charts |
| **Type Selection** | Chooses optimal chart type for data | Reasonable chart type choices | Uses one type for all | Poor type choices |

---

## Teacher Notes

### Common Mistakes to Watch For

1. **Not destroying old chart:**
   ```javascript
   // WRONG - creates overlapping charts
   function updateChart() {
     new Chart(ctx, config);
   }

   // RIGHT
   let chart;
   function updateChart() {
     if (chart) chart.destroy();
     chart = new Chart(ctx, config);
   }
   ```

2. **Wrong data structure:**
   ```javascript
   // WRONG - data should be array of numbers
   data: { jan: 100, feb: 200 }

   // RIGHT
   labels: ['Jan', 'Feb'],
   data: [100, 200]
   ```

3. **Canvas ID mismatch:**
   ```javascript
   // HTML: <canvas id="myChart">
   // WRONG
   document.getElementById('chart')
   // RIGHT
   document.getElementById('myChart')
   ```

---

## Slide Deck Outline

### Slide 1: Title
**Charts with Chart.js**
- Transform data into visuals
- Bar, line, pie, and more
- Today: Create interactive dashboards!

### Slide 2: Why Charts?
Numbers: 12000, 15000, 18000, 14000...
vs
Charts: [visual bar chart]
Which tells the story better?

### Slide 3: Chart.js Setup
```html
<script src="chart.js"></script>
<canvas id="myChart"></canvas>
```

### Slide 4: Basic Chart
```javascript
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [...],
    datasets: [{ data: [...] }]
  }
});
```

### Slide 5: Chart Types
- Bar: Compare categories
- Line: Show trends
- Pie: Parts of whole
- Scatter: Relationships

### Slide 6: Practice Time
**Exercises:**
1. Basic Chart Creation (15 pts)
2. Live Updating Chart (15 pts)
