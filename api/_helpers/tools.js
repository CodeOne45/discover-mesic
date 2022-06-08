const Datauri = require('datauri');
const path = require('path');

const cloudinary = require('../config/cloudinary');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
function uploader(req) {
  return new Promise((resolve, reject) => {
      const dUri = new Datauri();
      let image = dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

      cloudinary.uploader.upload(image.content, (err, url) => {
          if (err) return reject(err);
          return resolve(url);
      })
  });
}

function sendEmail(mailOptions) {
  return new Promise((resolve, reject) => {
      sgMail.send(mailOptions, (error, result) => {
          if (error) return reject(error);
          return resolve(result);
      });
  });
}

function stringToint(num) {
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: "000", s: "K" },
    { v: "000000", s: "M" },
  ];
  let index;
  let numBis;
  for (index = si.length - 1; index > 0; index--) {
    if (num.includes(si[index].s)) {
      numBis = num.replace(si[index].s, si[index].v);
    }
  }

  return parseInt(numBis);
}

function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}

async function checkYTview(id){
  try {
      const response = fetch(process.env.YOUTUBE_VIEW_API + id, {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": process.env.YOUTUBE_VIEW_API_KEY,
              "x-rapidapi-key": process.env.YOUTUBE_VIEW_API_HOST
          }
      });

      const res = await response.json;
      //if()....

  } catch(e) {
      console.log(process.env.YOUTUBE_VIEW_API + id);
      console.log("Error : Youtube view api connection failed!!");
  }
  
  return true;
}
async function checkYTVideoURL(id){

  // check si la video est une musique, si le temps est inférieur à <
}

module.exports = { YouTubeGetID, stringToint, checkYTview, uploader, sendEmail };
