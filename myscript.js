$(document).ready(function (){
  populateButtons(topics,'searchButton','#buttonsArea');
});

$(document).on('submit','#target',function(event){
  var value = $("#category").val();
  appendButtons(value);
  event.preventDefault();
});

$(document).on('click','.searchButton',function(){
    var query = $(this).text();
    queryUrl = "http://api.giphy.com/v1/gifs/search?q="+query+"&api_key=2PoSXMoW84SUfK2QJ2TXYPMO93V9g2h1&limit=10";
    callGiphy(queryUrl);
});


var queryUrl = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=2PoSXMoW84SUfK2QJ2TXYPMO93V9g2h1&limit=10";
function callGiphy(queryUrl){
  $.ajax({url:queryUrl,method:'GET'})
      .done(function(response) {
        console.log(response);
        var searchDiv = $('#searches');
        searchDiv.empty();
        for(i=0;i<response.data.length;i++){
          var img = $('<img>');
          var animated = response.data[i].images.original.url;
          img.attr('src',animated);
          searchDiv.append(img);
        }
  });
};

var topics = ['Dog','Cat','Bird'];
function populateButtons(topics,classtoAdd,areaToAddTo){
  $("#buttonsArea").empty();
  for(var i=0;i<topics.length;i++){
    var a = $('<button>');
    a.addClass(classtoAdd);
    a.attr('data-type',topics[i]);
    a.text(topics[i]);
    $(areaToAddTo).append(a);
  }
}

function appendButtons(value){
  if(value==''){
    return;
  }
  topics.push(value);
  populateButtons(topics,'searchButton','#buttonsArea');
}
