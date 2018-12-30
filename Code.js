$(document).ready(function (e) {
    $("#tableButton").click(function () {
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
        if ($("#tableButton").html() == "Show More") {
            $("#tableButton").html("Show Less");
        }
        else {
            $("#tableButton").html("Show More")
        }


    });


    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=tech", function (json) {
        var maxColumns = 4;
        var tableRow = $("#table").append("<tr> </tr>");
        var tableRowTwo = $("#table2").append("<tr></tr>");
        var results = json["items"];
        results.sort(function (a, b) {
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
        $.each(results, function (i, item) {


            var firstChar = item.volumeInfo.title[0];
            if (firstChar >= 'A' && firstChar <= 'M') {
                tableRow = $("#table tr:last");
                tableRow.append("<td><img class ='img-responsive' src='" + item.volumeInfo.imageLinks.smallThumbnail + "' /></td>");
                if ($("#table tr:last td").length == maxColumns) {
                    $("#table").append("<tr class='tableResult'></tr>")
                }
            }
            else {
                tableRowTwo = $("#table2 tr:last");
                tableRowTwo.append("<td><img class ='img-responsive' src='" + item.volumeInfo.imageLinks.smallThumbnail + "' /></td>");
                if ($("#table2 tr:last td").length == maxColumns) {
                    $("#table2").append("<tr class='tableResult'></tr>")
                }
            }

        });

    });
});







