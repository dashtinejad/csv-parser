/**
 * CSV Parser.  Takes a string as input and returns
 * an array of arrays (for each row).
 * 
 * @param input String, CSV input
 * @param separator String, single character used to separate fields.
 *        Defaults to ","
 * @param quote String, single character used to quote non-simple fields.
 *        Defaults to "\"".
 */
export default function parseCSV(input, separator, quote) {
  const NEWLINE = '\n'
  const SEPARATOR = separator || ','
  const QUOTE = quote || '"'
  const NEWROW = 'NEWROW'
  const NEWCOL = 'NEWCOL'
  
  // the final return array which contains arrays (for each row)
  let result = []
  
  // we'll create an object for each character
  // which store its behavior
  let characters = []

  for (let i = -1; i < input.length; i++) {
    if (i == -1) {
      characters.push({ type: NEWROW })
      characters.push({ type: NEWCOL })
      continue
    }

    let char = input[i]

    if (char == SEPARATOR) {
      characters.push({ type: NEWCOL })
    }

    else if (char == NEWLINE) {
      characters.push({ type: NEWROW })
      characters.push({ type: NEWCOL })
    }

    else {
      characters.push({
        type: 'character',
        key: char
      })
    }
  }


  // loop through characters
  for (let i = 0; i < characters.length; i++) {
    let char = characters[i]

    if (char.type == NEWROW) {
      result.push([])
    }

    else if (char.type == NEWCOL) {
      result[ result.length - 1 ].push('')
    }

    else {
      // all rows
      result
        // last row
        [ result.length - 1 ]
        // last column
        [ result[ result.length - 1 ].length - 1 ] += char.key
    }
  }

  // console.log(characters)
  
  return result
}