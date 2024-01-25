

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