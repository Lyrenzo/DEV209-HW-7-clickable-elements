let NoteArray = [];

let NoteObject = function (pData, pType, pPriority, pRating) {
    this.data = pData;
    this.type = pType;
    this.priority = pPriority;
    this.rating = pRating;
}

$(document).on("pagecreate", function () {
    $(document).on("click", "#listPageItems li", function () {
        var index = $(this).index();
        displayDetail(index);
    });

    $(document).on("click", "#buttonAdd", function () {
        var artist = $("#artistInput").val();
        var albumName = $("#albumInput").val();
        var albumYear = $("#yearInput").val();
        var rating = $("#select-type").val();

        NoteArray.push(new NoteObject(albumName, artist, albumYear, rating));

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
        var li = $("<li>").html(element.priority + ":  " + element.type + "   " + element.data + " - Rating: " + element.rating);
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
    $("#detailPageContent").html("<p>Data: " + selectedItem.data + "</p>" +
                                 "<p>Type: " + selectedItem.type + "</p>" +
                                 "<p>Priority: " + selectedItem.priority + "</p>" +
                                 "<p>Rating: " + selectedItem.rating + "</p>");
    $.mobile.changePage("#detailPage", { transition: "slide" });
}

$(document).on("pagebeforeshow", "#addPage", function () {
    selectedType = "";
});

$(document).on("pagebeforeshow", "#listPage", function () {
    createList();
});