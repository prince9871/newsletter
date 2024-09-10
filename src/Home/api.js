const apikey = '654b8cdeff27a5b7f670ffb3668e2686';
const category = 'general'; // Change as needed
const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${apikey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const articles = data.articles;

    if (articles.length === 0) {
      console.log("No articles available.");
      return;
    }

    articles.forEach(article => {
      console.log("Title: " + article.title);
      console.log("Description: " + article.description);
      console.log("URL: " + article.url);
      
      if (article.image) {
        console.log("Image URL: " + article.image);
      }
      
      console.log('---'); // Separator between articles
    });
  })
  .catch(error => {
    console.error("Error fetching the news:", error);
  });
