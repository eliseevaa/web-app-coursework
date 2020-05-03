var url = 'http://newsapi.org/v2/everything?' +
    'q=online courses;public-speaking;&' +
    'from=2020-0502&' +
    'sortBy=popularity&' +
    'apiKey=78c620b4a14942c2b4983728d24cc0e9';

var req = new Request(url);
var articlesData;

fetch(req)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        var articles = data.articles;
        for (var i in articles) {
            if (!articles[i].id) {
                articles[i].id = Math.random().toString(36).substring(2, 15);
            }
        }
        articlesData = articles;
        populateArticleSection(articlesData);
    });

function makeUniqueIdForArticle(article) {
    return "article_" + article.id;
}

function populateArticleSection(articles) {
    //assigning a div (comments-carousel-id) where the data is going to be populated
    var newsSection = document.getElementById('news-section-id');

    //creating a div for each article in the carousel  
    articles.forEach(function (article) {
        var articleDiv = document.createElement("div");
        articleDiv.id = makeUniqueIdForArticle(article);
        articleDiv.classList.add("article");
        newsSection.appendChild(articleDiv);

        console.log(article);

        var articleDetailsElement = document.createElement("div");
        articleDetailsElement.classList.add("article-details");
        articleDiv.appendChild(articleDetailsElement)

        var articleImage = document.createElement("img");
        articleImage.classList.add("article-image");
        articleImage.src = article.urlToImage;
        articleDetailsElement.appendChild(articleImage);

        var articleBodyDetailsElement = document.createElement("div");
        articleBodyDetailsElement.classList.add("article-body");
        articleDetailsElement.appendChild(articleBodyDetailsElement)

        var articleBodyTitleDetailsElement = document.createElement("div");
        articleBodyTitleDetailsElement.classList.add("title-author");
        articleBodyDetailsElement.appendChild(articleBodyTitleDetailsElement)

        var a = document.createElement('a');
        a.title = article.title;
        a.href = article.url;
        articleBodyTitleDetailsElement.appendChild(a);

        var articleTitle = document.createElement("h4")
        articleTitle.classList.add("article-title");
        articleTitle.textContent = article.title;
        a.appendChild(articleTitle);

        var articleAuthor = document.createElement("p")
        articleAuthor.classList.add("article-author");
        articleAuthor.textContent = article.author;
        articleBodyTitleDetailsElement.appendChild(articleAuthor);

        var articleDescription = document.createElement("p")
        articleDescription.classList.add("article-description");
        articleDescription.textContent = article.description;
        articleBodyTitleDetailsElement.appendChild(articleDescription);

        var articleDate = document.createElement("p");
        articleDate.classList.add("date");
        var date = new Date(article.publishedAt);
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
        articleDate.textContent = "Published: " + `${da} ${mo} ${ye}`;
        articleBodyDetailsElement.appendChild(articleDate);


    });
}

// setup search

// listen to changes in the search form
var searchInput = document.querySelector(".search");
searchInput.addEventListener("input", updateSearchValue);

// initial search value, which will be empty
var searchValue = "";

// check what search term has been entered
function updateSearchValue() {
    // trim() removes any spaces before/after the input
    searchValue = searchInput.value.trim();

    // loop through all elements
    // show or hide each one based on the search term
    var articleDivs = document.querySelectorAll(".article");
    articleDivs.forEach(showOrHideArticle);
}

// every time the text field changes, run this
function showOrHideArticle(articleDiv) {
    // if no search value is set, show the articles
    if (searchValue.length === 0) {
        articleDiv.classList.remove("hide");
    } else {
        // get the title of the article from its article element
        // first find the article

        for (var key in articlesData) {
            var article = articlesData[key];

            if (makeUniqueIdForArticle(article) === articleDiv.id) {
                // found matching article, now check its data
                if (checkArticleMatchesSearchQuery(article, searchValue)) {
                    articleDiv.classList.remove("hide");
                } else {
                    articleDiv.classList.add("hide");
                }
                break;
            }
        }
    }
}

function checkArticleMatchesSearchQuery(article, searchValue) {
    // search is based on 3 criteria, and we are looking for an OR match

    // first check title match
    if (checkDataPropertyContainsSearchValue(article.title, searchValue)) {
        return true;
    }

    // next, check author name match
    if (checkDataPropertyContainsSearchValue(article.author, searchValue)) {
        return true;
    }

    // last, check description match
    if (checkDataPropertyContainsSearchValue(article.description, searchValue)) {
        return true;
    }

    // no match, return false
    return false;
}

function checkDataPropertyContainsSearchValue(dataProperty, searchValue) {
    return dataProperty && dataProperty.toLowerCase().includes(searchValue.toLowerCase());

    if (dataProperty) {
        if (dataProperty.toLowerCase().includes(searchValue.toLowerCase())) {
            return true;
            
        } else {
            return false
        };

    } else {
        return false
    };
}