/* ============================================================================
   constants.js
   Traduction directe de physical_constants.py — mêmes noms de variables,
   mêmes valeurs. À inclure via <script src="constants.js"></script> avant
   le chargement de Pyodide dans chaque page de simulation.
   ============================================================================ */

const PHYSICAL_CONSTANTS = {
  // Constantes fondamentales
  G_newton: 6.67e-11,        // N m**2/kg**2, constante de la gravitation universelle
  e0: 8.854182e-12,          // F/m, permittivité diélectrique du vide
  mu0: 4 * Math.PI * 1e-7,   // N/A**2, perméabilité magnétique du vide
  c_vide: 299792458,         // m/s, vitesse de la lumière dans le vide
  r_bohr: 5.291772e-11,      // m, rayon de Bohr

  k_b: 1.380649e-23,         // J/K, constante de Boltzmann
  N_Avo: 6.02214076e23,      // 1/mol, constante d'Avogadro
  R_gp: 8.31,                // J/(K mol), constante des gaz parfaits
  atm: 101325,               // Pa, atmosphère standard

  h_planck: 6.62607015e-34,             // J/s, constante de Planck (non réduite)
  h_bar: 6.62607015e-34 / (2 * Math.PI), // J/s, constante de Planck réduite

  sigma_sb: 5.67e-8,         // W / (m**2 T**4), constante de Stefan-Boltzmann
  l_wien: 2.897771955e-3,    // m/K, constante de Wien (loi de déplacement)

  // Valeurs standards
  g_terre: 9.81,             // m/s**2, accélération de la pesanteur terrestre
  p_std: 101325,             // Pa, atmosphère standard

  // Particules élémentaires
  q_elem: 1.602e-19,         // C, charge élémentaire
  m_e: 9.109e-31,            // kg, masse de l'électron
  m_p: 1.673e-27,            // kg, masse du proton
  m_n: 1.674e-27,            // kg, masse du neutron
  umau: 1.661e-27,           // kg, unité de masse atomique unifiée

  // Système solaire
  MSoleil: 1.988e30,         // kg, masse du Soleil
  MTerre: 5.972e24,          // kg, masse de la Terre
  MLune: 7.342e22,           // kg, masse de la Lune

  RTerre: 6378.1 * 1000,     // m, rayon équatorial de la Terre
  RSoleil: 696342 * 1000,    // m, rayon équatorial du Soleil
  RLune: 1737.4 * 1000,      // m, rayon équatorial de la Lune

  name_p: ["Mercure", "Vénus", "Terre", "Mars", "Jupiter", "Saturne", "Uranus", "Neptune", "Pluton"],
  Rp_obs: [58, 108, 150, 228, 778, 1426, 2870, 4498, 5906].map(v => v * 1e6), // m, rayon moyen de l'orbite
  Tp_obs: [88, 224.7, 365.25, 687, 4331, 10747, 30589, 59800, 90553],          // jours, période de révolution

  // Conversion degré-radian
  DEG: Math.PI / 180,        // alpha = 60 * DEG -> conversion degrés vers radians
  RAD: 180 / Math.PI,
};

// planets: dict {nom: [rayon orbital, période]}, reconstruit comme en Python
PHYSICAL_CONSTANTS.planets = Object.fromEntries(
  PHYSICAL_CONSTANTS.name_p.map((name, i) => [name, [PHYSICAL_CONSTANTS.Rp_obs[i], PHYSICAL_CONSTANTS.Tp_obs[i]]])
);

/* Génère le code Python d'affectation des constantes (une ligne par variable). */
function physicalConstantsPythonSource() {
  return Object.entries(PHYSICAL_CONSTANTS)
    .map(([key, value]) => `${key} = ${JSON.stringify(value)}`)
    .join('\n');
}

/* Injecte toutes les constantes dans l'espace de noms Python de Pyodide.
   À appeler une fois, juste après le chargement des paquets scientifiques
   et avant d'exécuter le code de simulation. */
async function loadPhysicalConstants(pyodide) {
  await pyodide.runPythonAsync(physicalConstantsPythonSource());
}
