const CustomError = require('../utils/customError')

const compareFunc = {
    asc: (p1, p2) => p1 < p2,
    desc: (p1, p2) => p1 > p2,
};

const customSort = (p1,p2,func) => {
    if (p1 === p2) 
        return 0;
    if (func(p1, p2)) 
        return -1;
    return 1;
} 

const getSortBy = (sortBy,direction, posts) => {
    const validSorts = ['id', 'reads', 'likes', 'popularity'];
    if(sortBy == undefined)
        sortBy = 'id' // default sort by id
    else {
        const sortIdx = validSorts.indexOf(sortBy);
        if(sortIdx >= 0){
            sortBy = validSorts[sortIdx]
        } else {
            throw new CustomError("sortBy parameter is invalid", 400);
        }
    }
   
    // sort posts according to query parameters
    posts.sort((p1,p2) => customSort(p1[sortBy],p2[sortBy], compareFunc[direction]))
    
    return posts;
    // console.log(sortBy);
}

module.exports = getSortBy