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

        console.log(article);

        var articleDetailsElement = document.createElement ("div");
        articleDetailsElement.classList.add("article-details");
        articleElement.appendChild(articleDetailsElement)

        var articleImage = document.createElement("img");
        articleImage.classList.add("article-image");
        articleImage.src = article.urlToImage;
        articleDetailsElement.appendChild(articleImage);

        var articleBodyDetailsElement = document.createElement ("div");
        articleBodyDetailsElement.classList.add("article-body");
        articleDetailsElement.appendChild(articleBodyDetailsElement)

        var articleBodyTitleDetailsElement = document.createElement ("div");
        articleBodyTitleDetailsElement.classList.add("title-author");
        articleBodyDetailsElement.appendChild(articleBodyTitleDetailsElement)
        
        var articleTitle= document.createElement("h4")
        articleTitle.classList.add("article-title");
        articleTitle.textContent = article.title;
        articleBodyTitleDetailsElement.appendChild(articleTitle);

        var articleAuthor= document.createElement("p")
        articleAuthor.classList.add("label-text");
        articleAuthor.textContent = article.author;
        articleBodyTitleDetailsElement.appendChild(articleAuthor);

        var articleDescription= document.createElement("p")
        articleDescription.classList.add("article-description");
        articleDescription.textContent = article.description;
        articleBodyTitleDetailsElement.appendChild(articleDescription);

        var articleDate = document.createElement("p");
        articleDate.classList.add("date");
        // var formattedDate = new Date(comment.date).toLocaleDateString("en-UK")
        articleDate.textContent = "Date: " + article.publishedAt;
        articleBodyDetailsElement.appendChild(articleDate);

        

    });
}

tool(article);

function tool(article) {
    link.title = articleTitle.textContent;
  }



