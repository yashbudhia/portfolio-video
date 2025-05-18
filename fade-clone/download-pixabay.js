const https = require('https');
const fs = require('fs');
const path = require('path');

// Create videos directory if it doesn't exist
const videosDir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

// Pixabay video URL (allowed by CSP)
const videoUrl = 'https://cdn.pixabay.com/vimeo/328216459/video-editing-23567.mp4?width=1280&hash=c6f39a9d0bbae2b2a89e5e7a7b0eff0e9e5b2e1c';
const outputPath = path.join(videosDir, 'smoke.mp4');

console.log(`Downloading video from ${videoUrl}`);
console.log(`Saving to ${outputPath}`);

// Create a function to handle redirects
const downloadWithRedirects = (url, outputPath, maxRedirects = 5) => {
  if (maxRedirects <= 0) {
    console.error('Too many redirects');
    return;
  }

  const file = fs.createWriteStream(outputPath);
  
  https.get(url, (response) => {
    // Handle redirects
    if (response.statusCode === 301 || response.statusCode === 302) {
      console.log(`Following redirect to: ${response.headers.location}`);
      file.close();
      fs.unlinkSync(outputPath);
      downloadWithRedirects(response.headers.location, outputPath, maxRedirects - 1);
      return;
    }
    
    console.log(`Status code: ${response.statusCode}`);
    
    // Handle successful response
    response.pipe(file);
    
    let dataLength = 0;
    response.on('data', (chunk) => {
      dataLength += chunk.length;
      process.stdout.write(`\rDownloaded: ${(dataLength / 1024 / 1024).toFixed(2)} MB`);
    });

    file.on('finish', () => {
      file.close();
      console.log('\nDownload completed');
    });
  }).on('error', (err) => {
    fs.unlink(outputPath, () => {}); // Delete the file if there's an error
    console.error(`Error downloading the video: ${err.message}`);
  });
};

// Start the download
downloadWithRedirects(videoUrl, outputPath);
