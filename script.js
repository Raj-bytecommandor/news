
const API_KEY = "ed191422e6b74f87bbc2491b4175404a";  
const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const newsContainer = document.getElementById("news-container");
const refreshButton = document.getElementById("refresh-news");

async function fetchNews() {
 
  newsContainer.innerHTML = "<p>Loading news articles...</p>";
  
  try {
    
    const response = await fetch(BASE_URL);
    const data = await response.json();

    if (data.status === "ok") {
      displayNews(data.articles);  
    } else {
      
      newsContainer.innerHTML = `<p>Sorry, something went wrong: ${data.message}</p>`;
    }
  } catch (error) {
   
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = "<p>Oops! Something went wrong. Please try again later.</p>";
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = "";  

  if (articles.length === 0) {
   
    newsContainer.innerHTML = "<p>No news articles found at the moment. Please try again later.</p>";
    return;
  }

  
  articles.forEach(article => {
    const articleDiv = document.createElement("div");
    articleDiv.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description || "No description available."}</p>
      <a href="${article.url}" target="_blank">Read full article</a>
    `;
    newsContainer.appendChild(articleDiv);
  });
}


refreshButton.addEventListener("click", fetchNews);
