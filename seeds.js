const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment")

var data = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/photo-1486082570281-d942af5c39b7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2d06322d7df8c19c1e648c8c3a101d2d&auto=format&fit=crop&w=1051&q=80",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor ipsum dolor, in elementum nulla viverra non. \
		Curabitur convallis lorem dolor. Nam odio enim, accumsan nec dignissim tincidunt, porta maximus dui. Donec commodo lacus eu dui auctor volutpat.\
		 Donec vitae quam eleifend, hendrerit tortor cursus, semper orci. Praesent in enim id augue pharetra mattis. Sed tempor placerat cursus.\
		 Fusce quis faucibus nisi. Etiam eleifend orci elit, a vestibulum sapien sollicitudin in. Integer placerat sapien nisl, non pulvinar mi bibendum quis.\
		  Aenean hendrerit felis quis massa venenatis blandit."
	},
	{
		name: "Desert Mesa",
		image: "https://images.unsplash.com/photo-1437382944886-45a9f73d4158?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3895efc1fd5d2fb67acdaee4b5d9c463&auto=format&fit=crop&w=1050&q=80",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor ipsum dolor, in elementum nulla viverra non. \
		Curabitur convallis lorem dolor. Nam odio enim, accumsan nec dignissim tincidunt, porta maximus dui. Donec commodo lacus eu dui auctor volutpat.\
		 Donec vitae quam eleifend, hendrerit tortor cursus, semper orci. Praesent in enim id augue pharetra mattis. Sed tempor placerat cursus.\
		 Fusce quis faucibus nisi. Etiam eleifend orci elit, a vestibulum sapien sollicitudin in. Integer placerat sapien nisl, non pulvinar mi bibendum quis.\
		  Aenean hendrerit felis quis massa venenatis blandit."
	},
	{
		name: "Canyon Floor",
		image: "https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b084690f83c5e63fafd161f8bc729a1f&auto=format&fit=crop&w=1050&q=80",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor ipsum dolor, in elementum nulla viverra non. \
		Curabitur convallis lorem dolor. Nam odio enim, accumsan nec dignissim tincidunt, porta maximus dui. Donec commodo lacus eu dui auctor volutpat.\
		 Donec vitae quam eleifend, hendrerit tortor cursus, semper orci. Praesent in enim id augue pharetra mattis. Sed tempor placerat cursus.\
		 Fusce quis faucibus nisi. Etiam eleifend orci elit, a vestibulum sapien sollicitudin in. Integer placerat sapien nisl, non pulvinar mi bibendum quis.\
		  Aenean hendrerit felis quis massa venenatis blandit."
	}
]

function seedDB(){
	//Remove all Campgrounds
	Campground.remove({},function(err){
		if (err){
			console.log(err)
		} else {
			console.log("Removed Campgrounds")	
		}
	});
	//Add a few campgrounds
	data.forEach(function(seed){
		Campground.create(seed,function(err,campground){
			if(err){
				console.log(err)
			} else {
				console.log("Campground seeded \n" + campground)
				//Create a comment
				Comment.create(
				{
					text: "This place is great but I wish there was internet",
					author: "Homer"
				} , function(err, newComment){
					if(err){
						console.log(err)
					} else {
						console.log("Comment seeded \n" + newComment)
						campground.comments.push(newComment._id);
						campground.save(function(err){
							if (err){
								console.log("Cannot update the campground: \n" + err)
							} else {
								console.log("Comment referenced sucessfully")
							}
						});
						
					}
				});
			}
		});
	});

}
module.exports = seedDB;