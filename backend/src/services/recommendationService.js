function hasContact(user) {
  const email = String(user["Email"] || user["email"] || "").trim();
  const phone = String(user["Phone"] || user["phone"] || "").trim();
  return (email && email !== "nan") || (phone && phone !== "nan");
}

function parseNumber(v) {
  if (v === undefined || v === null || v === "") return NaN;
  const n = Number(String(v).toString().replace(/[^0-9.\-]/g, ""));
  return Number.isFinite(n) ? n : NaN;
}

function suggestBestPlan(user) {
  const plan = user["Plan"] || user["plan_type"] || "Unknown";
  const spend = parseNumber(user["Monthly Spend"] || user["monthly_spend"]);
  const lastActivity = parseNumber(user["Last Activity Days"] || user["last_activity_days"]);

  const status = String(user["Status"] || "").toLowerCase();

  if (status === "inactive") {
    return { action: "reactivate", note: "User inactive — target with reactivation offer before suggesting plan changes." };
  }

  if (!Number.isNaN(spend)) {
    if (spend >= 500) {
      if (!Number.isNaN(lastActivity) && lastActivity > 60) {
        return { action: "downgrade", note: `High spend (${spend}) but low activity (${lastActivity} days) consider cheaper plan or limited-features plan.` };
      }
      return { action: "maintain", note: `High spend (${spend}) keep on current plan or offer loyalty perks.` };
    }
    if (spend < 100) {
      if (!Number.isNaN(lastActivity) && lastActivity < 15) {
        return { action: "upgrade", note: `Low spend (${spend}) and active recently propose premium trial or add-on bundle.` };
      }
      return { action: "no_change", note: `Low spend (${spend}) no immediate change; consider targeted upsell.` };
    }
  }

  return { action: "monitor", note: `Plan: ${plan} monitor usage and engage if activity drops.` };
}

function discountOffer(user) {
  const status = String(user["Status"] || "").toLowerCase();
  if (status === "inactive") {
    return {
      type: "reactivation",
      message: "Offer reactivation coupon: 50% off for 1 month OR free 14-day trial + a short onboarding call."
    };
  }
  return {
    type: "loyalty",
    message: "Loyalty offer: 10% off next invoice after 6 months of continuous subscription; targeted 7-day trial for premium features."
  };
}

function renewalGuidance(user) {
  const renewalDate = user["Renewal Date"] || user["renewal_date"] || "";
  if (renewalDate) {
    return {
      message: `Renewal date on ${renewalDate}. Recommend sending reminder emails at 7 days and 1 day before renewal, and include direct cancellation link.`
    };
  }
  return {
    message: "No renewal date recorded — recommend prompting user to confirm renewal date and offer easy cancellation link in account page."
  };
}

function personalizedUpsell(user) {
  const plan = (user["Plan"] || user["plan_type"] || "").toLowerCase();
  const spend = parseNumber(user["Monthly Spend"] || user["monthly_spend"]);

  if (plan.includes("basic") || (Number.isNaN(spend) ? false : spend < 100)) {
    return { suggestion: "7-day premium trial + bundle discount (save 20%)", rationale: "User on entry plan or low spend — upsell low-friction trial." };
  }
  return { suggestion: "Add-on: Premium Support at 30% off for first 3 months", rationale: "User on mid/high plan — cross-sell support bundle." };
}

function buildRecommendation(user) {
  const rec = {};

  rec.userId = user["User Id"] || user["UserId"] || user["id"] || "";
  rec.name = user["Name"] || user["name"] || "";
  rec.status = user["Status"] || "";

  rec.contactAvailable = hasContact(user);

  rec.bestPlan = suggestBestPlan(user);
  rec.discount = discountOffer(user);
  rec.renewal = renewalGuidance(user);
  rec.upsell = personalizedUpsell(user);

  // NEW FEATURE: Alerts
  rec.alerts = [];

  // Usage alerts (quota check)
  const usage = parseNumber(user["Usage"] || user["usage"]);
  const quota = parseNumber(user["Quota"] || user["quota"]);
  if (!Number.isNaN(usage) && !Number.isNaN(quota)) {
    const usagePct = (usage / quota) * 100;
    if (usagePct >= 85 && usagePct < 100) {
      rec.alerts.push({ type: "usage-nearing", message: `You've used ${usagePct.toFixed(0)}% of your quota (${usage}/${quota}). Consider upgrading.` });
    }
    if (usagePct >= 100) {
      rec.alerts.push({ type: "quota-exceeded", message: `Quota exceeded! (${usage}/${quota}). Immediate upgrade recommended.` });
    }
  }

  // Inactivity alerts
  const lastActivity = parseNumber(user["Last Activity Days"] || user["last_activity_days"]);
  if (!Number.isNaN(lastActivity) && lastActivity > 30) {
    rec.alerts.push({ type: "inactivity", message: `User inactive for ${lastActivity} days — send reminder.` });
  }

  rec.quickActions = [];
  if (rec.status && String(rec.status).toLowerCase() === "inactive") {
    rec.quickActions.push("Send reactivation email with coupon");
  } else {
    if (!rec.contactAvailable) rec.quickActions.push("Ask user to provide email/phone");
    rec.quickActions.push("Send personalized upsell trial");
    rec.quickActions.push("Schedule renewal reminder");
  }

  return rec;
}

function getAllRecommendations() {
  const users = loadData();
  return users.map(u => buildRecommendation(u));
}

function getRecommendationById(id) {
  const users = loadData();
  const found = users.find(u => String(u["User Id"]) === String(id) || String(u["UserId"]) === String(id) || String(u["id"]) === String(id));
  if (!found) return null;
  return buildRecommendation(found);
}

module.exports = { getAllRecommendations, getRecommendationById };
