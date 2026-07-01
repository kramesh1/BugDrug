/**
 * @summary A script used to convert CSV strings into Javascript objects.
 * 
 * This file takes data from a comma-separated value file, and turn it into a
 * javascript object (which is used in the main script). The workhorse function
 * is `csvToJS()`, which accepts a javascript string (of the comma-separated 
 * values). This function is just a wrapper function of:
 * 
 *   1. parseCSV:  Which takes the string of CSV data and turns it into a matrix
 *                 (i.e. array of arrays)
 *   2. transpose: Optional function which transposes the matrix. This prevents
 *                 you from needing to define the same relationship twice (i.e.
 *                 say that vanco treats MRSA in one file, and in a separate 
 *                 file also say that MRSA is treated with vanc)
 *   3. toJSON:    Converts the matrix into JSON format
 * 
 * Unfortunately CORS (cross origin requests) don't make it easy to read in the
 * CSV file directly, so in order to make this more portable and reliable across
 * browsers (and easier to debug), the CSV string is hard coded into the file.
 * To update it, open the CSV file in a file editor (as a text file) and copy 
 * the results into the strings defined in section II. If you're adapting this
 * project into something new, you could use fetch instead (see this stack 
 * overflow post: https://stackoverflow.com/q/14446447)
 * 
 * @author Hunter Ratliff
 * @link https://github.com/HunterRatliff1/BugDrug
 * 
 * Created on    : 2024-01-02
 * Last modified : 2024-01-24
 * 
 * @license MIT
 * Copyright (c) 2023 Hunter Ratliff
 * Permission is hereby granted, free of charge, to any person obtaining a copy 
 * of this software and associated documentation files (the "Software"), to 
 * deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or 
 * sell copies of the Software, and to permit persons to whom the Software is 
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE.
 * 
 */

/******************************************************************************\
 * SECTION I
 * Define the functions
 \*****************************************************************************/

// Example CSV used to demonstrate the functions below
const csvStringExp = `
Label,colA,colB
row1,A1,B1
row2,A2,B2
row3,A3,B3
row4,A4,B4
`;


/** parseCSV - Takes a string from a CSV file and processes it into an array 
 * of arrays. 
 * 
 * @param {string} str - A single string containing the CSV values.
 * @returns {Array}      Returns an array of arrays
 * 
 * @example
 * parseCSV(csvStringExp);   // using example data 
 * 
 * // Returns below:
 * [
 *   ['Label', 'colA', 'colB'],
 *   ['row1',  'A1',   'B1'],
 *   ['row2',  'A2',   'B2'],
 *   ['row3',  'A3',   'B3'],
 *   ['row4',  'A4',   'B4']
 * ]
 */
function parseCSV(str){
    var lines=str.split("\n");
  
    var result = [];

    for(var i=0;i<lines.length;i++){
        // ignore empty lines
        if (!lines[i])
            continue

        var currentline=lines[i].split(",");
        result.push(currentline);
    }
    return result
};


/** transpose - Transpose an array of arrays
 * @description 
 * When given an array of arrays (with `i` rows and `j` columns), returns the
 * transposed matrix (with `j` rows and `i` columns).
 * 
 * @param {Array} matrix - An array of arrays.
 * @returns {Array}
 * 
 * @example
 * var objArray = parseCSV(csvStringExp);   // using example data 
 * transpose(objArray);
 * // Returns below:
 * [
 *   ['Label', 'row1', 'row2', 'row3', 'row4'],
 *   ['colA', 'A1', 'A2', 'A3', 'A4'],
 *   ['colB', 'B1', 'B2', 'B3', 'B4']
 * ]
 * @see parseCSV
 * @link Adapted from this SO post https://stackoverflow.com/a/46805290
 */
function transpose(matrix) {
    const rows = matrix.length, cols = matrix[0].length;
    const grid = [];
    for (let j = 0; j < cols; j++) {
        grid[j] = Array(rows);
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
        grid[j][i] = matrix[i][j];
        }
    }
    return grid;
}


/** toJSON - Converts array of CSV data into Javascript object
 * @description 
 * This takes the CSV data, formatted as an array of arrays (with `i` rows and 
 * `j` columns), and creates a nested javascript object. In the parent object, 
 * it uses the first column (`j=0`) as keys to name each child object. The child
 * object's names/keys come from the first row (`i=0`), and the values come from 
 * the remaining `j-1` columns. 
 * 
 * In the example, which comes from a CSV with **four rows** and **three columns**, 
 * the names from the row are in the format *col(`j`)* and the names in the first 
 * column are in the format *row(`i`)*. *row(`i`)* becomes the key for each child
 * object, and each child object consists of key:value pairs (using *col(`j`)* 
 * as the key). See the example for details. 
 * 
 * @param {Array}     arr   - An array of arrays, generated from parseCSV().
 * @param {boolean=}  json  - A logical flag indicating if the results should be
 *                            returned as a JavaScript object (true; default) or
 *                            as a JSON string (json=false).
 * @returns {(Object|string)} A Javascript object (or JSON string) with the 
 *                            values of the array renamed as objects.
 *  
 * 
 * @example
 * var objArray = parseCSV(csvStringExp);
 * toJSON(objArray, json=true);
 * // Returns below:
 * {"row1": {"colA":"A1","colB":"B1"},
 *  "row2": {"colA":"A2","colB":"B2"},
 *  "row3": {"colA":"A3","colB":"B3"},
 *  "row4": {"colA":"A4","colB":"B4"}
 * }
 * @see parseCSV
 * @link Adapted from this SO post https://stackoverflow.com/q/27979002
 */
function toJSON(arr, json=false){
    
    // This is the parent object, where each item will be the contents of a row
    var result = {};
    var headers=arr[0];
  
    // For each row (skipping the header row)
    for(var i=1;i<arr.length;i++){
        // This object will be the child object, e.g. {col1:'', col2:'', ...}
        var rowObj = {};
        var currentline=arr[i];
  
        // For each column of that row, name contents based on the column's header
        for(var j=1;j<headers.length;j++){  // skip the first column
            rowObj[headers[j]] = currentline[j];
        }

        // Name the results of the loop above based on the value in the first
        // column of that row
        result[currentline[0]] = rowObj;
    }

    // If JSON is true, return the results as json string. Otherwise return
    // it as a JavaScript object
    return json ? JSON.stringify(result) : result;
}


/** csvToJS - Wrapper function taking CSV to JS object
 * 
 * @param {string} str   - A single string containing the CSV values.
 * @param {boolean} tsp  - A logical flag indicating if CSV should be transposed.
 * @param {boolean} json - A logical flag if results should be returned as JSON,
 *                         which can be helpful for debugging.
 * @returns {(Object|string)} A Javascript object (or JSON string) with the 
 *                            values of the array renamed as objects.
 * @see parseCSV
 * @see transpose
 * @see toJSON
 */
function csvToJS(str, tsp=false, json=false) { 
    var csv = parseCSV(str);

    // Transpose if told to do so
    csv = tsp ? transpose(csv) : csv;
    
    // Create the JS object or JSON string
    return toJSON(csv, json)
 }

/* Some examples to demonstrate behavior 
// Create the JSON using the format as is
var objArray = parseCSV(csvStringExp);
var onjJson = toJSON(objArray, true);
console.log(onjJson);

// Transpose the CSV then create JSON
var objTransposed = transpose(objArray);
var onjJsonTransposed = toJSON(objTransposed, true);
console.log(objTransposed);
console.log(onjJsonTransposed);
*/


/******************************************************************************\
 * SECTION II
 * Define the actual CSV strings
 \*****************************************************************************/
const CSV_SYNDROME = `
Bug-Syndrome,GNR,PsA,AmpC,ESBL,CRE,Steno,CRAB,DTR,MSSA,MRSA,SOSA,Strep,VRE,VSE,anaerobes,Other,PNA,Zoo
Empiric,com,com,com,occ,,,,,com,com,,com,,occ,occ,,,occ
UTI,com,com,com,occ,occ,,,,,,,,occ,occ,,com,,
CAP,com,,occ,,,,,,occ,occ,,com,,,,,com,
HAP,com,com,com,occ,occ,occ,occ,occ,com,com,,com,,,,,,
SSTI,,,,,,,,,com,com,unk,com,,,occ,,,
Foot,occ,occ,,,,,,,com,com,unk,com,,,occ,,,
Osteo,com,com,,,,,,,com,com,occ,com,,,occ,,,
IAI,com,occ,,occ,,,,,occ,occ,,occ,occ,com,com,,,
Hepatobiliary,com,,,,,,,,,,,,occ,com,com,,,
SBP,com,,,,,,,,,,occ,com,,occ,,,,
Meningitis,,,,,,,,,,,,com,,,,com,,
SA,com,occ,,,,,,,com,com,,com,,,,,,
`;

const CSV_ANTIBIOTICS = `
Bug-abx,GNR,PsA,AmpC,ESBL,CRE,Steno,CRAB,DTR,MSSA,MRSA,SOSA,Strep,VRE,VSE,anaerobes,Other,PNA,Zoo
NAF,,,,,,,,,good,bad,some,good,,,,,,
AMP,,,bad,,,,,,bad,bad,some,good,some,good,,note,,
Unasyn,some,bad,bad,,,,note,,some,bad,some,good,some,some,good,,,
Augmentin,some,,bad,,,,,,some,bad,some,good,some,some,good,,,
Zosyn,good,good,bad,bad,,,,,some,bad,some,good,some,some,good,,,
CFZ,some,,bad,,,,,,good,bad,some,good,bad,bad,,,,
FOX,some,,bad,,,,,,some,bad,bad,some,bad,bad,some,,,
CRO,good,bad,bad,bad,,,,,some,bad,,good,bad,bad,,note,,
FEP,good,good,good,bad,,,,bad,good,bad,,good,bad,bad,,,,
CPT,some,bad,bad,,,,,,good,good,good,good,bad,bad,,,,
VAN,,,,,,,,,broad,good,good,broad,bad,good,,,,
LZD,,,,,,,,,broad,good,good,broad,good,broad,,,,
DAP,,,,,,,,,broad,good,good,broad,good,broad,,,,
MEM,broad,good,good,good,bad,bad,some,some,broad,bad,,broad,,,good,,,
ETP,broad,bad,good,good,bad,bad,bad,,good,bad,,good,,,good,,,
DOX,some,,,,,some,,,good,good,some,,,,,,good,good
MIN,some,,,,,good,some,,good,good,some,,,,,,good,some
TGC,broad,bad,good,good,good,some,note,bad,broad,broad,broad,broad,,,some,,broad,broad
MTZ,,,,,,,,,,,,,,,good,,,
CLI,,,,,,,,,some,some,some,some,,,good,,,
ATM,good,good,bad,bad,,note,,,,,,,,,,,,
Aminogly,good,good,good,some,some,,,,note,note,note,note,note,note,,,,
AZM,,,,,,,,,,,,,,,,,good,
Quino,good,some,good,some,,some,some,,some,,,some,,,some,note,good,
TMPSMX,good,,good,some,,good,some,,good,good,good,,,,,note,,
NIT,good,,,some,some,bad,,,,,,,good,good,,,,
FOF,good,bad,some,some,some,bad,,,,,,,some,some,,bad,,
Xacduro,,,,,,,good,,,,,,,,,,,
Vabomere,broad,good,good,good,good,bad,,bad,,,,,,,broad,,,
Recarbrio,broad,good,good,good,good,bad,,good,,,,,,,broad,,,
Zerbaxa,broad,broad,some,good,bad,bad,,good,,,,,,,bad,,,
Avycaz,broad,good,good,good,good,note,,good,,,,,,,bad,,,
Cefiderocol,broad,broad,broad,broad,good,good,good,good,,,,,,,,,,
`;

/*
// Worked examples
// Specific syndrome to list of bugs
console.log("Given the syndrome (UTI), what is its association with each bacteria?");
console.log(  csvToJS(CSV_SYNDROME, false)["UTI"]  );

// Specific bug to list of syndromes
console.log("Given the bacteria (MSSA), what is its association with each syndrome?");
console.log(  csvToJS(CSV_SYNDROME, true)["MSSA"]  );

// Specific antibiotic to list of bugs
console.log("Given the antibiotic (Linezolid), what is its activity for each bacteria?");
console.log(  csvToJS(CSV_ANTIBIOTICS, false)["LZD"]  );

// Specific bug to list of antibiotic
console.log("Given the bacteria (MSSA), how is its activity for each antibiotic?");
console.log(  csvToJS(CSV_ANTIBIOTICS, true)["MSSA"]  );
*/
