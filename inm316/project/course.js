// initial setup: add a listener to buttons
var cardButtonElementsGlobal = document.querySelectorAll(".card-button");
cardButtonElementsGlobal.forEach(addCardButtonListener);

//show the card-details of the first button by default 
updateUISelectingButton(cardButtonElementsGlobal[0]);

// adding listener
function addCardButtonListener(cardButtonElement) {
    cardButtonElement.addEventListener("click", handleCardButtonClick);
}

// event handling
function handleCardButtonClick(event) {
    // event current target is our button, so pass it down
    var clickedButton = event.currentTarget;
    updateUISelectingButton(clickedButton)
}

// UI update depending on selected button passed as an argument
function updateUISelectingButton(button) {
    
    // first update the buttons

    // remove selected state from all buttons
    cardButtonElementsGlobal.forEach(clearClickedButtonState);

    // add selected state just to the clicked button
    button.classList.add("currently-selected-button");


    // next update the details divs visibility

    // generate ids for each button and set instructions as to what the id is
    var detailsElementIdSelector = button.id;
    var detailsElementId = "div" + detailsElementIdSelector;

    // find this element details by id
    var detailsElement = document.getElementById(detailsElementId);

    // remove selected state from all details elements
    var cardDetailElements = document.querySelectorAll(".card-details");
    cardDetailElements.forEach(clearCardDetailState);

    // add selected state back selected details element
    detailsElement.style.display = "block"
}

// clear selected state from a button
function clearClickedButtonState(cardButtonElement) {
    cardButtonElement.classList.remove("currently-selected-button");
}

// clear selected state from detail element
function clearCardDetailState(cardDetailElement) {
    console.log(cardDetailElement)
    cardDetailElement.style.display = "none"
}


// Initialize and add the map. This function gets executed when google script for embedding map finishes loading
// so we can proceed to map setup having google.maps available
function initMap() {
    console.log("map loaded")

    let center = { lat: 50, lng: 0 };
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 3, center: center });


    // once the map finishes loading, load the comments data and update the map with markers
    // load comments data
    var commentsJSON = loadCommentsData();

    // once compete, proceed to showing markers for each comment on a newly created map
    showMarkersForComments(commentsJSON, map);

    // once compete, proceed to pupulating comments carousel with comments data below the map
    populateCommentsCarousel(commentsJSON);
}

function loadCommentsData() {
    // access to local files is disabled by google browser for some reason, 
    // so I decided to save this as a variable and then convert it to JavaScript object
    var jsonString = "[{\"id\":1,\"author\":{\"first-name\":\"Willem\",\"last-name\":\"Dickinson\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/415829\/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":10,\"lng\":10}},\"text\":\"If you're visiting this page, you're likely here because you're searching for a random sentence.\",\"date\":158791000},{\"id\":2,\"author\":{\"first-name\":\"Leanne\",\"last-name\":\"Ortiz\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/614810\/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":20,\"lng\":20}},\"text\":\"Sometimes a random word just isn't enough, and that is where the random sentence generator comes into play.\",\"date\":158792000},{\"id\":3,\"author\":{\"first-name\":\"Jardel\",\"last-name\":\"Fletcher\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/2379005\/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":30,\"lng\":30}},\"text\":\"By inputting the desired number, you can make a list of as many random sentences as you want or need.\",\"date\":158793000},{\"id\":4,\"author\":{\"first-name\":\"Darryl\",\"last-name\":\"Roberts\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/2128807\/pexels-photo-2128807.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":40,\"lng\":40}},\"text\":\"Producing random sentences can be helpful in a number of different ways.\",\"date\":158794000},{\"id\":5,\"author\":{\"first-name\":\"Mylie\",\"last-name\":\"Levy\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/2120114\/pexels-photo-2120114.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":50,\"lng\":50}},\"text\":\"For writers, a random sentence can help them get their creative juices flowing.\",\"date\":158795000},{\"id\":6,\"author\":{\"first-name\":\"Astrid\",\"last-name\":\"Wong\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/2100063\/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":60,\"lng\":60}},\"text\":\"Since the topic of the sentence is completely unknown, it forces the writer to be creative when the sentence appears.\",\"date\":158796000},{\"id\":7,\"author\":{\"first-name\":\"Ifan\",\"last-name\":\"Cross\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/2092474\/pexels-photo-2092474.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":70,\"lng\":70}},\"text\":\"There are a number of different ways a writer can use the random sentence for creativity.\",\"date\":158797000},{\"id\":8,\"author\":{\"first-name\":\"Joseph\",\"last-name\":\"Lopez\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/2092709\/pexels-photo-2092709.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":80,\"lng\":80}},\"text\":\"The most common way to use the sentence is to begin a story.\",\"date\":158798000},{\"id\":9,\"author\":{\"first-name\":\"Woodrow\",\"last-name\":\"Valenzuela\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/2169434\/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":90,\"lng\":90}},\"text\":\"Another option is to include it somewhere in the story.\",\"date\":158799000},{\"id\":10,\"author\":{\"first-name\":\"Diana\",\"last-name\":\"Krause\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/1222271\/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":100,\"lng\":100}},\"text\":\"A much more difficult challenge is to use it to end a story.\",\"date\":1587910000},{\"id\":11,\"author\":{\"first-name\":\"Arwel\",\"last-name\":\"Blaese\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/733872\/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":110,\"lng\":110}},\"text\":\"In any of these cases, it forces the writer to think creatively since they have no idea what sentence will appear from the tool.\",\"date\":1587911000},{\"id\":12,\"author\":{\"first-name\":\"Justine\",\"last-name\":\"Atherton\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/2218786\/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":120,\"lng\":120}},\"text\":\"For those writers who have writers' block, this can be an excellent way to take a step to crumbling those walls.\",\"date\":1587912000},{\"id\":13,\"author\":{\"first-name\":\"Mehmet\",\"last-name\":\"Krueger\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/1239288\/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":130,\"lng\":130}},\"text\":\"By taking the writer away from the subject matter that is causing the block, a random sentence may allow them to see the project they're working on in a different light and perspective.\",\"date\":1587913000},{\"id\":14,\"author\":{\"first-name\":\"Aahil\",\"last-name\":\"Acevedo\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/2232981\/pexels-photo-2232981.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":140,\"lng\":140}},\"text\":\"Sometimes all it takes is to get that first sentence down to help break the block.\",\"date\":1587914000},{\"id\":15,\"author\":{\"first-name\":\"Kayne\",\"last-name\":\"Contreras\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/428364\/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":150,\"lng\":150}},\"text\":\"It can also be successfully used as a daily exercise to get writers to begin writing.\",\"date\":1587915000},{\"id\":16,\"author\":{\"first-name\":\"Ian\",\"last-name\":\"Pope\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/1239291\/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":160,\"lng\":160}},\"text\":\"Being shown a random sentence and using it to complete a paragraph each day can be an excellent way to begin any writing session.\",\"date\":1587916000},{\"id\":17,\"author\":{\"first-name\":\"Alena\",\"last-name\":\"Brock\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/1081685\/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":170,\"lng\":170}},\"text\":\"Random sentences can also spur creativity in other types of projects being done.\",\"date\":1587917000},{\"id\":18,\"author\":{\"first-name\":\"Sumaiyah\",\"last-name\":\"Harper\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/1988681\/pexels-photo-1988681.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":180,\"lng\":180}},\"text\":\"If you are trying to come up with a new concept, a new idea or a new product, a random sentence may help you find unique qualities you may not have considered.\",\"date\":1587918000},{\"id\":19,\"author\":{\"first-name\":\"Moses\",\"last-name\":\"Castro\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/2598024\/pexels-photo-2598024.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":190,\"lng\":190}},\"text\":\"Trying to incorporate the sentence into your project can help you look at it in different and unexpected ways than you would normally on your own.\",\"date\":1587919000},{\"id\":20,\"author\":{\"first-name\":\"Joanne\",\"last-name\":\"Blanchard\",\"profile-pic-url\":\"https:\/\/images.pexels.com\/photos\/2167673\/pexels-photo-2167673.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=100\",\"location\":{\"lat\":200,\"lng\":200}},\"text\":\"It can also be a fun way to surprise others.I really liked this course!!!\",\"date\":1587920000}]";
    return JSON.parse(jsonString);
}

// create markers for each of the comments
function showMarkersForComments(comments, map) {
    comments.forEach(
        function (comment) {
            //set marker positions equal to author's location
            var marker = new google.maps.Marker({ position: comment.author.location, map: map });
            // set a listener on click event 
            // click - interaction that requests a particular comment to be revealed on a marker click
            marker.addListener('click', function () {
                // on click, pan the map to the clicked marker
                map.panTo(marker.getPosition());
                // call these functions to update UI
                scrollToFocusComment(comment);
                updateUISelectingComment(comment);
            });
        }
    );
}

// create a scrolling bahaviour for comments section to respond to a marker click
function scrollToFocusComment(comment) {
    // find requested comment by id 
    var commentElement = document.getElementById(makeUniqueIdForComment(comment));
    // scroll so that comment becomes visible
    commentElement.scrollIntoView({behavior: "smooth"});
}

// update UI (the outline) of comments to indicate selection
function updateUISelectingComment(commentData) {
    
    // find all comment elements 
    var commentElements = document.querySelectorAll(".comment")

    // remove selected state from all comments
    commentElements.forEach(clearCommentFocusState);

    // find respective comment div for this commentData
    var selectedCommentElement = document.getElementById(makeUniqueIdForComment(commentData));

    // add selected state just to the focused comment
    selectedCommentElement.classList.add("currently-selected-comment");
}

// remove selected state from focused comment
function clearCommentFocusState(commentElement) {
    commentElement.classList.remove("currently-selected-comment");
}

// create unique id for comment divs to be able to have relationships between comment and div
function makeUniqueIdForComment(comment) {
    return "comment_" + comment.id;
}

// populate comments into carousel below
function populateCommentsCarousel(comments) {
    //assigning a div (comments-carousel-id) where the data is going to be populated
    var commentsCarousel = document.getElementById('comments-carousel-id');

    //creating a div for each comment in the carousel  
    comments.forEach(function(comment) {
        var commentElement = document.createElement("div");
        // create unique id for comment div
        commentElement.id = makeUniqueIdForComment(comment);
        // add a class to comment element div
        commentElement.classList.add("comment");
        // add comment element div within the carousel div
        commentsCarousel.appendChild(commentElement);
        
        console.log(comment)

        //create a div for each comment-details in the commentElement div
        var commentDetailsElement = document.createElement ("div");
        commentDetailsElement.classList.add("comment-details");
        commentElement.appendChild(commentDetailsElement);

        //create a div for each comment-icon-name in the commentDetailsElement div
        var commentIconNameElement = document.createElement ("div");
        commentIconNameElement.classList.add("comment-icon-name");
        commentDetailsElement.appendChild(commentIconNameElement);

        //create a div for each comment photo in the commentIconNameElement div
        var commentPhoto = document.createElement("img");
        commentPhoto.classList.add("profile-image");
        commentPhoto.src = comment.author["profile-pic-url"];
        commentIconNameElement.appendChild(commentPhoto);

        //create a div for each Author first name in the commentIconNameElement div
        var commentAuthorFirstName = document.createElement("label");
        commentAuthorFirstName.classList.add("label-text");
        commentAuthorFirstName.textContent = comment.author["first-name"];
        commentIconNameElement.appendChild(commentAuthorFirstName);
        
        //create a div for each Author last name in the commentIconNameElement div
        var commentAuthorLastName = document.createElement("label");
        commentAuthorLastName.classList.add("label-text");
        commentAuthorLastName.textContent = comment.author["last-name"];
        commentIconNameElement.appendChild(commentAuthorLastName);

        //create a div for each comment text and date in the commentDetailsElement div
        var commentParDate = document.createElement ("div");
        commentParDate.classList.add("comment-p-date");
        commentDetailsElement.appendChild(commentParDate);
        
        //create a div for each comment text in the commentParDate div
        var commentText = document.createElement("p")
        commentText.classList.add("comment-text");
        commentText.textContent = comment.text;
        commentParDate.appendChild(commentText);
        
        //create a div for each comment date in the commentParDate div
        var commentDate = document.createElement("p");
        commentDate.classList.add("date");
        // localise the date
        var formattedDate = new Date(comment.date).toLocaleDateString("en-UK")
        commentDate.textContent = "Date: " + formattedDate;
        commentParDate.appendChild(commentDate);
    });
}   