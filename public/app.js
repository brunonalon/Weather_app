$(document).ready(function($) {

  $('#search-city').submit(function (){
    var city = $('#city').val();

    $.ajax({
      url : "http://autocomplete.wunderground.com/aq?cb=myCallbackFunction&query="+city,
      dataType : "jsonp",
      jsonpCallback: "myCallbackFunction",
      success : function(parsed_json) {
        
        $('#weather_app').find('table').empty();
        var table = $('<table>').addClass('city-table').appendTo('#weather_app');
        parsed_json['RESULTS'].forEach(function(city) {  
          var tr = $("<tr>").addClass('city').appendTo(table);
          $("<td>").appendTo(tr).text(city.name).click(function(){
            $('#weather_app').find('table').empty();
            $.ajax({
              url : "http://api.wunderground.com/api/0b13988d503ad266/conditions/q/"+city.name+".json",
              dataType : "jsonp",
              jsonpCallback: "myCallbackFunction",
              success : function(weather_data) {
                
                var weatherTable = $('<table>').addClass('city-table').appendTo('#weather_app')
                var weatherTr = $("<tr>").addClass('weather_data').appendTo(weatherTable);
                $("<td>").appendTo(weatherTr).text(weather_data.current_observation.weather);
                $("<td>").appendTo(weatherTr).text(weather_data.current_observation.temperature_string);
                var img = $('<img>').attr('src', weather_data.current_observation.icon_url);
                img.appendTo("<td>").appendTo(weatherTr).attr(weather_data.current_observation.temperature_string);
              }
            });


          });
          $("<td>").appendTo(tr).text(city.c);
        }); 
      }
    });
    return false;

  });

 function myCallbackFunction(data) {
    
  }

  
});
