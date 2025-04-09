const Donation = require("../models/donation");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isDonorOwner = async (req, res, next) => {
  const { id } = req.params;
  const donation = await Donation.findById(id);
  if (!donation.donor_id.equals(req.user._id)) {
    req.flash("error", "You are not allowed to edit this donation!");
    return res.redirect("/donations");
  }
  next();
};
