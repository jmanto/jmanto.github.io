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

/* Étiquettes d'axes simples (texte, pas de graduation). */
function drawAxisLabels(ctx, W, H, xLabel, yLabel) {
  ctx.save();
  ctx.fillStyle = '#6f8f8a';
  ctx.font = '10px monospace';
  if (xLabel) ctx.fillText(xLabel, W - ctx.measureText(xLabel).width - 8, H - 6);
  if (yLabel) { ctx.save(); ctx.translate(8, 14); ctx.fillText(yLabel, 0, 0); ctx.restore(); }
  ctx.restore();
}
