const { Post, User, Comment } = require('../models/');

module.exports = {
  format_date: date => {
    return `${new Date(date).getUTCMonth() + 1}/${new Date(date).getUTCDate()}/${new Date(date).getUTCFullYear()}`;
},
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
  validate_user: (userLoggedId, commentOwnerId) => {
    if(userLoggedId === commentOwnerId){
      return true
    } else if (userLoggedId!== commentOwnerId){
      return false
    } 
  },
}
