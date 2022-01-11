const CustomError = require('../utils/customError')

// function to get direction 
const  getDirection = (dir) => {
    const validDirections = ['asc','desc'];
    if(dir == undefined)
        return "asc";  // default direction is asc
    else{
        const dirIdx = validDirections.indexOf(dir);
        if(dirIdx >= 0 ){
            return validDirections[dirIdx];
        } else {
            throw new CustomError("sortBy parameter is invalid", 400);
        }
    }
}

module.exports = getDirection