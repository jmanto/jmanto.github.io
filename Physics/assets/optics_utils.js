/* ============================================================================
   optics_utils.js
   Portage JS de defs_optique.py : couleur d'une longueur d'onde, dispersion
   d'un verre, rapporteur d'angle, et rendu de graphes polaires.
   À inclure après wave_utils.js.
   ============================================================================ */

/* Reprise directe de wl2rgb() : longueur d'onde (nm) -> couleur RGB visible. */
function wl2rgb(wavelength) {
  const Gamma = 0.80, IntensityMax = 255;
  let red = 0, green = 0, blue = 0, factor = 0;

  if (wavelength >= 380 && wavelength < 440) { red = -(wavelength - 440) / (440 - 380); blue = 1.0; }
  else if (wavelength >= 440 && wavelength < 490) { green = (wavelength - 440) / (490 - 440); blue = 1.0; }
  else if (wavelength >= 490 && wavelength < 510) { green = 1.0; blue = -(wavelength - 510) / (510 - 490); }
  else if (wavelength >= 510 && wavelength < 580) { red = (wavelength - 510) / (580 - 510); green = 1.0; }
  else if (wavelength >= 580 && wavelength < 645) { red = 1.0; green = -(wavelength - 645) / (645 - 580); }
  else if (wavelength >= 645 && wavelength < 781) { red = 1.0; }

  if (wavelength >= 380 && wavelength < 420) factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
  else if (wavelength >= 420 && wavelength < 701) factor = 1.0;
  else if (wavelength >= 701 && wavelength < 781) factor = 0.3 + 0.7 * (780 - wavelength) / (780 - 700);

  const adjust = c => c === 0 ? 0 : Math.round(IntensityMax * Math.pow(c * factor, Gamma));
  return `rgb(${adjust(red)},${adjust(green)},${adjust(blue)})`;
}

/* Reprise de n_vs_wl() : indice de réfraction d'un verre selon Cauchy simplifié. */
function n_vs_wl(wl, nd, vd) {
  const lC = 656.3, lD = 589.3, lF = 486.1;
  const B = (nd - 1) / (vd * (1 / (lF * lF) - 1 / (lC * lC)));
  const A = nd - B / (lD * lD);
  return A + B / (wl * wl);
}

/* Reprise de dessine_rapporteur() : graduations d'angle (degrés) + arc. */
function drawProtractor(ctx, mapper, x, y, angleDepart, angleTot, color = '#ffffff') {
  const rayon = 1, lc = 0.1, ll = 0.2;
  ctx.save();
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1; ctx.font = '9px monospace';
  for (let n = 0; n <= angleTot; n++) {
    const angle = Math.PI * (n + angleDepart) / 180;
    const X = rayon * Math.cos(angle), Y = rayon * Math.sin(angle);
    let longueur = lc;
    if (n % 10 === 0) {
      longueur = ll;
      const [lpx, lpy] = mapper(x + 1.3 * X, y + 1.3 * Y);
      ctx.fillText(String(n), lpx, lpy);
    }
    const [p1x, p1y] = mapper(x + X, y + Y);
    const [p2x, p2y] = mapper(x + (1 + longueur) * X, y + (1 + longueur) * Y);
    ctx.beginPath(); ctx.moveTo(p1x, p1y); ctx.lineTo(p2x, p2y); ctx.stroke();
  }
  ctx.beginPath();
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const ang = angleDepart + angleTot * i / steps;
    const rad = Math.PI * ang / 180;
    const [px, py] = mapper(x + rayon * Math.cos(rad), y + rayon * Math.sin(rad));
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.restore();
}

/* Grille polaire (anneaux + rayons), r allant de rmin (centre) à rmax (bord). */
function drawPolarGrid(cx, cy, ctx, Rpx, ringCount = 4, spokeCount = 12, color = 'rgba(207,232,221,0.2)') {
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = 0.6;
  for (let i = 1; i <= ringCount; i++) {
    ctx.beginPath(); ctx.arc(cx, cy, (i / ringCount) * Rpx, 0, 2 * Math.PI); ctx.stroke();
  }
  for (let i = 0; i < spokeCount; i++) {
    const ang = 2 * Math.PI * i / spokeCount;
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Rpx * Math.cos(ang), cy + Rpx * Math.sin(ang)); ctx.stroke();
  }
  ctx.restore();
}

/* Série polaire : phi (rad) et r (physique), mappés linéairement sur [rmin, rmax] -> [0, Rpx]. */
function drawPolarSeries(cx, cy, ctx, Rpx, rmin, rmax, phi, r, options = {}) {
  const { color = '#5ee6b5', width = 1.8, close = true } = options;
  ctx.save();
  ctx.strokeStyle = color; ctx.lineWidth = width;
  ctx.beginPath();
  for (let i = 0; i < phi.length; i++) {
    const frac = Math.min(1, Math.max(0, (r[i] - rmin) / (rmax - rmin)));
    const px = cx + frac * Rpx * Math.cos(phi[i]);
    const py = cy - frac * Rpx * Math.sin(phi[i]);
    if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
  }
  if (close) ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
