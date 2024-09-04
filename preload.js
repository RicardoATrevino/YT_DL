const { contextBridge, ipcRenderer } = require('electron');
const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

contextBridge.exposeInMainWorld('electron', {
  showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),
  getVideoTitle: async (url) => {
    try {
      const info = await ytdl.getInfo(url);
      return info.videoDetails.title;
    } catch (error) {
      console.error('Error fetching video title:', error);
      return 'video'; // Fallback name
    }
  },
  downloadVideo: (url, path) => {
    const video = ytdl(url, { filter: 'audioonly' });
    video.pipe(fs.createWriteStream(path));
    video.on('end', () => {
      console.log('Video downloaded to:', path);
    });
  },
  convertToMp3: (inputPath, outputPath) => {
    ffmpeg(inputPath)
      .toFormat('mp3')
      .on('end', () => {
        console.log('Conversion completed, MP3 saved to:', outputPath);
      })
      .save(outputPath);
  }
});

console.log(getVideoTitle)
console.log("--- ^^^ Video Title ^^^")
