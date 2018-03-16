var Campground = require('../models/campground');
var Comment = require('../models/comment');
//All the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next) {
	if (req.isAuthenticated()){
		Campground.findById(req.params.id, function(err,foundCampground){
			if(err){
				res.redirect('/campgrounds')
			} else {
				if (foundCampground.author.id.equals(req.user._id)){ //author id is mongoose object so equals method is used
					next();	
				} else {
					res.redirect('back')
				}
				
			}
		});
	} else {
		res.redirect('back')
	}
}

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if (foundComment.author.id.equals(req.user._id)){
				next();
			} else {
				res.redirect('back')
			}
		})
	} else {
		res.redirect('/login')
	}
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login')
}

module.exports = middlewareObj