const songsService = require("../../models/songs/songs.service");
const { getYTViews } = require("../../_helpers/tools");

async function updateViewsForExistingSongs() {
    const limit = 10;
    let page = 1;
    let result;
    
    do {
      result = await songsService.getAll(page, limit);
      const listeMusique = result.songs || [];
      
      for (const s of listeMusique) {
        try {
          const views = await getYTViews(s.yt_id);
          await songsService.updateViews(s._id, views);
          console.log(`Updated song "${s.title}" with ${views} views.`);
        } catch (error) {
          console.error(`Error updating song "${s.title}":`, error);
        }
      }
      page++;
    } while (result.songs && result.songs.length > 0);
}

// Export the job handler function (if using a scheduler or cron job).
module.exports = () => {
  updateViewsForExistingSongs();
};
