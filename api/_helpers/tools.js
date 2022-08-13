const Datauri = require('datauri');
const path = require('path');
const fetch = require('node-fetch');

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
  const url = "https://www.googleapis.com/youtube/v3/videos?id="+ id + "&key=" + process.env.YOUTUBE_VIEW_API + "&part=statistics";

  return fetch(url)
    .then(res =>{
      if (res.status !== 200) {
        throw new Error(`Invalid status code (!= 200)`)
       }
       return res.json();
    })
    .then(yt_video =>  {
      if(yt_video.items[0].statistics.viewCount < 50000){
        return true;
      }
      return false
  });
}


function get_yt_profile_pic(chaneel_id){
  const url = "https://www.googleapis.com/youtube/v3/channels?part=snippet&id="+ chaneel_id + "&fields=items%2Fsnippet%2Fthumbnails&key=" + process.env.YOUTUBE_VIEW_API + "&part=statistics";

  return fetch(url)
    .then(res =>{
      if (res.status !== 200) {
        throw new Error(`Invalid status code (!= 200)`)
       }
       return res.json();
    })
    .then(yt_video =>  {
      console.log(yt_video.items[0].snippet.thumbnails.high.url)
      return yt_video.items[0].snippet.thumbnails.high.url;
  });
}

async function video_details(data){
  const url = "https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id="+ data.yt_id + "&key=" + process.env.YOUTUBE_VIEW_API;

  return fetch(url)
    .then(res =>{
      if (res.status !== 200) {
        throw new Error(`Invalid status code (!= 200)`)
       }
       return res.json();
    })
    .then(yt_video =>  {
      let profile_pic_url;
      return (async() => {
        profile_pic_url = await get_yt_profile_pic(yt_video.items[0].snippet.channelId);
        let dataSend;
        if(data.addedBy){
          dataSend = {
            yt_id: data.yt_id,
            addedBy: data.addedBy,
            title: yt_video.items[0].snippet.title,
            author: yt_video.items[0].snippet.channelTitle,
            profile_pic_url: profile_pic_url,
            channelID: yt_video.items[0].snippet.channelId
          };
        }else{
          dataSend = {
            yt_id: data.yt_id,
            title: yt_video.items[0].snippet.title,
            author: yt_video.items[0].snippet.channelTitle,
            profile_pic_url: profile_pic_url,
            channelID: yt_video.items[0].snippet.channelId
          };
        }
        return dataSend;
      })();
  });
}


async function checkYTVideoURL(chaneel_id){
 
  // check si la video est une musique
}

module.exports = { YouTubeGetID, stringToint, checkYTview, uploader, sendEmail, video_details, get_yt_profile_pic};
