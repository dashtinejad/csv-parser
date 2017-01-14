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
export default function (input, separator, quote) {
  separator = separator || ','
  quote = quote || '"'
  
  // the final return array which contains arrays (for each row)
  let result = [
    []
  ]

  // loop through each character of input
  for (let i = 0; i < input.length; i++) {
    // save the character inside a constant
    const char = input[i]

    // we put the values of current row inside an array
    let row = result[ result.length - 1 ]

    // if the character isn't separator, add it to the current row
    if (char != separator) {
      row.push(char)
    }
  }
  
  return result
}