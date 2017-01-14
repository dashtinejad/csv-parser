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
  separator = separator || ','
  quote = quote || '"'
  
  // the final return array which contains arrays (for each row)
  let result = [
    [ ]
  ]

  // this flag determines if we are on quoted string or not
  let inQuote = false

  // loop through each character of input
  let value = []
  let row = result[ result.length - 1 ]

  for (let i = 0; i < input.length; i++) {
    // save the character inside a constant
    const char = input[i]

    if (! inQuote) {
      if (char == quote) {
        inQuote = true
        continue
      }

      // check for newlines
      if (char == '\n') {
        row.push( value.join('') )
        value = []

        result.push([])
        row = result[ result.length - 1 ]
      }

      else {
        // if the character isn't separator, add it to the current row
        if (char != separator) {
          value.push(char)
        }

        // we faced with separator
        else {
          row.push( value.join('') )
          value = []
        }
      }
    }
    
    // we faced with quoted string
    else {
      if (char == quote) {
        if (typeof input[i + 1] != typeof undefined) {
          if (input[i + 1] == quote) {
            value.push(quote)
          }
        }

        inQuote = false
      }
      
      else {
        // if the character isn't separator, add it to the current row
        if (char != separator) {
          value.push(char)
        }

        // we faced with separator
        else {
          row.push( value.join('') )
          value = []
        }
      }
    }
  }

  row.push( value.join('') )
  
  return result
}