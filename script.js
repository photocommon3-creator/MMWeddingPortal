document.addEventListener("DOMContentLoaded", function() {
  const wordCloudContainer = document.getElementById('wordCloudContainer');
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 400;
  wordCloudContainer.appendChild(canvas);

  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQjJ3vUagj6CaEIg104K3V0ITstLLQkrkUGrH93hjK6h7sZ_fzxhuyOHPHLU3tBjFrAp-sGdP1kLRHe/pub?gid=438313295&single=true&output=csv";

  fetch(sheetUrl)
    .then(response => response.text())
    .then(csvText => {
      // Convert CSV to array of words
      const rows = csvText.split("\n").slice(1); // skip header
      const words = rows.map(row => row.split(",")[1].trim()).filter(Boolean);

      // Count frequency
      const counts = {};
      words.forEach(word => {
        counts[word] = (counts[word] || 0) + 1;
      });

      // Convert to format for wordcloud2.js
      const wordArray = Object.entries(counts);

      // Draw word cloud
      WordCloud(canvas, {
        list: wordArray,
        gridSize: 8,
        weightFactor: 10,
        fontFamily: 'Times, serif',
         color: function(word, weight) {
    const palette = ['#d94f6f', '#f7c59f', '#f1c40f']; // blush pink, soft pink, gold
    return palette[Math.floor(Math.random() * palette.length)];
  },
  backgroundColor: '#fffaf0'
      });
    })
    .catch(err => console.error("Error loading CSV:", err));
});
