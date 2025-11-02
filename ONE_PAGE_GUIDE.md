# One-Page Execution Guide — FCFS Visualizer

## Setup
1. Put all files in one folder preserving the `js/` subfolder.
2. Open `index.html` in any modern browser (Chrome 80+, Firefox, Edge, Safari). No server needed.

## UI Guide
- **Processes**: Add rows with ID, Arrival (>=0), Burst (>0).
- **Build Trace**: Compute the execution trace (FCFS).
- **Play / Pause**: Animate the Gantt chart step-by-step.
- **Step ◀/▶**: Move one trace step backward or forward.
- **Timeline**: Jump to any step.
- **Animation Speed**: Adjust slider for faster/slow playback.
- **Export Screenshot**: Opens canvas image in new tab.
- **Export Trace**: Downloads JSON containing trace + stats.

## Visualization Elements
- **Gantt Chart**: Colored unit blocks (one block per run step).
- **Marker**: Vertical marker shows current time.
- **Legend**: Each process color + burst label.
- **Trace Actions**: `start`, `run`, `complete`, `idle`.

## Statistics
- Average waiting time and turnaround time computed from the trace and shown on the left panel.

## Browser Requirements
- Modern browser supporting HTML5 Canvas and ES6 JavaScript.
- Recommended: Chrome or Firefox. Live Server in VS Code optional.
