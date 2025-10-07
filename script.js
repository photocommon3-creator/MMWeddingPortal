// Example using wordcloud2.js (we'll integrate later)
document.addEventListener("DOMContentLoaded", function() {
  const wordCloudContainer = document.getElementById('wordCloudContainer');
  
  // Placeholder words
  const words = [
    ['Love', 60],
    ['Joy', 40],
    ['Forever', 30],
    ['Adventure', 25]
  ];

  // Only create canvas if library is loaded
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 400;
  wordCloudContainer.appendChild(canvas);

  // Check if WordCloud library is loaded
  if (window.WordCloud) {
    WordCloud(canvas, { list: words });
  }
});
