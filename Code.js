const maxColumns = 4;
const maxLinkColumns = 3;
function insertBookInRow(table, item) {
    var author = item.volumeInfo.authors != null && item.volumeInfo.authors.length > 0 ? item.volumeInfo.authors[0].substr(0, 17) : "";
    var title = item.volumeInfo.title != null ? item.volumeInfo.title.substr(0, 17) : "";
    var smallThumbnail = item.volumeInfo.imageLinks.smallThumbnail;

    //if the last td size is more than 4, create another row
    if (table.find("tr:last td").length == maxColumns) {
        //create new row if >4 td
        table.append("<tr class='tableResult'></tr>");
    }
    else {
        // show button if table2 td is >5
        // $('tableButton').style.visibility = 'visible';
    }
    let tableRow = table.find("tr:last");
    tableRow.append(
        "<td>" +
        "<div class='card'>" +
        //gets json image and place the image inside the last tr
        "<img class ='img-responsive img-rounded' src='" + smallThumbnail + "' />" +
        "<div class='card-body'>" +
        //gets title of the book
        "<h5 class='card-title'> " + title + "</h5>" +
        //gets author of the book
        "<p class='card-text' >" + "<b>by</b> " + author + "</p>" +
        "</div>" +
        "</div>" +
        "</td>");
    }

    function insertLinkIntoFooter(table, item) {
        var title = item.volumeInfo.title != null ? item.volumeInfo.title.substr(0, 17) : "";
        var footerLink = item.volumeInfo.previewLink;
    
        //if the last td size is more than 3, create another row
        if (table.find("tr:last td").length == maxLinkColumns) {
            //create new row if >3 td
            table.append("<tr></tr>");
        }
     
        let tableRow = table.find("tr:last");
        tableRow.append(
             //footer
                "<td>" +
                "<a href='" + footerLink + "'>" + title + "</a>" +
                "</td>");
        }
    

function UpdateButtonState(table, button) {
    // Iterating table rows
    table.find("tr").each(function (i, row) {
        if (i != 0) {
            if (button.html() == "Show Less") {
                $(row).hide();
            }
            else {
                $(row).show();
            }
        }
    });
    // Changing button state
    if (button.html() == "Show More") {
        button.html("Show Less");
    }
    else {
        button.html("Show More")
    }
}

$(document).ready(function (e) {
    //button one handling
    $("#tableButton").click(function () {
        UpdateButtonState($("#table"), $(this));
    });
    //button two handling
    $("#tableButtonRow2").click(function () {
        UpdateButtonState($("#table2"), $(this));
    });
    //getting jason
    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=tech", function (json) {
        //calling my json function, and getting all the items inside the json and placeing json items inside "items" variable
        //sorting titles 
        var items = json["items"];
        items.sort(function (a, b) {
            if (a.volumeInfo.title == b.volumeInfo.title) {
                return 0;
            }
            if (a.volumeInfo.title < b.volumeInfo.title) {
                return -1;
            }
            if (a.volumeInfo.title > b.volumeInfo.title) {
                return 1;
            }
        });
        var footerLink = $("#footerTable");
        var firstChar = null;

        //for each item in json items place the item into the assigned row depenging on the if statement
        $.each(items, function (i, item) {
            firstChar = item.volumeInfo.title[0].toLowerCase();
            if (firstChar >= 'a' && firstChar <= 'm') {

                insertBookInRow($("#table"), item);
            }
            else {

                insertBookInRow($("#table2"), item);
            }
            //footer
            insertLinkIntoFooter(footerLink,item);

        });

    });
});






