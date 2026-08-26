/* ============================================================================
   wave_utils.js
   Utilitaires de tracé partagés par les simulations d'ondes (courbes 1D :
   amplitude en fonction de la position ou du temps). À inclure après
   constants.js et avant le script de chaque simulation.
   ============================================================================ */

const waveColor = name => getComputedStyle(document.documentElement).getPropertyValue(name);

/* Mappage repère physique -> pixels. equalAspect=true conserve le rapport x/y
   (utile pour des schémas géométriques) ; false étire indépendamment
   (le cas normal pour un graphe amplitude vs position/temps). */
function makeMapper(xmin, xmax, ymin, ymax, W, H, equalAspect = false) {
  const scaleX = W / (xmax - xmin), scaleY = H / (ymax - ymin);
  const sx = equalAspect ? Math.min(scaleX, scaleY) : scaleX;
  const sy = equalAspect ? Math.min(scaleX, scaleY) : scaleY;
  const marginX = (W - (xmax - xmin) * sx) / 2;
  const marginY = (H - (ymax - ymin) * sy) / 2;
  return (x, y) => [ (x - xmin) * sx + marginX, H - ((y - ymin) * sy + marginY) ];
}

/* Efface un canvas et retourne son contexte 2D + dimensions. */
function clearCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return ctx;
}

/* Trace une ligne pointillée horizontale y = yVal (référence zéro, etc.). */
function drawHLine(ctx, mapper, xmin, xmax, yVal, color = 'rgba(207,232,221,0.3)', dash = [3, 3]) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.setLineDash(dash);
  const [x1, y1] = mapper(xmin, yVal), [x2, y2] = mapper(xmax, yVal);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();
}

/* Trace une ligne verticale x = xVal. */
function drawVLine(ctx, mapper, ymin, ymax, xVal, color = 'rgba(207,232,221,0.3)', dash = [3, 3]) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.setLineDash(dash);
  const [x1, y1] = mapper(xVal, ymin), [x2, y2] = mapper(xVal, ymax);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  ctx.restore();
}

/* Trace une série (xs, ys) sur le canvas via le mapper fourni.
   options: { color, width, dash } */
function drawSeries(ctx, mapper, xs, ys, options = {}) {
  const { color = '#5ee6b5', width = 1.6, dash = [] } = options;
  if (!xs.length) return;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.setLineDash(dash);
  ctx.beginPath();
  for (let i = 0; i < xs.length; i++) {
    const [px, py] = mapper(xs[i], ys[i]);
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();
}

/* Trace un "stem plot" (bâtons + points), pour des spectres discrets. */
function drawStem(ctx, mapper, xs, ys, options = {}) {
  const { color = '#5ee6b5', dotColor = '#5ee6b5', width = 1.4, dotRadius = 3 } = options;
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = dotColor;
  ctx.lineWidth = width;
  for (let i = 0; i < xs.length; i++) {
    const [px, pyTop] = mapper(xs[i], ys[i]);
    const [, pyBase] = mapper(xs[i], 0);
    ctx.beginPath(); ctx.moveTo(px, pyBase); ctx.lineTo(px, pyTop); ctx.stroke();
    ctx.beginPath(); ctx.arc(px, pyTop, dotRadius, 0, 2 * Math.PI); ctx.fill();
  }
  ctx.restore();
}

/* Petite légende colorée en haut à droite d'un canvas.
   entries: [{label, color}, ...] */
function drawLegend(ctx, W, entries, options = {}) {
  const { x = W - 120, yStart = 12, lineHeight = 16, font = '11px monospace' } = options;
  ctx.save();
  ctx.font = font;
  let y = yStart;
  entries.forEach(e => {
    ctx.fillStyle = e.color;
    ctx.fillRect(x, y - 8, 10, 10);
    ctx.fillStyle = '#cfe8dd';
    ctx.fillText(e.label, x + 16, y + 1);
    y += lineHeight;
  });
  ctx.restore();
}

/* Chemin en zigzag représentant un ressort entre deux points physiques.
   Reprise de la fonction spring() utilisée dans plusieurs scripts PyQt6. */
function springPath(start, end, nodes, width) {
  nodes = Math.max(nodes, 1);
  const [x1, y1] = start, [x2, y2] = end;
  if (x1 === x2 && y1 === y2) return [[x1], [y1]];
  const dx = x2 - x1, dy = y2 - y1;
  const length = Math.hypot(dx, dy);
  const ux = dx / length, uy = dy / length;
  const nx = -uy, ny = ux;
  const normalDist = Math.sqrt(Math.max(0, width * width - (length * length) / (nodes * nodes))) / 2;
  const xs = [x1], ys = [y1];
  for (let i = 1; i <= nodes; i++) {
    const frac = (length * (2 * i - 1)) / (2 * nodes);
    const sign = (i % 2 === 0) ? 1 : -1;
    xs.push(x1 + frac * ux + sign * normalDist * nx);
    ys.push(y1 + frac * uy + sign * normalDist * ny);
  }
  xs.push(x2); ys.push(y2);
  return [xs, ys];
}

/* Trace un ressort (via springPath) sur un canvas déjà mappé. */
function drawSpring(ctx, mapper, start, end, nodes, width, options = {}) {
  const { color = '#cfe8dd', lineWidth = 1.3 } = options;
  const [sx, sy] = springPath(start, end, nodes, width);
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = lineWidth;
  ctx.beginPath();
  for (let i = 0; i < sx.length; i++) {
    const [px, py] = mapper(sx[i], sy[i]);
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();
}

/* Rectangle plein (repère physique) — équivalent de matplotlib.patches.Rectangle. */
function drawRect(ctx, mapper, xLeft, yBottom, width, height, color, alpha = 1) {
  const [px1, py1] = mapper(xLeft, yBottom + height);
  const [px2, py2] = mapper(xLeft + width, yBottom);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.fillRect(px1, py1, px2 - px1, py2 - py1);
  ctx.restore();
}

/* Étiquettes d'axes simples (texte, pas de graduation). */
function drawAxisLabels(ctx, W, H, xLabel, yLabel) {
  ctx.save();
  ctx.fillStyle = '#6f8f8a';
  ctx.font = '10px monospace';
  if (xLabel) ctx.fillText(xLabel, W - ctx.measureText(xLabel).width - 8, H - 6);
  if (yLabel) { ctx.save(); ctx.translate(8, 14); ctx.fillText(yLabel, 0, 0); ctx.restore(); }
  ctx.restore();
}

/* Flèche simple (ligne + tête triangulaire), équivalent léger de FancyArrowPatch. */
function drawArrow(ctx, mapper, x1, y1, x2, y2, options = {}) {
  const { color = '#5ee6b5', width = 2, headLength = 9, headWidth = 6 } = options;
  const [px1, py1] = mapper(x1, y1), [px2, py2] = mapper(x2, y2);
  const angle = Math.atan2(py2 - py1, px2 - px1);
  ctx.save();
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width;
  ctx.beginPath(); ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(px2, py2);
  ctx.lineTo(px2 - headLength * Math.cos(angle - Math.PI / 7), py2 - headLength * Math.sin(angle - Math.PI / 7));
  ctx.lineTo(px2 - headLength * Math.cos(angle + Math.PI / 7), py2 - headLength * Math.sin(angle + Math.PI / 7));
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

/* Disque plein (repère physique), pour représenter une masse/mobile ponctuel. */
function drawDisk(ctx, mapper, x, y, radiusPhysical, color, alpha = 1) {
  const [px, py] = mapper(x, y);
  const [rpx] = mapper(x + radiusPhysical, y);
  const r = Math.abs(rpx - px);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath(); ctx.arc(px, py, r, 0, 2 * Math.PI); ctx.fill();
  ctx.restore();
}

/* Flèche d'axe (ligne + tête), pour représenter un axe x ou y dans un schéma "axis off". */
function drawAxisArrow(ctx, mapper, xmin, xmax, y, label, color = '#ffffff') {
  drawArrow(ctx, mapper, xmin, y, xmax, y, { color, width: 1, headLength: 10, headWidth: 6 });
  if (label) {
    const [px, py] = mapper(xmax, y);
    ctx.save(); ctx.fillStyle = color; ctx.font = '13px Georgia, serif';
    ctx.fillText(label, px + 6, py + 4);
    ctx.restore();
  }
}
