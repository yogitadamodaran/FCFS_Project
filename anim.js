// js/anim.js
// Enhanced Gantt chart rendering with vibrant colors and effects

export function renderGantt(perUnit, segments, currentTime, processes) {
  const canvas = document.getElementById('ganttCanvas');
  const ctx = canvas.getContext('2d');

  // sizes
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0,0,W,H);

  // Pastel Pinterest background for chart
  const bgGradient = ctx.createLinearGradient(0, 0, W, H);
  bgGradient.addColorStop(0, '#fff5f0');
  bgGradient.addColorStop(0.3, '#f8f0ff');
  bgGradient.addColorStop(0.6, '#f0f5ff');
  bgGradient.addColorStop(1, '#f5fff8');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0,0,W,H);
  
  // Soft pastel grid pattern
  ctx.strokeStyle = 'rgba(212, 165, 184, 0.15)';
  ctx.lineWidth = 1;
  for (let i = 0; i < W; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, H);
    ctx.stroke();
  }
  for (let i = 0; i < H; i += 40) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(W, i);
    ctx.stroke();
  }

  // compute time bounds
  if (!perUnit || perUnit.length === 0) {
    // Pastel Pinterest empty state
    ctx.fillStyle = '#d4a5b8';
    ctx.font = '600 20px Playfair Display, serif';
    ctx.textAlign = 'center';
    ctx.fillText('Ready to Build Schedule', W / 2, H / 2 - 20);
    ctx.fillStyle = '#8b7a9a';
    ctx.font = '400 15px Nunito, sans-serif';
    ctx.fillText('Add processes and click "Build Schedule"', W / 2, H / 2 + 10);
    ctx.textAlign = 'left';
    return;
  }

  const tmin = perUnit[0].time;
  const tmax = perUnit[perUnit.length-1].time + 1;
  const span = Math.max(1, tmax - tmin);

  // layout
  const left = 50, right = 30, top = 40, chartW = W - left - right, barY = top + 10, barH = 60;
  const unitPx = chartW / span;

  // Pastel Pinterest axis baseline
  const axisGradient = ctx.createLinearGradient(left, 0, left + chartW, 0);
  axisGradient.addColorStop(0, 'rgba(255, 214, 232, 0.6)');
  axisGradient.addColorStop(0.5, 'rgba(232, 213, 255, 0.7)');
  axisGradient.addColorStop(1, 'rgba(212, 228, 255, 0.6)');
  ctx.strokeStyle = axisGradient;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(left, barY + barH + 6);
  ctx.lineTo(left + chartW, barY + barH + 6);
  ctx.stroke();

  // Draw past/future blocks: up to currentTime show filled segments, after that show faint background
  for (let i = 0; i < perUnit.length; i++) {
    const t = perUnit[i].time;
    const pid = perUnit[i].pid;
    const x = left + (t - tmin) * unitPx;
    const w = Math.max(2, unitPx);

    if (t < currentTime) {
      // Completed blocks with vibrant gradients
      if (pid) {
        const color = pidColor(pid);
        const gradient = ctx.createLinearGradient(x, barY, x, barY + barH);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, darken(color, 0.3));
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = 'rgba(212, 200, 195, 0.5)';
      }
      ctx.fillRect(x, barY, w, barH);
      
      // Soft pastel glow
      ctx.shadowBlur = 8;
      ctx.shadowColor = pid ? pidColor(pid) : 'rgba(212, 200, 195, 0.4)';
      ctx.fillRect(x, barY, w, barH);
      ctx.shadowBlur = 0;
      
      // Pastel label
      if (w > 18 && pid) {
        ctx.fillStyle = '#6b4a5f';
        ctx.font = '600 13px Nunito, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pid, x + w/2, barY + barH/2 + 4);
        ctx.textAlign = 'left';
      }
    } else if (t === currentTime) {
      // Currently executing: vibrant highlight with glow
      if (pid) {
        const color = pidColor(pid);
        const gradient = ctx.createLinearGradient(x, barY, x, barY + barH);
        gradient.addColorStop(0, brighten(color, 1.3));
        gradient.addColorStop(1, color);
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = 'rgba(212, 200, 195, 0.4)';
      }
      
      // Dreamy glow for current block
      ctx.shadowBlur = 15;
      ctx.shadowColor = pid ? pidColor(pid) : 'rgba(212, 165, 184, 0.5)';
      ctx.fillRect(x, barY, w, barH);
      ctx.shadowBlur = 0;
      
      ctx.fillRect(x, barY, w, barH);
      
      // Soft pastel border for current block
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 4]);
      ctx.strokeRect(x + 2, barY + 2, w - 4, barH - 4);
      ctx.setLineDash([]);
      
      // Pastel label for current block
      if (w > 18 && pid) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 14px Nunito, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.fillText(pid, x + w/2, barY + barH/2 + 4);
        ctx.shadowBlur = 0;
        ctx.textAlign = 'left';
      }
    } else {
      // Future blocks with pastel preview
      ctx.fillStyle = 'rgba(255, 214, 232, 0.2)';
      ctx.strokeStyle = 'rgba(232, 213, 255, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(x, barY, w, barH);
      ctx.setLineDash([]);
      ctx.fillRect(x, barY, w, barH);
    }

    // Pastel Pinterest time ticks
    if ((t - tmin) % Math.ceil(span / 12) === 0) {
      // Soft tick line
      ctx.strokeStyle = 'rgba(212, 165, 184, 0.6)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(x, barY + barH + 6);
      ctx.lineTo(x, barY + barH + 14);
      ctx.stroke();
      
      // Pastel time label
      ctx.fillStyle = '#8b7a9a';
      ctx.font = '600 13px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(t.toString(), x, barY + barH + 32);
      ctx.textAlign = 'left';
    }
  }

  // Pastel Pinterest current time marker
  const markerX = left + (currentTime - tmin) * unitPx;
  
  // Dreamy glow effect
  ctx.shadowBlur = 18;
  ctx.shadowColor = 'rgba(212, 165, 184, 0.5)';
  
  // Soft pastel marker line
  const markerGradient = ctx.createLinearGradient(markerX - 2, top - 6, markerX + 2, barY + barH + 8);
  markerGradient.addColorStop(0, 'rgba(255, 214, 232, 0.8)');
  markerGradient.addColorStop(0.5, '#ffffff');
  markerGradient.addColorStop(1, 'rgba(232, 213, 255, 0.8)');
  ctx.fillStyle = markerGradient;
  ctx.fillRect(markerX - 2.5, top - 6, 5, barH + 14);
  
  ctx.shadowBlur = 0;
  
  // Pastel time label with soft background
  ctx.fillStyle = 'rgba(255, 248, 245, 0.95)';
  ctx.fillRect(markerX + 12, top - 28, 70, 26);
  ctx.strokeStyle = 'rgba(212, 165, 184, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(markerX + 12, top - 28, 70, 26);
  ctx.fillStyle = '#8b7a9a';
  ctx.font = '700 14px Nunito, sans-serif';
  ctx.fillText(`t = ${currentTime}`, markerX + 47, top - 8);
  
  // Soft pastel pointer triangle
  ctx.beginPath();
  ctx.moveTo(markerX, top - 6);
  ctx.lineTo(markerX - 6, top - 12);
  ctx.lineTo(markerX + 6, top - 12);
  ctx.closePath();
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = 'rgba(212, 165, 184, 0.3)';
  ctx.lineWidth = 1;
  ctx.fill();
  ctx.stroke();

  // Enhanced legend with better styling
  let lx = left, ly = barY + barH + 50;
  processes.forEach((p, idx) => {
    const boxW = 16, gap = 10;
    
    // Color box with gradient
    const color = pidColor(p.pid);
    const boxGradient = ctx.createLinearGradient(lx, ly - boxW, lx + boxW, ly);
    boxGradient.addColorStop(0, color);
    boxGradient.addColorStop(1, darken(color, 0.2));
    ctx.fillStyle = boxGradient;
    ctx.fillRect(lx, ly - boxW, boxW, boxW);
    
    // Glow effect
    ctx.shadowBlur = 8;
    ctx.shadowColor = color;
    ctx.fillRect(lx, ly - boxW, boxW, boxW);
    ctx.shadowBlur = 0;
    
    // Soft pastel border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 2;
    ctx.strokeRect(lx, ly - boxW, boxW, boxW);
    
    // Pastel Pinterest label
    ctx.fillStyle = '#6b4a5f';
    ctx.font = '600 14px Nunito, sans-serif';
    ctx.fillText(`${p.pid}`, lx + boxW + gap, ly - 2);
    ctx.fillStyle = '#8b7a9a';
  ctx.font = '500 13px Nunito, sans-serif';
    ctx.fillText(`(b=${p.burst})`, lx + boxW + gap + 38, ly - 2);
    
    lx += 150;
    if (lx > W - 200) { lx = left; ly += 28; } // wrap legend
  });
}

// Pastel Pinterest color palette
const pastelColors = [
  'hsl(330, 75%, 80%)',  // Soft Pink
  'hsl(260, 70%, 85%)',  // Lavender
  'hsl(160, 60%, 80%)',  // Mint Green
  'hsl(25, 85%, 85%)',   // Peach
  'hsl(200, 70%, 85%)',  // Baby Blue
  'hsl(45, 80%, 85%)',   // Soft Yellow
  'hsl(10, 75%, 85%)',   // Coral
  'hsl(280, 65%, 85%)',  // Lilac
  'hsl(180, 60%, 80%)',  // Aqua
  'hsl(320, 70%, 82%)',  // Rose
];

// Deterministic color by pid string with pastel palette
function pidColor(pid) {
  let hash = 0;
  for (let i = 0; i < pid.length; i++) {
    hash = (hash * 31 + pid.charCodeAt(i)) % pastelColors.length;
  }
  return pastelColors[hash];
}

// Brighten HSL color
function brighten(hsl, factor = 1.3) {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (match) {
    const h = parseInt(match[1]);
    const s = parseInt(match[2]);
    const l = Math.min(90, Math.floor(parseInt(match[3]) * factor));
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  return hsl;
}

// Darken HSL color
function darken(hsl, factor = 0.7) {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (match) {
    const h = parseInt(match[1]);
    const s = parseInt(match[2]);
    const l = Math.max(10, Math.floor(parseInt(match[3]) * factor));
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  return hsl;
}
// js/anim.js

export function clearCanvas(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f8fbff"; // light blue background
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#004aad";
  ctx.font = "16px Arial";
  ctx.fillText("Gantt Chart cleared", 20, 40);
}
