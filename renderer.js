
const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const { ipcRenderer } = require('electron');



function downloadVideo(url, path) {
  const video = ytdl(url, { filter: 'audioonly' });
  video.pipe(fs.createWriteStream(path));
  video.on('end', () => {
    console.log('Download completed');
  });
}

function convertToMp3(inputPath, outputPath) {
    ffmpeg(inputPath)
      .toFormat('mp3')
      .on('end', () => {
        console.log('Conversion completed');
      })
      .save(outputPath);
  }


  document.getElementById('download').addEventListener('click', async () => {
    const url = document.getElementById('url').value;
    const { filePath } = await ipcRenderer.invoke('show-save-dialog', {
      title: 'Save MP3',
      filters: [{ name: 'MP3 Files', extensions: ['mp3'] }],
    });
  
    if (url && filePath) {
      const videoPath = filePath.replace('.mp4', '.mp3');
      downloadVideo(url, videoPath);
      convertToMp3(videoPath, filePath);
    }
  });



if (savePath) {
  console.log(`File will be saved to: ${savePath}`);
  // Proceed with download and conversion
} else {
  console.log('Save was cancelled by the user.');
}

