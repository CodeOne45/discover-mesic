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

module.exports = { YouTubeGetID, stringToint, checkYTview };
