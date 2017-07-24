# Facebook-capture-Home-camera
Home Webcame Capture from Facebook Bot

Prerequirement(Hardware)
  Laptop/Raspberrypi+camera

PreRegistered
  Have facebook Developer Account
  Have  Google Drive Permission in https://console.developers.google.com/ and client-secret.json
  Have Node Js Account

Pre Knowledge
  -simple Facebook chat bot using Node js
  -Node Js  web server Using Express
  -Quickstart in google api(For Authorization)
  -Upload file in google drive
  -Webcam module in node js
  -Socket io module in node js

  Installation
    In Server Side
    - change "Page token" and "webhook token" and "index.js" of webcam chatbot folder
    - Upload webcam chatbot in Heroku server
    - Create App and connect to webcam chatbot in developer.facebook.com
    - Run https://ur_app.herokuapp.com/addmenu in browser . if success, menu icon is shown in your page
    In Client Side
    - Replace "client_seret.json"in webcam folder
    - change your facebook id in "  if(data==="Your Facebook ID")" statement
    - your facebook id canbe watched in Heroku console.
    - Run node client.js
    - if you see connect, you can start

Explain
-----------
   When You clicked the button in facebook menu. It request to "payload_iotlink" Postback.
   In this Postback condition, socketio send client to senderid message.
   When Client get the message. The Client check Senderid.
   If OK, Capture Image.
   Upload Google drive
   If success uploaded, client message to its url to Heroku.
   Heroku got Message, the message redirect to facebook bot.
# Facebook-capture-Home-camera
