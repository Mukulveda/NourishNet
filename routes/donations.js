const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");
const { isLoggedIn, isDonorOwner } = require("../middleware");

// View all donations (excluding current user's)
router.get("/", async (req, res) => {
  let query = {};
  if (req.user) {
    query = { donor_id: { $ne: req.user._id } };
  }
  const listings = await Donation.find(query)
    .populate("donor_id")
    .populate("receiver_id");
  res.render("donations", { listings });
});

// My Donations (only logged-in user's)
router.get("/my", isLoggedIn, async (req, res) => {
  const myDonations = await Donation.find({ donor_id: req.user._id })
    .populate("donor_id")
    .populate("receiver_id");
  res.render("donations/my", { listings: myDonations });
});

// Donation search
router.get("/search", async (req, res) => {
  const { query } = req.query;
  const regex = new RegExp(query, "i");

  try {
    let searchQuery = {
      $or: [{ food_name: regex }, { address: regex }],
    };

    if (req.user) {
      searchQuery.donor_id = { $ne: req.user._id };
    }

    const listings = await Donation.find(searchQuery)
      .populate("donor_id")
      .populate("receiver_id");

    res.render("donations", { listings });
  } catch (err) {
    console.error(err);
    req.flash("error", "Error during search.");
    res.redirect("/donations");
  }
});

// New donation form
router.get("/new", isLoggedIn, (req, res) => {
  res.render("new");
});

// Submit new donation
router.post("/", isLoggedIn, async (req, res) => {
  const newDono = new Donation({
    ...req.body,
    status: "available",
    donor_id: req.user._id,
  });

  await newDono.save();
  req.flash("success", "Donation posted!");
  res.redirect("/donations/my"); // ✅ Redirect to "My Donations"
});

// Accept donation
router.post("/:id/accept", isLoggedIn, async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  if (donation.status === "available") {
    donation.status = "accepted";
    donation.receiver_id = req.user._id;
    await donation.save();
  }
  res.redirect("/donations");
});

// Mark as collected (delete)
router.post("/:id/collected", isLoggedIn, async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  if (
    donation &&
    donation.donor_id.equals(req.user._id) &&
    donation.status === "accepted"
  ) {
    await Donation.findByIdAndDelete(req.params.id);
  }
  res.redirect("/donations");
});

// Edit form
router.get("/:id/edit", isLoggedIn, isDonorOwner, async (req, res) => {
  const donation = await Donation.findById(req.params.id);
  res.render("edit", { donation });
});

// Edit submit
router.put("/:id", isLoggedIn, isDonorOwner, async (req, res) => {
  const { id } = req.params;
  await Donation.findByIdAndUpdate(id, req.body);
  req.flash("success", "Donation updated!");
  res.redirect("/donations/my");
});

// DELETE donation
router.delete("/:id", isLoggedIn, isDonorOwner, async (req, res) => {
  const { id } = req.params;
  await Donation.findByIdAndDelete(id);
  req.flash("success", "Donation deleted successfully!");
  res.redirect("/donations/my");
});

module.exports = router;
