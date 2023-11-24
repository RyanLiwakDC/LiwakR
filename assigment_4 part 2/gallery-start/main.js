const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageArray = ['images/pic1.jpg', 'images/pic2.jpg', 'images/pic3.jpg', 'images/pic4.jpg', 'images/pic5.jpg'];

/* Declaring the alternative text for each image file */
const altTexts = {
    'pic1.jpg': 'Alternative text for image 1',
    'pic2.jpg': 'Alternative text for image 2',
    'pic3.jpg': 'Alternative text for image 3',
    'pic4.jpg': 'Alternative text for image 4',
    'pic5.jpg': 'Alternative text for image 5'
};

/* Looping through images */

imageArray.forEach(imageFilename => 
{
    // Creates the image elements
    const newImage = document.createElement('img');

    // Set the source and alternate atributes
    newImage.setAttribute('src', imageFilename);
    newImage.setAttribute('alt', altTexts[imageFilename]);

    // Append the new image element to the thum-bar
    thumbBar.appendChild(newImage);

    // Add a click event listener to each <img> inside the thumb-bar <div> so that,
    // when they are clicked, the corresponding image and alternative text are displayed 
    //in the displayed-img <img> element.
    newImage.addEventListener('click', () => {
        displayedImage.src = imageFilename;
        displayedImage.alt = altTexts[imageFilename];
    });

});

/* Wiring up the Darken/Lighten button */
// Add click event listener to the button
btn.addEventListener('click', () => {
    // Toggle the 'overlay' to darken
    overlay.classList.toggle('overlay');
});
