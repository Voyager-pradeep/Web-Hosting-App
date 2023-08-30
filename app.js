//Event listener for sign up form
const cards = document.querySelectorAll(".cards-main");
const form = document.getElementById("my-form");
cards.forEach(function (card) {
  card.addEventListener("click", function () {
    form.classList.add("active");
  });
});
const closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", function () {
  form.classList.add("fade");
  form.classList.remove("active");
});
//Event listener for modal slider
const sliderModal = document.getElementById("slider");
const modalBtns = document.querySelectorAll(".form-btn");
modalBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    sliderModal.classList.add("actives");
    event.stopPropagation();
  });
});
const modalClr = document.querySelector(".modal-clr");
modalClr.addEventListener("click", function () {
  sliderModal.classList.add("fade");
  sliderModal.classList.remove("actives");
});

// fetching data from json file to slider
let cardTitle = document.querySelector(".ct-slider");
let cardPrice = document.querySelector("#rupees");
let cardList = document.querySelectorAll(".info-list");
let cardButton = document.querySelector(".slide-btn");

const prevBtn = document.querySelector("#slide-left");
const nextBtn = document.querySelector("#slide-right");

let currentItem = 0;
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    let cardLength = data.cards.length;

    showSlider(data.cards);

    nextBtn.addEventListener("click", function () {
      currentItem++;
      if (currentItem > cardLength - 1) {
        currentItem = 0;
      }
      showSlider(data.cards);
    });
    prevBtn.addEventListener("click", function () {
      currentItem--;
      if (currentItem < 0) {
        currentItem = cardLength - 1;
      }
      showSlider(data.cards);
    });
  });

function showSlider(data) {
  let item = data[currentItem];
  // console.log(item);
  cardTitle.innerHTML = item.header;
  cardPrice.textContent = item.price;
  cardList[0].textContent = item.li1;
  cardList[1].textContent = item.li2;
  cardList[2].textContent = item.li3;
  cardList[3].textContent = item.li4;
  cardButton.innerHTML = item.button;
}

//sending form data to api endpoint
const formData = document.getElementById("my-formdata");
formData.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(formData);
  console.log(Array.from(data));
  try {
    // const res = await fetch("https://forms.maakeetoo.com/formapi/182", { //could not able to fetch data to maakeetoo.com
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: data,
      // mode: "no-cors",
    });
    const resData = await res.json();
    console.log(resData);
  } catch (err) {
    console.log(err.message);
  }
});

//creating news cards from api
let cardscontainer = document.getElementById("cards-container");
window.addEventListener("load", async function () {
  fetch("https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json")
    .then((response) => response.json())
    .then((data) => {
      let articles = data.articles;
      display(articles);
    });
  function display(datas) {
    let datasinfo = datas.map(function (data) {
      const date = new Date(data.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      });
      if (!data.urlToImage) return;
      return `<article id="template-news-card">
      <a href="${data.url}" class="data-url" target="_blank">
      <div class="news-card">
      <div class="news-card-header">
      <img src="${data.urlToImage}" alt="news-image" id="news-img">
      </div>
      <div class="card-content">
      <h3 id="news-title">${data.title}</h3>
      <h6 class="news-source" id="news-source">${data.source.name} · ${date}</h6>
      <p class="news-desc" id="news-desc">${data.content}</p>
      </div>
      </div>
        </a>
        </article>`;
    });
    datasinfo = datasinfo.join("");
    cardscontainer.innerHTML = datasinfo;
  }
});

//creating ecom card which will load after user reached the end point.....
let ecomcontainer = document.getElementById("ecom-container");
function displayEcom(datas) {
  let datasinfo = datas.map(function (data) {
    if (!data.image) return;
    return `<div class="ecom-card">
    <img src="${data.image}" alt="Product Image" class="product-image">
    <h2 class="product-title">${data.title}</h2>
    <p class="product-price">$${data.price}</p>
    <button class="add-to-cart">Add to Cart</button>
  </div>`;
  });
  datasinfo = datasinfo.join("");
  ecomcontainer.innerHTML = datasinfo;
}
// Check if the user has scrolled to the bottom of the page
function isPageBottom() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}
// Lazy load API JSON data when the user reaches the bottom
function lazyLoadApiData() {
  if (isPageBottom()) {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        displayEcom(data);
      })
      .catch((error) => {
        console.error("Error loading API data:", error);
      });
    window.removeEventListener("scroll", lazyLoadApiData);
  }
}
window.addEventListener("scroll", lazyLoadApiData);
