console.log("script.js loaded");

const apiKey = "Giphy Test App";
const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`;

const gifContainer = document.querySelector('#gif-container');
const fetchBtn = document.querySelector('#fetch-gif-btn');
const toggleBtn = document.querySelector('#toggle-gifs-btn');

let isGifsPaused = false;

fetchBtn.addEventListener('click', async () => {
  await getTrendingGifs();
});

toggleBtn.addEventListener('click', () => {
  isGifsPaused = !isGifsPaused;
  updateToggleButton();
  switchGifState();
});

function updateToggleButton() {
  toggleBtn.textContent = isGifsPaused ? 'Play GIFs' : 'Pause GIFs';
}

async function getTrendingGifs() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const gifData = await response.json();
    displayGifs(gifData.data);
  } catch (error) {
    console.error("Error fetching Giphy data:", error);
  }
}

function getStillUrl(animatedUrl) {
  if (!animatedUrl) return animatedUrl;

  // Giphy original static URL naming convention
  if (animatedUrl.includes('giphy.gif')) {
    return animatedUrl.replace(/giphy\.gif$/, 'giphy_s.gif');
  }

  if (animatedUrl.endsWith('.gif')) {
    return animatedUrl.replace(/\.gif$/, '_s.gif');
  }

  return animatedUrl;
}

function displayGifs(gifs) {
  gifContainer.innerHTML = '';

  gifs.forEach(gif => {
    const animated = gif.images.original.url;
    const still = gif.images.original_still?.url || getStillUrl(animated);
    const initial = isGifsPaused ? still : animated;

    const image = document.createElement('img');
    image.src = initial;
    image.alt = gif.title || 'Giphy image';
    image.className = 'col-3 mb-3';
    image.dataset.animated = animated;
    image.dataset.still = still;
    image.dataset.state = isGifsPaused ? 'still' : 'animated';

    gifContainer.appendChild(image);
  });
}

function switchGifState() {
  const gifs = gifContainer.querySelectorAll('img');

  gifs.forEach(img => {
    const animated = img.dataset.animated || img.src;
    const still = img.dataset.still || getStillUrl(animated);

    if (isGifsPaused) {
      img.src = still;
      img.dataset.state = 'still';
    } else {
      img.src = animated;
      img.dataset.state = 'animated';
    }

    img.dataset.animated = animated;
    img.dataset.still = still;
  });
}

function initExistingGifs() {
  const gifs = gifContainer.querySelectorAll('img');

  gifs.forEach(img => {
    const animated = img.src;
    const still = getStillUrl(animated);

    img.dataset.animated = animated;
    img.dataset.still = still;
    img.dataset.state = 'animated';
  });
}

initExistingGifs();