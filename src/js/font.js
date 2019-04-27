const LEFT = 1
const RIGHT = -1

// line takes a message, alignment and position and returns an array
// of objects of chars representing that message.
function line({ message, align = LEFT, position}) {
  const leftX = align == LEFT ? position.x : position.x - message.length * charSize
  return message.toUpperCase().split('').map(
    (char, index) => (
      {
        type: 'char_' + char,
        x: leftX + index * charSize,
        y: position.y,
        w: 5,
        h: 5
      }
    )
  )
}

// fit tries to fit the words of the message into a space restricted by width (in pixels).
function fit({ message, position, width}) {
  const widthInChars = Math.max(1, Math.floor(width / 6))
  const words = []

  // Cut words too long beforehand.
  message.split(' ').forEach(
    (rawWord) => {
      while(rawWord.length > widthInChars) {
        words.push(rawWord.substr(0, widthInChars))
        rawWord = rawWord.substr(widthInChars)
      }
      words.push(rawWord)
    }
  )

  const chars = []
  var currentLine = 0
  var currentChar = 0
  words.forEach(
    (word) => {
      if (word.length + currentChar > widthInChars) {
        currentLine++;
        currentChar = 0
      }
      line(
        {
          message: word,
          position: {
            x: position.x + currentChar * charSize,
            y: position.y + currentLine * charSize
          }
        }
      ).forEach((char) => chars.push(char))
      currentChar = currentChar + word.length + 1
    }
  )
  return chars
}

// charSize is the place a character needs. The actual graphics are 5x5 pixel.
const charSize = 6

export {
  LEFT,
  RIGHT,
  fit,
  line,
}
