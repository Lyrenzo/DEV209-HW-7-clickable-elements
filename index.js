// Define NoteArray to store music notes
let NoteArray = [];

// Define NoteObject constructor function
let NoteObject = function (pArtist, pAlbumName, pAlbumYear, pRating, pYoutubeID) {
    this.artist = pArtist;
    this.albumName = pAlbumName;
    this.albumYear = pAlbumYear;
    this.rating = pRating;
    this.youtubeID = pYoutubeID; // Added youtubeID property
}

// Page creation event handler
$(document).on("pagecreate", function () {
    // Click event handler for list items
    $(document).on("click", "#myul li", function () {
        var index = $(this).index();
        displayDetail(index);
    });

    // Click event handler for adding new music
    $(document).on("click", "#buttonAdd", function () {
        var artist = $("#artistInput").val();
        var albumName = $("#albumInput").val();
        var albumYear = $("#yearInput").val();
        var rating = $("#select-type").val();
        var youtubeLink = $("#youtubeLinkInput").val(); // Get YouTube link

        // Extract YouTube video ID from the link
        var youtubeID = extractYouTubeID(youtubeLink);

        // Create new NoteObject and push to NoteArray
        NoteArray.push(new NoteObject(artist, albumName, albumYear, rating, youtubeID));

        // Clear input fields after adding
        $("#artistInput").val("");
        $("#albumInput").val("");
        $("#yearInput").val("");
        $("#select-type").val(""); // Reset rating dropdown
        $("#youtubeLinkInput").val(""); // Clear YouTube link input

        // Update the list
        createList();
    });
});

// Function to extract YouTube video ID from the link
function extractYouTubeID(link) {
    var videoID = '';

    // Regex to match YouTube video ID
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = link.match(regExp);

    if (match && match[2].length === 11) {
        videoID = match[2];
    }

    return videoID;
}

// Function to create and update the list
function createList() {
    var myul = $("#myul");
    myul.empty(); // Clear the content of the list

    // Filter out entries with null ratings
    var filteredNoteArray = NoteArray.filter(function(element) {
        return element.rating !== null;
    });

    // Iterate through filteredNoteArray and append to list
    filteredNoteArray.forEach(function (element, index) {
        var li = $("<li>").html("Artist: " + element.artist + " - Album: " + element.albumName + " - Year: " + element.albumYear + " - Rating: " + element.rating);
        myul.append(li);
    });

    // Refresh the listview
    if (myul.hasClass('ui-listview')) {
        myul.listview("refresh");
    } else {
        myul.trigger('create');
    }
}

// Function to display music details
function displayDetail(index) {
    var selectedItem = NoteArray[index];
    $("#detailPageContent").html("<p>Artist: " + selectedItem.artist + "</p>" +
                                 "<p>Album: " + selectedItem.albumName + "</p>" +
                                 "<p>Year: " + selectedItem.albumYear + "</p>" +
                                 "<p>Rating: " + selectedItem.rating + "</p>" +
                                 // Embed YouTube video
                                 '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + selectedItem.youtubeID + '" frameborder="0" allowfullscreen></iframe>'
                                );
    $.mobile.changePage("#detailPage", { transition: "slide" });
}

// Pagebeforeshow event handler for the 'add' page
$(document).on("pagebeforeshow", "#add", function () {
    // Any initialization logic for the add page can go here
});

// Pagebeforeshow event handler for the 'show' page
$(document).on("pagebeforeshow", "#show", function () {
    createList();
});
