"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  console.log("storyList", storyList);
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

// TODO: modify this function to show Fav Stars - DONE, and Delete Button based on Boolean of currentUser variable
// init currentUser as null
function generateStoryMarkup(story) {
  console.debug("generateStoryMarkup");

  const hostName = story.getHostName();

  const loggedUser = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
      ${loggedUser ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

function getStarHTML(story, currentUser) {
  const isFavorite = currentUser.isFavorite(story);
  // console.log("isFavorite", isFavorite);
  const favStar = isFavorite ? "fas" : "far";

  return `
    <span class="star">
      <i class="${favStar} fa-star"></i>
    </span>
  `;
}

const deleteBtnHtml = () => `
  // some html
`;

// TODO: delete story
// remove story from the array and dom
// dependent on user storylist.

// DONE: submit new story
// 1. collect form data
// 2. create instance of storyList.addStory
// 3. generateStoryMarkup()
// 4. append to all stories list
// 5. hide form and reset form
async function handleSubmitNewStory(e) {
  console.debug("handleSubmitNewStory", e);
  e.preventDefault();

  const title = $("#new-title").val();
  const author = $("#new-author").val();
  const url = $("#new-url").val();
  const data = { title, author, url };
  // console.log(data, currentUser.loginToken);
  const story = await storyList.addStory(currentUser, data);

  // console.log(story);

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $submitStoryForm.slideUp("slow");
  $submitStoryForm.trigger("reset");
}

$submitStoryForm.on("submit", handleSubmitNewStory);

// TODO: display User's story lists
//currentUser.ownStories
//do something

// TODO: display User favorite stories
//currentUser.favorite
// do something

const putFavStoriesOnPage = () => {
  console.debug("putFavStoriesOnPage");

  $favStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  if (currentUser.favorites.length !== 0) {
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favStoriesList.append($story);
    }
  } else {
    $favStoriesList.append(
      `<h1>${currentUser.name} has no favorite story</h1>`
    );
  }

  $favStoriesList.show();
};

// TODO: toggle story favorite stars on and off
// toggle star style
// modify fav story list by currentUser.addFavorite or currentUser.removeFavorite methods

function favStarToggle(e) {
  console.debug("favStarToggle");

  const $target = $(e.target);
  // console.log($target);
  const closestLi = $target.closest("li");
  const storyId = closestLi.attr("id");
  const story = storyList.stories.find((story) => story.storyId === storyId);

  if ($target.hasClass("far")) {
    // await currentUser.addFavorite(story);
    $target.closest("i").toggleClass("far fas");
  } else {
    // await currentUser.removeFavorite(story);
    $target.closest("i").toggleClass("fas far");
  }
}

$storiesList.on("click", ".star", favStarToggle);
