const form = document.getElementById("form");
const formInput = document.querySelector(".form-input");
const loadingGif = document.querySelector(".loading");
const output = document.querySelector(".output");

let loadingState = true;

//VIEW DATA
const viewData = e => {
  e.preventDefault();

  if (formInput.value === "") {
    showGif(false);
  } else {
    showGif(true);

    const origin = "https://en.wikipedia.org";
    const searchValue = formInput.value;
    const url = `${origin}/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${searchValue}`;

    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(showData)
      .catch(error => {
        console.log(error);
      });
  }

  formInput.value = "";
};

// display data
const showData = data => {
  const result = data.query.search;
  console.log(result);
  result.map(result => {
    const item = document.createElement("li");
    item.classList.add("output-item");
    const title = document.createElement("h3");
    title.classList.add("output-title");
    title.textContent = result.title;
    const paragraph = document.createElement("p");
    paragraph.classList.add("output-text");
    paragraph.innerHTML = result.snippet;
    const link = document.createElement("a");
    link.classList.add("output-link");
    link.textContent = "Go to source...";
    link.setAttribute(
      "href",

      `http://en.wikipedia.org/?curid=${result.pageid}`
    );
    link.setAttribute("target", "_blank");

    output.appendChild(item);
    item.appendChild(title);
    item.appendChild(paragraph);
    item.appendChild(link);

    showGif(false);
  });
};

//SHOW/HIDE LOADING GIF
const showGif = loadingState => {
  if (loadingState === true) {
    loadingGif.classList.add("show");
  } else if (loadingState === false) {
    loadingGif.classList.remove("show");
  }
};

form.addEventListener("submit", viewData);
