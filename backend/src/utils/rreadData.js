const xlsx = require("xlsx");
const path = require("path");

// Adjust path if your excel is elsewhere
const DATA_PATH = path.join(__dirname, "../../data/SubscriptionUseCase_Dataset.xlsx");

function loadData() {
  const wb = xlsx.readFile(DATA_PATH);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json(ws, { defval: "" }); // defval gives empty string for missing cells
  // Normalize keys: trim names
  return rows.map(r => {
    const norm = {};
    Object.keys(r).forEach(k => { norm[k.trim()] = r[k]; });
    return norm;
  });
}

module.exports = { loadData };
