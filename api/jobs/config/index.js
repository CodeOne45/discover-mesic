module.exports = {
    checkYtView: {
        frequency : " * * * * * ",
        handler : "jobs/handlers/checkYtView"
    },
    updateSongViews: {
        frequency: "0 0 * * *", // Runs every day at midnight
        handler: "jobs/handlers/updateSongViews" // Path to your job handler file
    }
}