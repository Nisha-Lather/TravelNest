const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
// const ExpressError=require("../utils/ExpressError.js");
// const {listingSchema,reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const {isLoggedIn}=require("../middleware.js");
const {isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

// reconfigure home route
router.
route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    validateListing,
    upload.single('listing[image]'),
    wrapAsync(listingController.createListing));


// New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);


// reconfigure router for /:id 
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync (listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync (listingController.destroyListing));


// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

router.get("/:id/book", (req, res) => {
    const { id } = req.params;
    req.flash("success", "Booked successfully!");
    res.redirect(`/listings/${id}`);
});
module.exports=router;