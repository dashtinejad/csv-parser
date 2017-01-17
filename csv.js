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
  // which store its behavior, it's a map for our rendering
  // this array whill be something like this
  // input = "1,2,3"
  // [  { type: 'NEWROW' },
  //    { type: 'NEWCOL' },
  //    { key: '1' },
  //    { type: 'NEWCOL' },
  //    { key: '2' },
  //    { type: 'NEWCOL' },
  //    { key: '3' } ]
  let characters = []

  // this flag identify if we are in quoted string
  let inQuote = false

  // let's build our characters map
  for (let i = -1; i < input.length; i++) {
    // we start from -1
    // so if we faced with empty string
    // our renderer loop will always create at least one row with one column
    if (i == -1) {
      characters.push({ type: NEWROW })
      characters.push({ type: NEWCOL })
      continue
    }

    let char = input[i]

    // we have two situations: we are already in quote value or not
    // this block will handle characters if we are in quote
    // at the end of this block, there is a `continue` statement
    // so no need to put the rest of code inside `else` block
    if (inQuote) {
      if (char == QUOTE) {
        // if the quote is at the end of file
        // just ignore it
        if (typeof input[i + 1] == typeof undefined) {
          inQuote = false
          continue
        }

        // we already inside a quote
        // this character can behave in 2 ways for us:
        // -- nested quote "foo "baz" bar"
        // -- end quote "foo"
        // we should identify that
        // if the nest character is QUOTE also,
        // so we faced nested quotes ("foo ""bar"" baz")
        if (input[i + 1] == QUOTE) {
          // we should care of nested quotes
          // -- at the end ("foo ""baz""")
          // -- at the beginning ("""foo"" bar")
          // if the previous character is QUOTE also, we faced triple quotes """
          if (input [i - 1] == QUOTE) {
            // identify triple quotes at the beginning
            if (typeof input[i - 2] != typeof undefined) {
              continue
            }
          }

          characters.push({ key: QUOTE })
        }

        // the character could be the end quote
        // make the flag false
        else {
          if (input[i - 1] != QUOTE) {
            if (input[i + 1] == SEPARATOR || input[i + 1] == NEWLINE) {
              inQuote = false
            }
          }
          else {
            // maybe we faced empty quoted values (1,"",3)
            if (input[i - 2] == SEPARATOR && input[i + 1] == SEPARATOR) {
              inQuote = false
            }
            else {
              // maybe we faced with this situation
              // 1,"two ""quote""",3
              if (input[i - 2] == QUOTE && typeof input[i - 3] != typeof undefined) {
                inQuote = false
              }
            }
          }
        }
      }

      // other wise, every character inside the quoted
      // should be consider at normal character
      // especially SEPARATOR and NEWLINE characers
      else {
        characters.push({ key: char })
      }

      continue
    }

    // we are not faced with quoted values yet
    if (char == QUOTE) {
      inQuote = true
    }

    else if (char == SEPARATOR) {
      characters.push({ type: NEWCOL })
    }

    else if (char == NEWLINE) {
      characters.push({ type: NEWROW })
      characters.push({ type: NEWCOL })
    }

    else {
      characters.push({ key: char })
    }
  }

  // render the character map and build the result output
  for (let i = 0; i < characters.length; i++) {
    // get the current character from map
    let char = characters[i]

    // if character is new row, insert a new array into the result
    if (char.type == NEWROW) {
      result.push([])
    }

    // if character is new col, insert an empty string inside the last row
    else if (char.type == NEWCOL) {
      result[ result.length - 1 ].push('')
    }

    // otherwise we faced with normal characters
    // just insert them into the last row/col string
    else {
      // all rows
      result
        // last row
        [ result.length - 1 ]
        // last column
        [ result[ result.length - 1 ].length - 1 ] += char.key
    }
  }
  
  return result
}