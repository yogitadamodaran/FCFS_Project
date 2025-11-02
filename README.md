# FCFS CPU Scheduling Visualizer

## 📘 Overview
This project visually demonstrates the **First Come First Serve (FCFS)** CPU scheduling algorithm through an interactive web-based simulator.  
It allows users to input multiple processes, generate a process table, and view a step-by-step Gantt Chart animation.

---

## 🧩 Features
- Dynamic process input table
- Modular code design:
  - `fcfs_algo.js`: FCFS algorithm logic
  - `anim.js`: Gantt chart rendering and animation
  - `main.js`: UI control and event handling
- Step-by-step animation with play, pause, and speed control
- Automatic calculation of **Average Waiting Time** and **Turnaround Time**

---

## ⚙️ Setup Instructions
1. Download or clone this project folder.
2. Open the folder in **VS Code**.
3. Install the **Live Server** extension (or use any local web server).
4. Right-click on `index.html` → select **“Open with Live Server”**.
5. The application will open at `http://localhost:5500/`.

> ⚠️ Opening directly with `file:///` may break JavaScript modules.

---

## 🖥️ User Interface Guide
| Element | Description |
|----------|--------------|
| **Number of Processes** | Input total number of processes (1–20). |
| **Generate Table** | Creates table for entering arrival and burst times. |
| **Build** | Runs FCFS algorithm and generates Gantt chart. |
| **Play / Pause / Step** | Controls the timeline animation. |
| **Speed Slider** | Adjusts animation speed. |
| **Reset** | Clears the current simulation. |

---

## 🎨 Animation Features
- **Gantt Chart** dynamically shows CPU execution timeline.
- Each process is color-coded using a unique HSL-based color.
- Current process execution is highlighted.
- Timeline slider allows manual navigation.
- Statistics panel displays current time, average waiting, and turnaround times.

---

## 🌐 Browser Requirements
| Browser | Minimum Version |
|----------|------------------|
| Google Chrome | 90+ |
| Microsoft Edge | 90+ |
| Mozilla Firefox | 88+ |
| Safari (macOS) | 14+ |

> The project uses modern ES Modules and Canvas API, so an updated browser is required.

---

## 👩‍💻 Author
**Name:** Yogita Damodaran  
**Roll No:** 23BCB0039

