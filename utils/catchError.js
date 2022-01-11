module.exports = checkError => {
    return (req,res,next) => {
        checkError(req,res,next).catch(next);
    }
}
// function to catch error