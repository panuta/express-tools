
function trimChars(text, charsToRemove) {
  let i;
  for(i = 0; i < text.length; i++) {
    if(charsToRemove.indexOf(text.charAt(i)) === -1) {
      break;
    }
  }
  const startIndex = i;

  for(i = text.length - 1; i > startIndex; i--) {
    if(charsToRemove.indexOf(text.charAt(i)) === -1) {
      break;
    }
  }
  const endIndex = i + 1;

  return text.substring(startIndex, endIndex);
}

// Open SDF file
const fs = require('fs');
const legacy = require('legacy-encoding');

fs.readFile('input.sdf', function(err, contents) {
  const decoded_contents = legacy.decode(contents, 'iso-8859-11');

  const output_string = decoded_contents.split('\n').map(row => trimChars(row, '\r\n" ')).reduce((accumulator, currentValue) => {
    return accumulator + '\n' + currentValue;
  });

  fs.writeFile('output.txt', output_string, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

});
