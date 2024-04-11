
const dropdowns = document.querySelectorAll(".dropdown-container"),
  inputLanguageDropdown = document.querySelector("#input-language"),
  outputLanguageDropdown = document.querySelector("#output-language"),
  translateButton = document.getElementById('translate-button'),
  inputTextElem = document.querySelector("#input-text"),
  outputTextElem = document.querySelector("#output-text");

function populateDropdown(dropdown, options) {
  dropdown.querySelector("ul").innerHTML = "";
  options.forEach((option) => {
    const li = document.createElement("li");
    const title = option.name + " (" + option.native + ")";
    li.innerHTML = title;
    li.dataset.value = option.code;
    li.classList.add("option");
    dropdown.querySelector("ul").appendChild(li);
  });
}
document.addEventListener("DOMContentLoaded", function() {
  document.addEventListener("mousemove", function(e) {
    createParticle(e);
  });
});

function createParticle(e) {
  const particle = document.createElement("div");
  particle.className = "particle";
  particle.style.left = e.pageX + "px";
  particle.style.top = e.pageY + "px";
  document.querySelector(".cursor-particles").appendChild(particle);
  
  // Remove particle after animation
  setTimeout(function() {
    particle.remove();
  }, 1000);
}

function translate() {
  const inputText = inputTextElem.value;
  const inputLanguage = inputLanguageDropdown.querySelector('.selected').dataset.value;
  const outputLanguage = outputLanguageDropdown.querySelector('.selected').dataset.value;
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(inputText)}`;

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      outputTextElem.value = json[0].map((item) => item[0]).join('');
      // Reattach the event listener after translation
      translateButton.addEventListener('click', translate);
    })
    .catch((error) => {
      console.log(error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  // Populate dropdowns
  populateDropdown(inputLanguageDropdown, languages);
  populateDropdown(outputLanguageDropdown, languages);
  
  // Function to refresh the animation
  function refreshAnimation() {
    const element = document.querySelector('.fade-in-text');
    // Remove and re-add the class to trigger the animation refresh
    element.classList.remove('refresh');
    void element.offsetWidth; // Trigger reflow
    element.classList.add('refresh');
  }

  // Call the function every 6 seconds
  setInterval(refreshAnimation, 6000);

  // Add event listeners for dropdowns
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      dropdown.classList.toggle("active");
    });

    dropdown.querySelectorAll(".option").forEach((item) => {
      item.addEventListener("click", (e) => {
        //remove active class from current dropdowns
        dropdown.querySelectorAll(".option").forEach((item) => {
          item.classList.remove("active");
        });
        item.classList.add("active");
        const selected = dropdown.querySelector(".selected");
        selected.innerHTML = item.innerHTML;
        selected.dataset.value = item.dataset.value;
      });
    });
  });

  // Event listener to close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  });

  // Event listener for translate button click
  translateButton.addEventListener('click', translate);
});
const darkModeCheckbox = document.getElementById("dark-mode-btn");

darkModeCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

const swapBtn = document.querySelector(".swap-position"),
  inputLanguage = inputLanguageDropdown.querySelector(".selected"),
  outputLanguage = outputLanguageDropdown.querySelector(".selected");

swapBtn.addEventListener("click", (e) => {
  const temp = inputLanguage.innerHTML;
  inputLanguage.innerHTML = outputLanguage.innerHTML;
  outputLanguage.innerHTML = temp;

  const tempValue = inputLanguage.dataset.value;
  inputLanguage.dataset.value = outputLanguage.dataset.value;
  outputLanguage.dataset.value = tempValue;

  // Swap text
  const tempInputText = inputTextElem.value;
  inputTextElem.value = outputTextElem.value;
  outputTextElem.value = tempInputText;
});
const inputChars = document.querySelector("#input-chars");

inputTextElem.addEventListener("input", (e) => {
  inputChars.innerHTML = inputTextElem.value.length;
});
