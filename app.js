//code mainly done by Mikhail Timotev

var http = require('http'),
    path = require('path'),
    express = require('express'),
    fs = require('fs'),
    xmlParse = require('xslt-processor').xmlParse,
    xsltProcess = require('xslt-processor').xsltProcess,
    xml2js = require('xml2js');
    expAutoSan = require('express-autosanitizer');

var router = express();
var server = http.createServer(router);

router.use(express.static(path.resolve(__dirname, 'views')));
router.use(express.urlencoded({extended: true}));

router.use(express.json());
router.use(expAutoSan.allUnsafe);

// Function to read in XML file and convert it to JSON
function xmlFileToJs(filename, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  fs.readFile(filepath, 'utf8', function(err, xmlStr) {
    if (err) throw (err);
    xml2js.parseString(xmlStr, {}, cb);
  });
}

//Function to convert JSON to XML and save it
function jsToXmlFile(filename, obj, cb) {
  var filepath = path.normalize(path.join(__dirname, filename));
  var builder = new xml2js.Builder();
  var xml = builder.buildObject(obj);
  fs.writeFile(filepath, xml, cb);
}

router.get('/', function(req, res){

    res.render('index');

})

router.get('/get/html', function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});

    var xml = fs.readFileSync('computerShop.xml', 'utf8');
    var xsl = fs.readFileSync('computerShop.xsl', 'utf8');
    var doc = xmlParse(xml);
    var stylesheet = xmlParse(xsl);

    var result = xsltProcess(doc, stylesheet);

    res.end(result.toString());


});

// POST request to add to JSON & XML files
router.post('/post/json', function(req, res) {

  // Function to read in a JSON file, add to it & convert to XML


  // Call appendJSON function and pass in body of the current POST request
  appendJSON(req.body);

  // Re-direct the browser back to the page, where the POST request came from
  res.redirect('back');

});

  function appendJSON(obj) {
    console.log(obj);
    // Function to read in XML file, convert it to JSON, add a new object and write back to XML file
    xmlFileToJs('computerShop.xml', function(err, result) {
      if (err) throw (err);
      result.products.section[obj.sec_n].entree.push({'item': obj.item, 'price': obj.price, 'description': obj.description, 'specs': obj.specs});
      console.log(result);

      jsToXmlFile('computerShop.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  }

  function deleteJSON(obj) {
    // Function to read in XML file, convert it to JSON, delete the required object and write back to XML file
    xmlFileToJs('computerShop.xml', function(err, result) {
      if (err) throw (err);
      //This is where we delete the object based on the position of the section and position of the entree, as being passed on from index.html
      delete result.products.section[obj.section].entree[obj.entree];
      //This is where we convert from JSON and write back our XML file
      jsToXmlFile('computerShop.xml', result, function(err) {
        if (err) console.log(err);
      })
    })
  }

  // I have moved the functions for append and delete outside the router.post functions so I can reuse them
  //anytime I want and mainly because I was planning to applied UPDATE by first using the delete method
  //and second by using the append method using atributes from the UPDATE form


// POST request to delete
router.post('/post/delete', function(req, res) {
    // Function to read in a JSON file, add to its & convert to XML

  // Call appendJSON function and pass in body of the current POST request
  deleteJSON(req.body);
    res.redirect('back');
});

router.post('/post/update', function(req, res) {
//applying delete and update
  deleteJSON(req.body);
//at the moment of adding from the UPDATE form I could get the form attributes to be automatically
//set up after clicking in a row. I tryed to implement this in the table.js file in the .click of the row.
  appendJSON

});




server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});