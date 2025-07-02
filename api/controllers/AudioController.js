/* global sails */
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const UPLOAD_DIR = path.resolve(sails.config.appPath, '.tmp/audio'); //  keep outside web root

module.exports = {

  upload: async function (req, res) {
    // 1. Pull the streamed file
    req.file('audio')                       // field name in FormData          :contentReference[oaicite:4]{index=4}
      .upload({ dirname: UPLOAD_DIR }, async (err, files) => {
        if (err) return res.serverError(err);
        if (!files.length) return res.badRequest('No file received');

        // 2. Convert to MP3
        const wavPath = files[0].fd;                    // e.g. .tmp/audio/recording.webm
        const mp3Path = wavPath.replace(/\.\w+$/, '.mp3');
        ffmpeg(wavPath)
          .audioBitrate('128k')
          .toFormat('mp3')
          .on('end', () => {
            sails.log(`Saved MP3 at ${mp3Path}`);
            return res.ok({ url: `/download/${path.basename(mp3Path)}` });
          })
          .on('error', (e) => res.serverError(e))
          .save(mp3Path);
      });
  },

};
