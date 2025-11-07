<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>FCFS Scheduling</title>
  <link rel="stylesheet" href="styles.css" />
</head>

<body>
  <div class="background-gradient"></div>
  <div class="floating-shapes">
    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>
  </div>
  
  <header>
    <div class="header-content">
      <h1 class="main-title">
        <span class="title-wrapper">
          <span class="title-icon">⚡</span>
          <span class="title-main-text">First Come First Serve</span>
          <span class="title-accent">(FCFS)</span>
        </span>
      </h1>
      <p class="subtitle">Learn with ease!</p>
    </div>
  </header>

  <main id="app">
    <section class="left">
      <div class="card card-glow">
        <div class="card-header">
          <span class="card-icon">📝</span>
          <h4>Process Input</h4>
        </div>
        <label class="input-label">
          <span>Number of Processes</span>
          <span class="label-hint">(1-20)</span>
        </label>
        <input id="numProcesses" type="number" min="1" max="20" value="3" class="styled-input" />
        <button id="generateTable" class="btn btn-pulse">✨ Generate Table</button>

        <table id="processTable">
          <thead>
            <tr><th>PID</th><th>Arrival</th><th>Burst</th></tr>
          </thead>
          <tbody></tbody>
        </table>

        <div class="row">
          <button id="runFCFS" class="btn primary btn-glow">🚀 Build Schedule</button>
          <button id="resetBtn" class="btn ghost">🔄 Reset</button>
        </div>
      </div>

      <div class="card card-glow">
        <div class="card-header">
          <span class="card-icon">🎮</span>
          <h4>Controls</h4>
        </div>
        <div class="row">
          <button id="playBtn" class="btn green btn-icon">▶️ Play</button>
          <button id="pauseBtn" class="btn orange btn-icon">⏸️ Pause</button>
          <button id="stepBack" class="btn btn-icon">◀️ Step</button>
          <button id="stepFwd" class="btn btn-icon">Step ▶️</button>
        </div>

        <label class="input-label">
          <span>⚡ Animation Speed</span>
          <span id="speedValue" class="speed-display">1.0x</span>
        </label>
        <input id="speed" type="range" min="0.25" max="3" step="0.25" value="1" class="speed-slider" />

        <div class="row">
          <button id="exportScreenshot" class="btn">Export Screenshot</button>
        </div>
      </div>
    </section>

    <section class="right">
      <div class="card card-glow chart-card">
        <div class="card-header">
          <span class="card-icon">📊</span>
          <h2>Gantt Chart</h2>
        </div>
        <div class="canvas-wrapper">
          <canvas id="ganttCanvas" width="1000" height="260"></canvas>
        </div>

        <div class="timeline-row">
          <input id="timeline" type="range" min="0" max="0" value="0" class="timeline-slider" />
          <div class="legend">
            <span class="legend-icon">🎯</span>
            Use timeline or step controls to navigate
          </div>
        </div>
      </div>

      <!-- 🧮 Statistics card moved here below the Gantt Chart -->
      <div class="card stats-card card-glow">
        <div class="card-header">
          <span class="card-icon">📈</span>
          <h3>Statistics</h3>
        </div>
        <table id="statsTable">
          <tr>
            <th>⏱️ Current Time</th>
            <td id="curTime" class="stat-value">0</td>
          </tr>
          <tr>
            <th>⏳ Average Waiting Time</th>
            <td id="avgWait" class="stat-value">-</td>
          </tr>
          <tr>
            <th>🔄 Average Turnaround Time</th>
            <td id="avgTurn" class="stat-value">-</td>
          </tr>
        </table>
      </div>
    </section>
  </main>

  <footer class="footer">
    <p class="footer-text">Made with 💕 by <span class="footer-name">Yogita Damodaran</span></p>
  </footer>

  <script type="module" src="js/main.js"></script>
</body>
</html>
