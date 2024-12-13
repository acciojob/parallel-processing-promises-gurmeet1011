//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images =[
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to load a single image and return a promise
function loadImage(image) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;

    img.onload = () => resolve(img); // Resolve the promise with the image element
    img.onerror = () => reject(`Failed to load image's URL: ${image.url}`); // Reject the promise with an error message
  });
}

// Add event listener to the button
btn.addEventListener("click", () => {
  // Show a loading message
  output.innerHTML = "Loading images...";

  // Use Promise.all to download all images in parallel
  const imagePromises = images.map(loadImage);

  Promise.all(imagePromises)
    .then((loadedImages) => {
      // Clear the loading message
      output.innerHTML = "";

      // Display all the downloaded images
      loadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      // Handle any errors that occur during image loading
      output.innerHTML = `<p style="color: red;">${error}</p>`;
    });
});

