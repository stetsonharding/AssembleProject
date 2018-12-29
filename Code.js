$(document).ready(function (e) {

     
    
    $.getJSON("https://www.googleapis.com/books/v1/volumes?q=tech", function (json) {
        var maxColumns = 4;
        var tableRow = $("#table").append("<tr class='first'></tr>");
        var tableRowTwo = $("#table2").append("<tr class='first'></tr>");
        var results = json["items"];
        results.sort(function (a,b) {
            if(a.volumeInfo.title == b.volumeInfo.title){
                return 0;
            }
            if(a.volumeInfo.title < b.volumeInfo.title){
                return -1;
            }
            if(a.volumeInfo.title > b.volumeInfo.title){
                return 1;
            }
        });
        $.each(results, function (i, item) {
            tableRow = $("#table tr:last");
            tableRowTwo = $("#table2 tr:last");
            var firstChar = item.volumeInfo.title[0];
            if (firstChar >= 'A' && firstChar <= 'M') {
                tableRow.append("<td><img class ='img-responsive' src='" + item.volumeInfo.imageLinks.smallThumbnail + "' /></td>");
                if ($("#table tr:last td").length == maxColumns) {
                    $("#table").append("<tr></tr>")
                }
            }
            else {
                tableRowTwo.append("<td><img class ='img-responsive' src='" + item.volumeInfo.imageLinks.smallThumbnail + "' /></td>");
                if ($("#table2 tr:last td").length == maxColumns) {
                    $("#table2").append("<tr></tr>")
                }
            }
        
        });

});
});


function myFunction() {
    var x = document.getElementsByClassName("first");
    if (x.style.display = "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }




