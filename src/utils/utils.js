

export const transformGoogleSheetValues = (data) => {
    let headers=data[0];
    let result =[];
    for (let row =1;row<data.length;row++) {
        let obj = {}
        for (let head=0;head<data[0].length;head++) {
            obj[headers[head]] = data[row][head];

        }
        result.push(obj);
    }
    return result;
}

export const transformGoogleSheetValuesMap = (data, key) => {
   
    let result ={};
    let transformed = transformGoogleSheetValues(data);
    for (let row=0;row<transformed.length;row++) {
        let keyVal= transformed[row][key];
        
        result[keyVal] =  transformed[row]; 
        //delete transformed[row][key];
    }
    return result;
}

export function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(3);

    // If minutes are 0, only display seconds
    if (minutes === 0) {
        return `${seconds.padStart(5, '0')}`;
    }

    // Display minutes and seconds
    return `${String(minutes).padStart(2, '0')}:${seconds.padStart(6, '0')}`;
}

export function getAdvColor(value) {
    value = Math.max(0, Math.min(1, value));

    let red, green, blue;
  
    if (value < 0.5) {
      // Interpolate between green and yellow
      red = Math.floor(510 * value); // 510 because we're going from 0 to 255 (green to yellow)
      green = 255;
      blue = 0;
    } else {
      // Interpolate between yellow and red
      red = 255;
      green = Math.floor(255 - (510 * (value - 0.5))); // 510 because we're going from yellow to red
      blue = 0;
    }
  
    // Convert the components to hex
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');
  
    // Combine the components into a hex string
    return `#${redHex}${greenHex}${blueHex}`;
  }

 export  function getAverage(arr) {
    if (arr.length === 0) return 0;
    
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
}