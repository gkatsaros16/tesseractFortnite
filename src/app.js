const screenshot = require('desktop-screenshot');
const fs = require('fs');
const axios = require('axios')

var x = 0
// setInterval(function() {
//   screenshot("./temp/screenshot" + x + ".png", function(error, complete) {
//     if(error)
//         console.log("Screenshot failed", error);
//     else
      // // var base64str = base64_encode("./temp/screenshot" + x + ".png");
      // var base64str = base64_encode("C:\\Users\\gkatsaros\\Documents\\tesseract\\Capture.jpg");

//       x++
//   });
// }, 5000);

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

var base64str = base64_encode("C:\\Users\\gkatsaros\\Documents\\tesseract\\Capture.jpg");

axios.post('http://localhost:3000/ss', {base64: base64str} )
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });