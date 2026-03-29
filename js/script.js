console.log("script.js loaded");

const apiKey ="Giphy Test App"
const url = `https://api.giphy.com/v1/stickers/search?api_key=${apiKey}&q=frogs&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

async function getTrendingGifs() {
  try {
    // Await the response from the fetch request
    const response = await fetch(url);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Await the JSON data
    const gifData = await response.json();

    // Process and display the GIFs
    displayGifs(gifData.data);
  } catch (error) {
    // Handle any errors that occurred during the fetch operation
    console.error("Error fetching Giphy data:", error);
  }
}

function displayGifs(gifs) {
  const gifContainer = document.getElementById('gif-container'); // Assume you have a div with this ID
  gifs.forEach(gif => {
    // For each gif, get the direct link to the image
    const gifUrl = gif.images.original.url;

    // Create an image element and set its source
    const imgElement = document.createElement('img');
    imgElement.src = gifUrl;
    imgElement.alt = gif.title;

    // Append the image to the container
    gifContainer.appendChild(imgElement);
  });
}

// Call the function to initiate the fetch operation
getTrendingGifs();