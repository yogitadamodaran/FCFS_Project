// js/ui.js
export function setupProcessInput() {
  const numInput = document.getElementById('numProcesses');
  const tbody = document.querySelector('#processTable tbody');
  const genBtn = document.getElementById('generateTable');
  const resetBtn = document.getElementById('resetBtn');

  function makeRow(i, arrival= i-1, burst=2) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>P${i}</td>
      <td><input type="number" id="arrival${i}" min="0" value="${arrival}" /></td>
      <td><input type="number" id="burst${i}" min="1" value="${burst}" /></td>`;
    return tr;
  }

  function generate(n) {
    tbody.innerHTML = '';
    for (let i=1;i<=n;i++) tbody.appendChild(makeRow(i));
  }

  // initial generate
  generate(Number(numInput.value || 3));

  genBtn.addEventListener('click', ()=> {
    const n = Number(numInput.value) || 1;
    if (n < 1) return alert('At least 1 process');
    if (n > 10) return alert('Max 10 processes');
    generate(n);
  });

  resetBtn.addEventListener('click', ()=> {
    numInput.value = 3;
    generate(3);
  });

  // get processes from UI
  function readProcesses() {
    const n = Number(numInput.value) || 0;
    const arr = [];
    for (let i=1;i<=n;i++){
      const pid = `P${i}`;
      const arrivalEl = document.getElementById(`arrival${i}`);
      const burstEl = document.getElementById(`burst${i}`);
      const arrival = arrivalEl ? Number(arrivalEl.value) : 0;
      const burst = burstEl ? Number(burstEl.value) : 1;
      arr.push({ pid, arrival, burst });
    }
    return arr;
  }

  return { readProcesses };
}
