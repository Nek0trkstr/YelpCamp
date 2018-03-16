var express = require('express');
var router = express.Router();
var Campground = require('../models/campground')
var middleware = require('../middleware')
//Get Campgrounds
router.get('/',function(req,res){
	console.log(req.user)
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else {
			res.render('campgrounds/index',{campgrounds:allCampgrounds});
		}
	});	
});

//Create Campground
router.post('/',middleware.isLoggedIn,function(req,res){
	var name = req.body.name
	var image = req.body.image
	var description = req.body.description
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: description, author: author}
	Campground.create(newCampground,function(err,newlyCreated){
		if (err){
			console.log(err)
		} else{
			console.log(newlyCreated)
			res.redirect('/campgrounds')
		}
	})
});

//Campground New
router.get('/new',middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new")
});

//Get Campground
router.get('/:id',function(req,res){
	var campId = req.params.id
	Campground.findById(campId).populate("comments").exec(function(err,campground){
		if (err){
			console.log(err)
		} else {
			res.render('campgrounds/show',{campground: campground})
		}
	})
});

//Edit Campground
router.get('/:id/edit',middleware.checkCampgroundOwnership, function(req,res){
	Campground.findById(req.params.id, function(err,foundCampground){
		res.render('campgrounds/edit',{campground: foundCampground});	
	});
});

//Update Route
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	})
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id',middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds');
		}
	})
})

module.exports = router;
