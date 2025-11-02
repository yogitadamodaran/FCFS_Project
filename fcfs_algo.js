// js/fcfs_algo.js
// computeFCFS returns:
// { segments: [{pid, start, end}, ...],
//   perUnit: [{time, pid|null}, ...],
//   results: [{pid, arrival, burst, start, completion, waiting, turnaround}, ...],
//   avgWaiting, avgTurnaround, timeSpan: {min, max} }

export function computeFCFS(processes) {
  // clone and sort
  const procs = processes.map(p => ({ pid: p.pid, arrival: Number(p.arrival), burst: Number(p.burst) }))
                         .sort((a,b) => a.arrival - b.arrival);

  let currentTime = 0;
  const segments = [];
  const results = [];

  // Determine start time baseline (allow time 0)
  if (procs.length === 0) {
    return { segments: [], perUnit: [], results: [], avgWaiting:0, avgTurnaround:0, timeSpan:{min:0,max:0} };
  }

  // simulate FCFS
  for (const p of procs) {
    if (currentTime < p.arrival) {
      // CPU idle until p.arrival
      currentTime = p.arrival;
    }
    const start = currentTime;
    const end = start + p.burst;
    segments.push({ pid: p.pid, start, end });
    results.push({
      pid: p.pid,
      arrival: p.arrival,
      burst: p.burst,
      start,
      completion: end,
      turnaround: end - p.arrival,
      waiting: (end - p.arrival) - p.burst
    });
    currentTime = end;
  }

  // Build perUnit timeline from t = minArrival (or 0) to last completion
  const minT = Math.min(...procs.map(p => p.arrival), 0);
  const maxT = Math.max(...segments.map(s => s.end), minT);
  const perUnit = [];
  for (let t = minT; t < maxT; t++) {
    // find segment that covers [t, t+1)
    const seg = segments.find(s => s.start <= t && t < s.end);
    perUnit.push({ time: t, pid: seg ? seg.pid : null });
  }

  // stats
  const avgWaiting = results.reduce((acc,r)=>acc+r.waiting,0) / results.length;
  const avgTurnaround = results.reduce((acc,r)=>acc+r.turnaround,0) / results.length;

  return {
    segments,
    perUnit,
    results,
    avgWaiting,
    avgTurnaround,
    timeSpan: { min: minT, max: maxT }
  };
}


