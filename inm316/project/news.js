var url = 'http://newsapi.org/v2/everything?' +
    'q=presentation skills&' +
    'from=2020-04-27&' +
    'sortBy=popularity&' +
    'apiKey=78c620b4a14942c2b4983728d24cc0e9';

var req = new Request(url);

fetch(req)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        populateArticleSection(data.articles);
    });

function makeUniqueIdForArticle(comment) {
    return "article_" + comment.id;
}

function populateArticleSection(articles) {
    //assigning a div (comments-carousel-id) where the data is going to be populated
    var newsSection = document.getElementById('news-section-id');

    //creating a div for each article in the carousel  
    articles.forEach(function (article) {
        var articleElement = document.createElement("div");
        articleElement.id = makeUniqueIdForArticle(article);
        articleElement.classList.add("article");
        newsSection.appendChild(articleElement);
    });
}
