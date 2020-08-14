module.exports = {
    format_date: date => {
      const month = new Date(date).getMonth()
      const day = new Date(date).getDate()
      return `${month + 1}/${day}/${new Date(
        date).getFullYear()}`;
    },
    format_plural: (word, amount) => {
        if (amount !== 1) {
          return `${word}s`;
        }
    
        return word;
    },
  }