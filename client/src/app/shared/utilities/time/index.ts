//
// ─── CONST VAR ──────────────────────────────────────────────────────────────────
//
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
// ────────────────────────────────────────────────────────────────────────────────

export const calculateDayPassed = function (firstDate: Date, secondDate: Date) {
  return Math.round(Math.abs((+firstDate - +secondDate) / oneDay));
};
