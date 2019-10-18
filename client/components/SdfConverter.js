import React from 'react';
import {FileInput} from '@blueprintjs/core';

import FileSaver from 'file-saver';
import legacy from 'legacy-encoding';

function SdfConverter () {

  const trimChars = (text, charsToRemove) => {
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
  };

  const convertSdfToTxt = sdf_text => {
    const decoded_contents = legacy.decode(sdf_text, 'iso-8859-11');
    return decoded_contents.split('\n').map(row => trimChars(row, '\r\n" ')).reduce((accumulator, currentValue) => {
      return accumulator + '\n' + currentValue;
    });
  };

  return (
    <div className='SdfConverter tool'>
      <div className='tool-header'>
        <h2>SDF File Converter</h2>
        <p>Convert sdf to txt file and remove quote at the start/end of line</p>
      </div>

      <div className='tool-body'>
        <FileInput text="Upload SDF file..." onInputChange={e => {
          document.getElementById('sdf-converter-status').innerHTML = '';

          const uploadFile = e.target.files[0];
          if (uploadFile) {
            let reader = new FileReader();
            reader.readAsArrayBuffer(uploadFile);
            reader.onload = function (e) {
              const downloadContent = convertSdfToTxt(Buffer.from(e.target.result));
              const downloadFilename = uploadFile.name.substring(0, uploadFile.name.lastIndexOf('.')) + '.txt';
              FileSaver.saveAs(new Blob([downloadContent], {type: "text/plain;charset=utf-8"}), downloadFilename);
            };
            reader.onerror = function (e) {
              document.getElementById('sdf-converter-status').innerHTML = 'Error reading SDF file';
            }
          }
        }} />
        <div id='sdf-converter-status' className='tool-status'><!-- ERROR MESSAGE --></div>
      </div>
    </div>
  );
}

export default SdfConverter;
