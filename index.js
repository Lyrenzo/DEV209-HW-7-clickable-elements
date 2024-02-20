let NoteArray = [];

let NoteObject = function (pArtist, pAlbumName, pAlbumYear, pRating) {
    this.artist = pArtist;
    this.albumName = pAlbumName;
    this.albumYear = pAlbumYear;
    this.rating = pRating;
}

$(document).on("pagecreate", function () {
    $(document).on("click", "#myul li", function () {
        var index = $(this).index();
        displayDetail(index);
    });

    $(document).on("click", "#buttonAdd", function () {
        var artist = $("#artistInput").val();
        var albumName = $("#albumInput").val();
        var albumYear = $("#yearInput").val();
        var rating = $("#select-type").val();

        NoteArray.push(new NoteObject(artist, albumName, albumYear, rating));

        // Clear input fields after adding
        $("#artistInput").val("");
        $("#albumInput").val("");
        $("#yearInput").val("");
        $("#select-type").val(""); // Reset rating dropdown

        createList(); // Update the list
    });
});

function createList() {
    var myul = $("#myul");
    myul.empty(); // Clear the content of the list

    // Filter out entries with null ratings
    var filteredNoteArray = NoteArray.filter(function(element) {
        return element.rating !== null;
    });

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

function displayDetail(index) {
    var selectedItem = NoteArray[index];
    $("#detailPageContent").html("<p>Artist: " + selectedItem.artist + "</p>" +
                                 "<p>Album: " + selectedItem.albumName + "</p>" +
                                 "<p>Year: " + selectedItem.albumYear + "</p>" +
                                 "<p>Rating: " + selectedItem.rating + "</p>");
    $.mobile.changePage("#detailPage", { transition: "slide" });
}

$(document).on("pagebeforeshow", "#add", function () {
    // Any initialization logic for the add page can go here
});

$(document).on("pagebeforeshow", "#show", function () {
    createList();
});
