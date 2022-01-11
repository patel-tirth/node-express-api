
const express = require('express');
const axios = require('axios');
const catchError = require('../utils/catchError');
const CustomError = require('../utils/customError')
const router = express.Router();
const baseURL = require('../utils/endpoint');
const addPosts = require('../utils/addNewPosts');
const sortResults = require('../utils/sortResults');
const getDirection = require('../utils/getDirection');
const cache = require('../utils/cache')
// ping
router.get('/ping', catchError(async (req, res, next)=>{
    res.status(200).json({success: true});
}))

// this can handle concurrent requests
router.get('/posts', cache(200), catchError(async (req, res, next)=>{
    if(!req.query.hasOwnProperty("tags")){
        throw new CustomError("Tags parameter is required", 400);
    }
    let posts = []
    const tags = getTags(req.query.tags);
    
    // console.log(tags)
    const requests = tags.map((tag) =>
        axios.get( baseURL+ "/blog/posts?tag=" + tag)
    );

    const result = await Promise.all(requests);

    // store new posts in posts
    result.map((item) => {
      posts = addPosts(posts, item.data.posts);
    });
    
    const direction = getDirection(req.query.direction);
    const sortedPosts = sortResults(req.query.sortBy, direction, posts);
    // console.log(posts.length)
    return res.send({ posts: sortedPosts });
    
}))

function getTags(tags) {
    const tokens = tags.split(",");
    for (let i = 0; i < tokens.length; i++) {
      tokens[i] = tokens[i].trim();
    }
    return tokens;
}

module.exports = router;



