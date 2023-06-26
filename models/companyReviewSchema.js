const mongoose = require('mongoose');

const companyReviewSchema = mongoose.Schema({
  companyReviewSubject : {type : String , required : true},
  companyReview : {type : String , required : true},
  companyReviewRating : {type : String , required : true},
  isActive : {type : String , default : true }
})
companyReviewSchema.set("timestamps" , true);

module.exports = mongoose.model("review" , companyReviewSchema)