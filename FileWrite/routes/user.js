const express = require("express");
const fs = require('node:fs');
const router = express.Router();
router.get("/", (req, res) => {

    const firstName = req.query.firstname;
    const lastName = req.query.lastname;
    const favfood = req.query.favfood;
    const content = firstName + ", " + lastName +  ", " + favfood + "\n";

    fs.appendFileSync("myData.txt" , content ,err =>{
        if (err){
            console.err(err);
        }
    });
     

//Read in the file and output to variable named textData
fs.readFile("myData.txt", 'utf8', (err, rows) => {
    if (err) {
        console.error('file cannot be read', err);
        return;
    }

    //Create the header
    let htmlData = "<html><head></head><body><table>";
    //For loop that will iterate though the lines of the file
    for (const row of rows) {
        let rowData = "<tr><td> "+ row;
        rowData += "</tr></td> "
        htmlData += rowData;
    }
    htmlData += "</table></body></html>";
     
    //This is a new page I guess? 
    res.send(htmlData);

});

 
}); //end of get


module.exports = router;

