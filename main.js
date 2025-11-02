import { computeFCFS } from "./fcfs_algo.js";
import { renderGantt } from "./anim.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ FCFS script loaded successfully");

  const numProcessesInput = document.getElementById("numProcesses");
  const generateTableBtn = document.getElementById("generateTable");
  const runBtn = document.getElementById("runFCFS");
  const resetBtn = document.getElementById("resetBtn");
  const playBtn = document.getElementById("playBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const stepBackBtn = document.getElementById("stepBack");
  const stepFwdBtn = document.getElementById("stepFwd");
  const timeline = document.getElementById("timeline");
  const speedSlider = document.getElementById("speed");
  const speedValue = document.getElementById("speedValue");

  const tableBody = document.querySelector("#processTable tbody");
  const curTime = document.getElementById("curTime");
  const avgWait = document.getElementById("avgWait");
  const avgTurn = document.getElementById("avgTurn");
  const canvas = document.getElementById("ganttCanvas");
  const ctx = canvas.getContext("2d");

  let fcfsData = null;
  let currentTime = 0;
  let animTimer = null;
  let isPlaying = false;

  // ✅ Generate Table
  generateTableBtn.addEventListener("click", () => {
    const n = parseInt(numProcessesInput.value);

    if (isNaN(n) || n <= 0) {
      alert("Please enter a valid number of processes (1–20).");
      return;
    }

    tableBody.innerHTML = ""; // clear old table

    for (let i = 0; i < n; i++) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>P${i + 1}</td>
        <td><input type="number" class="arrival" min="0" value="${i}" /></td>
        <td><input type="number" class="burst" min="1" value="${i + 1}" /></td>
      `;
      tableBody.appendChild(row);
    }

    // Add animation to table rows
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row, idx) => {
      row.style.opacity = "0";
      row.style.transform = "translateY(-10px)";
      setTimeout(() => {
        row.style.transition = "all 0.3s ease";
        row.style.opacity = "1";
        row.style.transform = "translateY(0)";
      }, idx * 50);
    });

    console.log("✅ Table generated with", n, "processes");
  });

  // ✅ Speed slider update display
  speedSlider.addEventListener("input", () => {
    const speed = parseFloat(speedSlider.value);
    speedValue.textContent = `${speed.toFixed(2)}x`;
    // Update animation speed if playing
    if (isPlaying && animTimer) {
      clearInterval(animTimer);
      const delay = 1000 / speed;
      animTimer = setInterval(() => {
        if (currentTime >= fcfsData.timeSpan.max) {
          clearInterval(animTimer);
          isPlaying = false;
          return;
        }
        currentTime++;
        timeline.value = currentTime;
        curTime.textContent = currentTime;
        renderGantt(fcfsData.perUnit, fcfsData.segments, currentTime, fcfsData.results);
      }, delay);
    }
  });

  // Initialize speed display
  if (speedValue) {
    speedValue.textContent = `${parseFloat(speedSlider.value).toFixed(2)}x`;
  }

  // ✅ Build & Run (Compute FCFS)
  runBtn.addEventListener("click", () => {
    const rows = tableBody.querySelectorAll("tr");
    if (rows.length === 0) {
      alert("Please generate the process table first.");
      return;
    }

    const processes = Array.from(rows).map((row) => {
      const pid = row.cells[0].textContent.trim();
      const arrival = Number(row.querySelector(".arrival").value);
      const burst = Number(row.querySelector(".burst").value);
      return { pid, arrival, burst };
    });

    fcfsData = computeFCFS(processes);

    // Reset state for animation
    currentTime = fcfsData.timeSpan?.min ?? 0;
    timeline.min = currentTime;
    timeline.max = fcfsData.timeSpan?.max ?? 0;
    timeline.value = currentTime;

    avgWait.textContent = fcfsData.avgWaiting.toFixed(2);
    avgTurn.textContent = fcfsData.avgTurnaround.toFixed(2);
    curTime.textContent = currentTime;

    // Add success animation
    runBtn.style.transform = "scale(0.95)";
    setTimeout(() => {
      runBtn.style.transform = "scale(1)";
    }, 150);

    renderGantt(fcfsData.perUnit, fcfsData.segments, currentTime, processes);

    console.log("✅ FCFS build done", fcfsData);
  });

  // ✅ Play animation
  playBtn.addEventListener("click", () => {
    if (!fcfsData) {
      alert("Please build the schedule first!");
      return;
    }
    if (isPlaying) return;
    isPlaying = true;

    const speed = parseFloat(speedSlider.value);
    const delay = 1000 / speed; // ms per time unit

    animTimer = setInterval(() => {
      if (currentTime >= fcfsData.timeSpan.max) {
        clearInterval(animTimer);
        isPlaying = false;
        return;
      }
      currentTime++;
      timeline.value = currentTime;
      curTime.textContent = currentTime;
      renderGantt(fcfsData.perUnit, fcfsData.segments, currentTime, fcfsData.results);
    }, delay);
  });

  // ✅ Pause animation
  pauseBtn.addEventListener("click", () => {
    if (animTimer) {
      clearInterval(animTimer);
      isPlaying = false;
      console.log("⏸ Animation paused at t =", currentTime);
    }
  });

  // ✅ Step forward
  stepFwdBtn.addEventListener("click", () => {
    if (!fcfsData) {
      alert("Please build the schedule first!");
      return;
    }
    if (isPlaying) {
      pauseBtn.click();
    }
    if (currentTime < fcfsData.timeSpan.max) {
      currentTime++;
      timeline.value = currentTime;
      curTime.textContent = currentTime;
      renderGantt(fcfsData.perUnit, fcfsData.segments, currentTime, fcfsData.results);
    }
  });

  // ✅ Step backward
  stepBackBtn.addEventListener("click", () => {
    if (!fcfsData) {
      alert("Please build the schedule first!");
      return;
    }
    if (isPlaying) {
      pauseBtn.click();
    }
    if (currentTime > fcfsData.timeSpan.min) {
      currentTime--;
      timeline.value = currentTime;
      curTime.textContent = currentTime;
      renderGantt(fcfsData.perUnit, fcfsData.segments, currentTime, fcfsData.results);
    }
  });

  // ✅ Timeline manual control
  timeline.addEventListener("input", () => {
    if (!fcfsData) return;
    currentTime = Number(timeline.value);
    curTime.textContent = currentTime;
    renderGantt(fcfsData.perUnit, fcfsData.segments, currentTime, fcfsData.results);
  });

  // ✅ Reset button
  resetBtn.addEventListener("click", () => {
    tableBody.innerHTML = "";
    numProcessesInput.value = "";
    curTime.textContent = "0";
    avgWait.textContent = "-";
    avgTurn.textContent = "-";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    clearInterval(animTimer);
    fcfsData = null;
    currentTime = 0;
    isPlaying = false;

    resetBtn.textContent = "✅ Reset!";
    resetBtn.disabled = true;
    setTimeout(() => {
      resetBtn.textContent = "🔄 Reset";
      resetBtn.disabled = false;
    }, 800);

    console.log("✅ Reset complete");
  });
});
