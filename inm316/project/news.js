// // initial set up of the third party API
// var url = 'http://newsapi.org/v2/everything?' +
//     'q=Apple&' +
//     'from=2020-07-08&' +
//     'sortBy=popularity&' +
//     'apiKey=78c620b4a14942c2b4983728d24cc0e9';

var url = 'https://raw.githubusercontent.com/eliseevaa/web-app-coursework/master/inm316/project/data/news-data.json'

var req = new Request(url);
var articlesData;

// make the data for accessible and manipulative 
fetch(req)
    .then((response) => response.json())
    .then((data) => {
        var articles = data.articles;
        // create a key for each articles 
        // we need these, since the data doesn't have any unique ids
        for (var key in articles) {
            if (!articles[key].id) {
                // random string to use as id
                articles[key].id = Math.random().toString(36).substring(2, 15);
            }
        }
        articlesData = articles;
        console.log(articlesData);
        populateArticleSection();
    });

//make a unique id for the article div
function makeUniqueIdForArticle(article) {
    return "article_" + article.id;
}

// populate articles into carousel below
function populateArticleSection() {

    //assign a div (news-section-id) where the data is going to be populated
    var newsSection = document.getElementById('news-section-id');

    //creat a div for each article in the new section
    articlesData.forEach(function (article) {
        var articleDiv = document.createElement("div");
        // create unique id for article div so we can find the data from the UI ids
        articleDiv.id = makeUniqueIdForArticle(article);
        // add a class to article div
        articleDiv.classList.add("article");
        // add article div within the news section div
        newsSection.appendChild(articleDiv);

        //create a div for each article details in the article div
        var articleDetailsElement = document.createElement("div");
        articleDetailsElement.classList.add("article-details");
        articleDiv.appendChild(articleDetailsElement)

        //create a div for each article image in the article details div
        var articleImage = document.createElement("img");
        articleImage.classList.add("article-image");
        articleImage.src = article.urlToImage;
        articleDetailsElement.appendChild(articleImage);

        //create a div for each article body in the article details div
        var articleBodyDetailsElement = document.createElement("div");
        articleBodyDetailsElement.classList.add("article-body");
        articleDetailsElement.appendChild(articleBodyDetailsElement)

        //create a div for each article title area in the article body div
        var articleBodyTitleDetailsElement = document.createElement("div");
        articleBodyTitleDetailsElement.classList.add("title-author");
        articleBodyDetailsElement.appendChild(articleBodyTitleDetailsElement)

        // add a link to the article title
        var a = document.createElement('a');
        a.title = article.title;
        a.href = article.url;
        //creat a div for each article link in the article title-text area div
        articleBodyTitleDetailsElement.appendChild(a);

        //create a div for each article title in the article link
        var articleTitle = document.createElement("h4")
        articleTitle.classList.add("article-title");
        articleTitle.textContent = article.title;
        a.appendChild(articleTitle);

        //create a div for each article author in the article title-text area div
        var articleAuthor = document.createElement("p")
        articleAuthor.classList.add("article-author");
        articleAuthor.textContent = article.author;
        articleBodyTitleDetailsElement.appendChild(articleAuthor);

        //create a div for each article description in the article title-text area div
        var articleDescription = document.createElement("p")
        articleDescription.classList.add("article-description");
        articleDescription.textContent = article.description;
        articleBodyTitleDetailsElement.appendChild(articleDescription);

        //create a div for each article date in the article body div
        var articleDate = document.createElement("p");
        articleDate.classList.add("date");
        //localise the date
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
var searchInput = document.querySelector(".search-input");
searchInput.addEventListener("input", updateSearchValue);

// initial search value, which will be empty
var searchValue = "";

// handle when search bar value changes
function updateSearchValue() {
    // trim() removes any spaces before/after the input
    searchValue = searchInput.value.trim();

    // loop through all elements
    // show or hide each one based on the search term
    var articleDivs = document.querySelectorAll(".article");
    articleDivs.forEach(showOrHideArticle);
}

// every time the text field changes, run this for every article div to update its visibility
function showOrHideArticle(articleDiv) {
    // if no search value is set, show all divs
    if (searchValue.length === 0) {
        articleDiv.classList.remove("hide");
    } else {
        // get the id of the article from its article element

        // first find the article by the unique id
        for (var key in articlesData) {
            var article = articlesData[key];

            //match the div's id with the article id to see a match
            if (makeUniqueIdForArticle(article) === articleDiv.id) {

                // found matching article, now check its data
                if (checkArticleMatchesSearchQuery(article, searchValue)) {
                    // search matches, show article div
                    articleDiv.classList.remove("hide");
                } else {
                    // search doesnt match, hide article div
                    articleDiv.classList.add("hide");
                }
                break;
            }
        }
    }
}

// checks article properties for a match with the search value
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

// lowercase data property and search value to allow for comparison 
// this is done, since includes is case-sensitive, i.e. 'String' doesn't contain 'string'
function checkDataPropertyContainsSearchValue(dataProperty, searchValue) {
    // sometimes dataProperty can be undefined, so we have to check if it is there first
    // check if lowercased data property contains search value
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