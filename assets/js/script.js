// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variables
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

document.addEventListener('DOMContentLoaded', function () {
  // Get the necessary elements
  const filterButtons = document.querySelectorAll('[data-select-item]');
  const projectItems = document.querySelectorAll('[data-filter-item]');
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-select-value]");

  // Function to toggle the dropdown visibility
  function elementToggleFunc(element) {
    const list = element.nextElementSibling; // assuming <ul> follows <button>
    list.style.display = list.style.display === "block" ? "none" : "block";
  }

  // Function to filter items based on the selected category
  function filterFunc(selectedValue) {
    projectItems.forEach(item => {
      const category = item.getAttribute('data-category').toLowerCase();
      if (selectedValue === 'all' || category === selectedValue) {
        item.style.display = 'block'; // Show the item
        item.classList.add('active'); // Optional: Add active class for styling
      } else {
        item.style.display = 'none';  // Hide the item
        item.classList.remove('active');
      }
    });
  }

  // Handle filtering when a category is selected via the filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      const selectedCategory = event.target.textContent.toLowerCase();

      // Update the UI to reflect the selected filter
      filterButtons.forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      selectValue.innerText = event.target.textContent; // Update dropdown value

      // Call the filter function to show relevant items
      filterFunc(selectedCategory);

      // Keep the dropdown open after selection
      elementToggleFunc(select);
    });
  });

  // Handle opening and closing of the dropdown
  select.addEventListener('click', function () {
    elementToggleFunc(select); // Toggle the dropdown visibility
  });

  // Add event listeners for each dropdown item (category)
  selectItems.forEach(item => {
    item.addEventListener('click', function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText; // Update dropdown value

      // Call the filter function to show relevant items
      filterFunc(selectedValue);

      // Update the UI to reflect the selected filter
      filterButtons.forEach(btn => btn.classList.remove('active'));
      const correspondingButton = Array.from(filterButtons).find(
        btn => btn.textContent.toLowerCase() === selectedValue
      );
      if (correspondingButton) correspondingButton.classList.add('active'); // Highlight the button if applicable

      // Keep the dropdown open after selection
      elementToggleFunc(select);
    });
  });

  // Close the dropdown if clicked outside
  document.addEventListener('click', function (event) {
    if (!select.contains(event.target)) {
      const list = select.nextElementSibling;
      list.style.display = 'none';
    }
  });
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event to all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// Get all the project link elements
var projectLinks = document.querySelectorAll(".project-link");

// Add click event to each project link to open the corresponding popup
projectLinks.forEach(function(link) {
  link.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior

    // Get the unique ID for the popup from the data attribute
    var popupId = link.getAttribute("data-popup-id");
    var modal = document.getElementById("project-popup-" + popupId); // Get the corresponding modal

    modal.style.display = "block"; // Show the popup

    // Get the project title, description, and image
    var projectTitle = link.querySelector(".project-title").textContent;
    var projectCategory = link.querySelector(".project-category").textContent;
    var projectDescription = link.querySelector(".project-description").textContent;
    var projectImage = link.querySelector("img").src;

    // Set the title and category in the modal
    modal.querySelector("h2").textContent = projectTitle;
    modal.querySelector(".project-details").textContent = projectDescription; // Set description
    modal.querySelector(".project-image").src = projectImage; // Set image
  });
});

// Close the modal when the user clicks the close button
var closeBtns = document.querySelectorAll(".close-btn");
closeBtns.forEach(function(closeBtn) {
  closeBtn.addEventListener("click", function() {
    var modal = closeBtn.closest(".popup");
    modal.style.display = "none"; // Close the modal
  });
});

// Close the modal if the user clicks anywhere outside the modal content
window.addEventListener("click", function(event) {
  var modals = document.querySelectorAll(".popup");
  modals.forEach(function(modal) {
    if (event.target === modal) {
      modal.style.display = "none"; // Close the modal if clicked outside
    }
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
