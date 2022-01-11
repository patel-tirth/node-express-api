const addNewPosts = (oldPosts, newPosts) => {
    let uniquePosts = newPosts.filter(p1 => !oldPosts.some(p2 => p1.id == p2.id));
    // let uniquePosts = newPosts.filter(x => !oldPosts.includes(x.authorId));
    for(let i = 0 ; i < uniquePosts.length; i++){
        oldPosts.push(uniquePosts[i]);
    }

    return oldPosts;
  }

module.exports = addNewPosts