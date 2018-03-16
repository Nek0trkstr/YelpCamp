var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground')
var Comment = require('../models/comment')
var middleware = require('../middleware')
//Comments New
router.get('/new',middleware.isLoggedIn,function(req,res){
	var campId = req.params.id
	Campground.findById(campId, function(err,foundCampground){
		if (err){
			console.log(err);
		} else {
			res.render("comments/new",{campground: foundCampground})
		}
	})
});

//Comments Create
router.post('/', middleware.isLoggedIn,function(req,res){
	var campId = req.params.id
	var newComment = req.body.comment
	Campground.findById(campId, function(err,foundCampground){
		if (err){
			console.log(err);
		} else {
			Comment.create(newComment, function(err,comment){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					console.log(comment)
					foundCampground.comments.push(comment._id);
					foundCampground.save();
					res.redirect('/campgrounds/' + campId);
				}
			});
		}
	});
});

//Comment edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id, function(err,foundComment){
		if(err){
			res.redirect('back');
		} else {
			res.render('comments/edit', {campgroundId: req.params.id, comment: foundComment});
		}
	})
})

//Comment Update
router.put('/:comment_id',middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
		if (err){
			res.redirect('/campgrounds/' + req.params.id)
		} else {
			res.redirect('/campgrounds/' + req.params.id)
		}
	})
})

//Destroy Route
router.delete('/:comment_id',middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err){
			res.redirect('back')
		} else {
			res.redirect('/campgrounds/' + req.params.id)
		}
	})
})

module.exports = router;
