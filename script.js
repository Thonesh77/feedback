// Global variables and elements
const textareaEl = document.querySelector('.form__textarea'); // The text area where the user types the feedback
const counterEl = document.querySelector('.counter'); // Element displaying the number of characters left
const formEl = document.querySelector('.form'); // The form element
const feedbackElement1 = document.querySelector('.feedbacks'); // The container where feedback items will be appended
const submitElement1 = document.querySelector('.submit-btn'); // The submit button
const maxNrChar = 150; // Maximum number of characters allowed in the textarea

// Function to update the character count
const inputHandler = () => {
  const nrCharsTyped = textareaEl.value.length; // Get the number of characters typed in the textarea
  const charsLeft = maxNrChar - nrCharsTyped; // Calculate how many characters are left
  counterEl.textContent = charsLeft; // Update the counter display with the remaining characters
};

// Event listener to trigger input handler on each keystroke in the textarea
textareaEl.addEventListener('input', inputHandler);

// Submit handler for the form
const submitHandler = event => {
  event.preventDefault(); // Prevent the default form submission (page reload) 

  const text = textareaEl.value; // Get the feedback text typed by the user

  // Look for a hashtag in the text (assuming hashtags refer to companies)
  const hashtag = text.split(' ').find(word => word.includes('#'));
  if (hashtag) {
    const company = hashtag.substring(1); // Extract the company name from the hashtag (remove the "#")
    const badgleeter = company.charAt(0).toUpperCase(); // Capitalize the first letter of the company name
    const upvotecount = 0; // Initial upvote count (starts at 0)
    const daysAgo = 0; // Days since the feedback was posted (0 represents 'NEW')

    // Create the HTML for a new feedback item
       const feedbackinnerhtml = `
      <li class="feedback">
          <button class="upvote">
              <i class="fa-solid fa-caret-up upvote__icon"></i>
              <span class="upvote__count">${upvotecount}</span>
          </button>
          <section class="feedback__badge"> 
              <p class="feedback__letter">${badgleeter}</p> <!-- Display the first letter of the company -->
          </section>
          <div class="feedback__content">
              <p class="feedback__company">${company}</p> <!-- Display the company name -->
              <p class="feedback__text">${text}</p> <!-- Display the feedback text -->
          </div>
          <p class="feedback__date">${daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p> <!-- Display 'NEW' or days ago -->
      </li>`;

    // Reset the textarea value (clear the input field after submission)
    textareaEl.value = '';

    // Remove focus from the submit button (to prevent accidental double clicks)
    submitElement1.blur();

    // Reset the character counter to 150
    counterEl.textContent = '150';

    // Insert the new feedback item into the feedback container
    feedbackElement1.insertAdjacentHTML('beforeend', feedbackinnerhtml);
    
    // Add a class to the form to indicate a successful submission, then remove it after 2 seconds
    formEl.classList.add('form--valid');
    setTimeout(() => {
      formEl.classList.remove('form--valid');
    }, 2000); // 2000ms = 2 seconds for the animation to show
  } else {
    // If no hashtag is found in the input, mark the form as invalid
    formEl.classList.add('form--invalid');
    setTimeout(() => {
      formEl.classList.remove('form--invalid');
    }, 2000); // 2000ms = 2 seconds for the invalid animation to show
    // Focus the textarea again for the user to correct their input
    textareaEl.focus();
  }
};

// Event listener for form submission (trigger the submit handler when the form is submitted)
formEl.addEventListener('submit', submitHandler);

  fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
  .then(response => response.json())
  .then(data => {
    data.feedbacks.forEach(feedbackIteams => {
      const feedbackIteamsHTML = `
      <li class="feedback">
          <button class="upvote">
              <i class="fa-solid fa-caret-up upvote__icon"></i>
              <span class="upvote__count">${feedbackIteams.upvotecount}</span>
          </button>
          <section class="feedback__badge"> 
              <p class="feedback__letter">${feedbackIteams.badgleeter}</p> <!-- Display the first letter of the company -->
          </section>
          <div class="feedback__content">
              <p class="feedback__company">${feedbackIteams.company}</p> <!-- Display the company name -->
              <p class="feedback__text">${feedbackIteams.text}</p> <!-- Display the feedback text -->
          </div>
          <p class="feedback__date">${feedbackIteams.daysAgo === 0 ? 'NEW' : `${feedbackIteams.daysAgo}d`}</p> <!-- Display 'NEW' or days ago -->
      </li>`;
      feedbackElement1.insertAdjacentHTML('beforeend', feedbackIteamsHTML)

    });
  })
    .catch(error => {
      feedbackElement1.textContent = `failed to fetch feedback iteams . error message: ${error.message}`
  });
  
  