const sendQuery = async (event) => {
  event.preventDefault();

  const message = document.getElementById("message");
  const showList = document.getElementById("shows");

  message.innerHTML = "";
  showList.inerHTML ="";

  const textToSearch = document.getElementById("query").value;

  const url = `https://api.tvwaze.com/search/shows?q=${textToSearch}`;

  const response = await fetch(url);

  if(!response.ok){
    menssage.innerHTML = "Failed to fetch results.";
    return;
  }

  const showFetched = await response.json();

  if(showFetched.length === 0){
    menssagem.innerHTML = "Not found.";
    return;
  }

  showFetched.forEach((item) =>{
    const showName = item?.show?.name;
    const showPictureURL = item?.show?.image?.medium ||'';

    showList.insertAdjacentElement("beforeend",`
        <li>
            <img class="poster" src="${showPictureURL}" />
            <span class="show-name">${showName}</span>
        </li>
    `);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById("search-form")
    .addEventListener("submit", sendQuery);
});
