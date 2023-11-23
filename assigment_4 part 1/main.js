// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array)
{
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// 2. RAW TEXT STRINGS


const insertx = ["Willy the Goblin", "Big Daddy", "Father Christmas"];

const inserty = ["the soup kitchen", "Disneyland", "the White House"];

const insertz = ["spontaneously combusted", "melted into a puddle on the sidewalk", "turned into a slug and crawled away"];



// 3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);
xItem = randomValueFromArray(insertx);
yItem = randomValueFromArray(inserty);
zItem = randomValueFromArray(insertz);

const storyText = "It was 94 fahrenheit outside, so " + xItem + " went for a walk. When they got to " + yItem + ", they stared in horror for a few moments, then " + zItem + ". Bob saw the whole thing, but was not surprised — " + xItem + " weighs 300 pounds, and it was a hot day.";


function result() {

  newStory = storyText;

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);

  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300/14) + " stone"; // covert pounds to stones
    const temperature =  Math.round((94-32)*5/9) + " centigrade"; // convert F to C
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 fahrenheit", temperature);

  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}
