// define sample function to randomly return a item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

// define generate URL function
function generate_URL() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // create a collection to store character
  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''))
  collection = collection.concat(upperCaseLetters.split(''))
  collection = collection.concat(numbers.split(''))
  // console.log(collection)

  // start generate transer URL
  let transferURL = ''
  const transferURL_size = 5
  for (let i = 0; i < transferURL_size; i++) {
    transferURL += sample(collection)
  }
  // console.log(transferURL)
  return transferURL
}


// export generate URL function for other files to use
module.exports = generate_URL