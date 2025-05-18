const https = require('https');
const fs = require('fs');
const path = require('path');

// Create videos directory if it doesn't exist
const videosDir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

const videoUrl = 'https://cdn.pixabay.com/vimeo/328216459/video-editing-23567.mp4?width=1280&hash=c6f39a9d0bbae2b2a89e5e7a7b0eff0e9e5b2e1c';
const outputPath = path.join(videosDir, 'smoke.mp4');

console.log(`Downloading video from ${videoUrl}`);
console.log(`Saving to ${outputPath}`);

const file = fs.createWriteStream(outputPath);

https.get(videoUrl, (response) => {
  response.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log('Download completed');
  });
}).on('error', (err) => {
  fs.unlink(outputPath, () => {}); // Delete the file if there's an error
  console.error(`Error downloading the video: ${err.message}`);
});
