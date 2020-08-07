/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const menuIcon = document.getElementById("menu__link1");
const navbarList = document.querySelector("#navbar__list");
const sectionList = document.getElementsByTagName("section");
let listText = "";
let activeElement = sectionList[0];
let isScrolling;
let menuLinks;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description Animates menu icon
 * @param {object} element - An element on which animation should be performed
 */

function navbarAnimate(element) {
  element.classList.toggle("change");
}

/**
 * @description Shows menu on click
 * @param {object} element - An element on which was clicked
 */

function showNavlinks(element) {
  if (element.style.display === "block") {
    element.style.display = "none";
  } else {
    element.style.display = "block";
  }
}

/**
 * @description Computes the closest section to the current top of the website
 * @param {float} yScroll - current scroll position
 * @param {list} sections - list of sections {elements}
 */

function getNearestSection(yScroll, sections) {
  for (const sectionId in sections) {
    if (yScroll < sections[sectionId].offsetTop - 60) {
      if (sectionId === "0") {
        return sections[0];
      } else {
        return sections[sectionId - 1];
      }
    }
  }
  return sections[sections.length - 1];
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

/**
 * @description Creates an undordered list of html menu items
 * @param {string} elementData - Text of data-nav class of an element
 * @param {string} elementId - ID of the element
 * @param {string} text - Initial text on unordered list, to which items will be appended
 */

function createList(elementData, elementId, text) {
  text +=
    '<li class="li__section" id="li__' +
    elementId +
    '">' +
    // "<a href=#" +
    // elementId +
    // ">" +
    elementData +
    "</li>";
  return text;
}

// Add class 'active' to section when near top of viewport

/**
 * @description Sets element as active and clears the active setting of previous active element
 * @param {object} element - An element which should be set as active
 */

function setAsActive(element) {
  let inactiveSection;

  if (element.hasAttribute("data-nav")) {
    inactiveSection = document.querySelector("section.active");
    inactiveSection.classList.toggle("active");
  } else if (element.classList[0].includes("li__")) {
    inactiveSection = document.getElementsByClassName("li__section active");
    if (inactiveSection.length > 0) {
      inactiveSection[0].classList.toggle("active");
    }
  } else {
    return;
  }
  element.classList.toggle("active");
}

// Scroll to anchor ID using scrollTO event

/**
 * @description Scrolls to given element
 * @param {object} element - Element which it should be scrolled to
 */

function scrollToSection(element) {
  let targetContainer = document.querySelector(
    "[data-nav = '" + element.textContent + "']"
  );
  window.scrollTo({
    left: targetContainer.offsetLeft,
    top: targetContainer.offsetTop,
    behavior: "smooth",
  });
}

// add event listener on scroll and set active section

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

for (const val of sectionList) {
  listText = createList(
    val.getAttribute("data-nav"),
    val.getAttribute("id"),
    listText
  );
}

navbarList.innerHTML = listText;

menuIcon.addEventListener("click", function () {
  navbarAnimate(this);
  showNavlinks(document.getElementById("navbar__container1"));
});

// Scroll to section on link click

menuLinks = document.getElementsByClassName("li__section");

for (const menuLink of menuLinks) {
  menuLink.addEventListener("click", function () {
    scrollToSection(this);
    showNavlinks(document.getElementById("navbar__container1"));
    navbarAnimate(menuIcon);
  });
}

// initialize first section as active when the page is loaded

setAsActive(document.querySelector("#li__section1"));

// Set sections as active

window.addEventListener("scroll", function () {
  window.clearTimeout(isScrolling);

  isScrolling = setTimeout(function () {
    let scroll = window.scrollY;
    activeElement = getNearestSection(scroll, sectionList);
    setAsActive(activeElement);
    setAsActive(document.querySelector("#li__" + activeElement.id));
  }, 150);
});
