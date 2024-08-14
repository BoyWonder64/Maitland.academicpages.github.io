const express = require("express");
const fs = require("node:fs");
const router = express.Router();
router.get("/", (req, res) => {

const foodcompare = req.query.foodFinder; //Word from user
    
//Read in the file and output to variable named textData
fs.readFile('myData.txt', 'utf8', (err, rows) => {
    if (err) {
        console.error('file cannot be read', err);
        return;
    }

    let htmlData = "<html><head></head><body><table>";
    for (let row of rows) {
            if(row.includes(foodcompare)){
                let rowData = "<tr><td>";
                rowData += row;
                rowData += "</tr></td>";
                htmlData += rowData;
            }
    }
    htmlData += "</table></body></html>";

    //This is a new page
    res.send(htmlData)

}); //end of read file

});



module.exports = router;