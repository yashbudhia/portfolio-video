const https = require('https');
const fs = require('fs');
const path = require('path');

// Create videos directory if it doesn't exist
const videosDir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

// Try a different video URL
const videoUrl = 'https://cdn.pixabay.com/vimeo/414804450/computer-31258.mp4?width=1280&hash=4e4d0d3a4b9e3c6a3f3d3d3d3d3d3d3d3d3d3d3d';
const outputPath = path.join(videosDir, 'smoke.mp4');

console.log(`Downloading video from ${videoUrl}`);
console.log(`Saving to ${outputPath}`);

const file = fs.createWriteStream(outputPath);

https.get(videoUrl, (response) => {
  // Check if the response is a redirect
  if (response.statusCode === 301 || response.statusCode === 302) {
    console.log(`Following redirect to: ${response.headers.location}`);
    https.get(response.headers.location, (redirectResponse) => {
      redirectResponse.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log('Download completed');
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete the file if there's an error
      console.error(`Error downloading the video: ${err.message}`);
    });
    return;
  }
  
  // If not a redirect, proceed normally
  response.pipe(file);

  file.on('finish', () => {
    file.close();
    console.log('Download completed');
  });
}).on('error', (err) => {
  fs.unlink(outputPath, () => {}); // Delete the file if there's an error
  console.error(`Error downloading the video: ${err.message}`);
});
