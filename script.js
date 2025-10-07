document.addEventListener("DOMContentLoaded", function() {
  const wordCloudContainer = document.getElementById('wordCloudContainer');
  
  const canvas = document.createElement('canvas');
  canvas.width = 400;
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
       // Calculate dynamic weight factor
    const maxFreq = Math.max(...wordArray.map(([_, freq]) => freq));
    const totalWords = wordArray.length;

    // Adjust scaling based on dataset size
    let weightFactor = 0;

    if (totalWords < 10) {
      weightFactor = 80; // few words → large size
    } else if (totalWords < 30) {
      weightFactor = 50;
    } else if (totalWords < 80) {
      weightFactor = 25;
    } else {
      weightFactor = 10; // many words → smaller size
    }

      // Dynamic gridSize based on number of words
let gridSize;
if (totalWords < 10) {
  gridSize = 6;  // tighter for few words
} else if (totalWords < 30) {
  gridSize = 8;
} else if (totalWords < 80) {
  gridSize = 10;
} else {
  gridSize = 12; // more words → more spacing
}

    // Further adjust for max frequency
    weightFactor = weightFactor * (40 / (maxFreq + 5));

    console.log("Dynamic weightFactor:", weightFactor);

      // Draw word cloud
      WordCloud(canvas, {
        list: wordArray,
        gridSize: gridSize,
        weightFactor: weightFactor,
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



$(document).ready(function(){
  const $carousel = $('#carousel');
  const $images = $carousel.children();
  let currentIndex = 0;
  const totalImages = $images.length;

  function showSlide(index) {
    const width = $images.eq(0).outerWidth(true);
    $carousel.css('transform', `translateX(-${index * width}px)`);
  }

  $('#next').click(function(){
    currentIndex = (currentIndex + 1) % totalImages;
    showSlide(currentIndex);
  });

  $('#prev').click(function(){
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showSlide(currentIndex);
  });

  // Tabs functionality
 $('.tab-btn').click(function() {
    const tab = $(this).data('tab');

    // Show selected tab content
    $('.tab-content').hide();
    $('#' + tab).fadeIn(300);

    // Update active button styling
    $('.tab-btn').removeClass('bg-pink-500 text-white shadow-lg');
    $('.tab-btn').addClass('bg-pink-100 text-pink-700');
    $(this).removeClass('bg-pink-100 text-pink-700');
    $(this).addClass('bg-pink-500 text-white shadow-lg');
  });

  // Initialize first tab as active
  $('.tab-btn').first().click();

  // Optional: Auto-slide every 5 seconds
  setInterval(function(){
    currentIndex = (currentIndex + 1) % totalImages;
    showSlide(currentIndex);
  }, 10000);
});











