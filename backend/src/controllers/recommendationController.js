
const recService = require("../services/recommendationService");

function getAll(req, res) {
  try {
    const data = recService.getAllRecommendations();
    res.json({ count: data.length, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load recommendations" });
  }
}

function getById(req, res) {
  try {
    const id = req.params.id;
    const rec = recService.getRecommendationById(id);
    if (!rec) return res.status(404).json({ error: "User not found" });
    res.json(rec);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load recommendation" });
  }
}

module.exports = { getAll, getById };
