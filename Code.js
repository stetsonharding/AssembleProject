$(document).ready(function (e) {
    //button one handling
    $("#tableButton").click(function () {
        // Iterating table rows
        $("#table tr").each(function (i, row) {
            if (i != 0) {
                if ($("#tableButton").html() == "Show Less") {
                    $(row).hide();
                }
                else {
                    $(row).show();
                }
            }
        });
        // Changing button state
        if ($("#tableButton").html() == "Show More") {
            $("#tableButton").html("Show Less");
        }
        else {
            $("#tableButton").html("Show More")
        }
    });

    //button two handling
    $("#tableButtonRow2").click(function () {
        // Iterating table rows
        $("#table2 tr").each(function (i, row) {
            if (i != 0) {
                if ($("#tableButtonRow2").html() == "Show Less") {
                    $(row).hide();
                }
                else {
                    $(row).show();
                }
            }
        });
        // Changing button state
        if ($("#tableButtonRow2").html() == "Show More") {
            $("#tableButtonRow2").html("Show Less");
        }
        else {
            $("#tableButtonRow2").html("Show More")
        }
    });

    //getting jason
    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=tech", function (json) {
        var maxColumns = 4;
        //calling my table(s) and placing table row(s), inside the tables.
        var tableRow = $("#table").append("<tr> </tr>");
        var tableRowTwo = $("#table2").append("<tr></tr>");
        
        //calling my json function, and getting all the items inside the json and placeing json items inside "items" variable
        //sorting titles ****QUESTION****
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
        //for each item in json items place the item into the assigned row depenging on the if statement
        $.each(items, function (i, item) {
            var firstChar = item.volumeInfo.title[0].toLowerCase();
            if (firstChar >= 'a' && firstChar <= 'm') {
                tableRow = $("#table tr:last");
                tableRow.append(
                    "<td>" +
                    "<div class='card'>" +
                    //gets json image and place the image inside the last tr
                    "<img class ='img-responsive' src='" + item.volumeInfo.imageLinks.smallThumbnail + "' />" +
                    "<div class='card-body'>" +
                    //gets title of the book
                    "<h5 class='card-title'> " + item.volumeInfo.title.substr(0, 17) + "</h5>" +
                    //gets author of the book
                    "<p class='card-text'>" + item.volumeInfo.authors[0] + "</p>" +
                    "</div>" +
                    "</div>" +
                    "</td>");
                //if the last td size is more than 4, create another row
                if ($("#table tr:last td").length == maxColumns) {
                    $("#table").append("<tr class='tableResult'></tr>")
                }
            }
            else {
                //find the last tr in table 2 and place image, title, and author in it.
                //If the td is more than 4, create another row.
                tableRowTwo = $("#table2 tr:last");
                tableRowTwo.append(
                    "<td>" +
                    "<div class='card'>" +
                    "<img class ='img-responsive' src='" + item.volumeInfo.imageLinks.smallThumbnail + "' />" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'> " + item.volumeInfo.title.substr(0, 17) + "</h5>" +
                    "<p class='card-text'>" + item.volumeInfo.authors[0].substr(0, 17) + "</p>" +
                    "</div>" +
                    "</div>" +
                    "</td>");

                if ($("#table2 tr:last td").length == maxColumns) {
                    $("#table2").append("<tr class='tableResult'></tr>")
                }

            }

            //footer
           var footerLink = $("#footerUnorderedList");
            footerLink.append(
                 "<li>" +
                "<a href='" + item.volumeInfo.previewLink + "'>"+item.volumeInfo.title+"</a>" +
                 "</li>");
        });

    });
});







