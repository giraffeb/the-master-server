
const errorHandler = (err, req, res, next) => {
  if(err){
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  errorHandler
}