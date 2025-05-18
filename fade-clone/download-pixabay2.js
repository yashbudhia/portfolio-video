const https = require('https');
const fs = require('fs');
const path = require('path');

// Create videos directory if it doesn't exist
const videosDir = path.join(__dirname, 'public', 'videos');
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

// Different Pixabay video URL
const videoUrl = 'https://cdn.pixabay.com/vimeo/414804450/computer-31258.mp4?width=1280&hash=4e4d0d3a4b9e3c6a3f3d3d3d3d3d3d3d3d3d3d3d';
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
