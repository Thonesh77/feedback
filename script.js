// Global 
const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackElement1 = document.querySelector('.feedbacks');
const submitElement1 = document.querySelector('.submit-btn')
const maxNrChar = 150; // Maximum characters allowed

const inputHandler = () => {
  const nrCharsTyped = textareaEl.value.length;
  const charsLeft = maxNrChar - nrCharsTyped;
  counterEl.textContent = charsLeft;
};

textareaEl.addEventListener('input', inputHandler);

// Submit section 
const submitHandler = event => {
  event.preventDefault();

  const text = textareaEl.value;

  const hashtag = text.split(' ').find(word => word.includes('#'));
  if (hashtag) {
    const company = hashtag.substring(1);
    const badgleeter = company.charAt(0).toUpperCase(); // Capitalize first letter
    const upvotecount = 0;
    const daysAgo = 0; // Example value for days ago

    const feedbackinnerhtml = `
      <li class="feedback">
          <button class="upvote">
              <i class="fa-solid fa-caret-up upvote__icon"></i>
              <span class="upvote__count">${upvotecount}</span>
          </button>
          <section class="feedback__badge"> 

              <p class="feedback__letter">${badgleeter}</p>
          </section>
          <div class="feedback__content">
              <p class="feedback__company">${company}</p>
              <p class="feedback__text">${text}</p>
          </div>
          <p class="feedback__date">${daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>

      </li>`;
    
    textareaEl.value = '';
     
    submitElement1.blur();

    counterEl.textContent = '150';

    feedbackElement1.insertAdjacentHTML('beforeend', feedbackinnerhtml);
    
    formEl.classList.add('form--valid');
    setTimeout(() => {
      formEl.classList.remove('form--valid');
    }, 2000); // Set a duration for the timeout (in milliseconds)
  } else {
    formEl.classList.add('form--invalid');
    setTimeout(() => {
      formEl.classList.remove('form--invalid');
    }, 2000); // Set a duration for the timeout (in milliseconds)
    textareaEl.focus();
  }
};

formEl.addEventListener('submit', submitHandler);
