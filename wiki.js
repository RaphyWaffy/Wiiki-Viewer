/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function() {
  'use strict';
  $('#mysearch').keypress(function(e) {
    if (e.which == 13) { //Enter key pressed
      $('#look').click(); //Trigger search button click event
    }
  });

  $("#look").click(function() {
    var search = $("#mysearch").val();
    var wikiPage = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + search + "&prop=revisions&rvprop=content&format=json&callback=?";

    $.getJSON(wikiPage, function(data) {
      var totalhits = data.query.searchinfo.totalhits;
      $('#master').empty();

      if (data.query.searchinfo.totalhits === 0) {
        $('#master').append('<div class="head"><h1>The page ' + search + ' does not exist. You can ask for it to be created.There were no results matching the query.</h1></div>')
      }

      for (var i = 0; i < 10 && i < totalhits; i++) {
        if (data.query.searchinfo.totalhits === 0) {
          $('#master').append('<div class="head"><h1>The page ' + search + ' does not exist. You can ask for it to be created.There were no results matching the query.</h1></div>')
          break;
        } else {
          var title = data.query.search[i].title.replace(/\s+/g, '');
          var ref = "<a href=" + 'https://en.wikipedia.org/wiki/' + title + ">" + data.query.search[i].title + "</a></br>";
          $("#master").hide().append("<div class='results'>" + ref + data.query.search[i].snippet + "..." + "</div>").fadeIn(400);
        }
      };

      if (totalhits > 10) {
        $('#master').append('<div class="head"><a href="https://en.wikipedia.org/w/index.php?search=' + search + '&title=Special:Search&profile=default&fulltext=1&searchToken=3ddfhnvbpt5er6plxi6b8ng65"><h1>More Results</h1></a></div>')


      }
    });
  });
});
