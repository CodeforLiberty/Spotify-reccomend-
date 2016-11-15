console.log(0);
var getFromApi = function(endpoint, query) {
    console.log(4.1);
    var url = 'https://api.spotify.com/v1/' + endpoint; //'https://api.spotify.com/v1/search?foo=bar&a=b'

    var queryString = Qs.stringify(query);
    if (queryString) {
        url += '?' + queryString;
    }
    console.log(4.2);
    return fetch(url).then(function(response) {
        console.log(5);
        if (response.status < 200 || response.status >= 300) {
            return Promise.reject(response.statusText);
        }
        console.log(6);
        return response.json(); //returns a promise with status and value
    });

};

// What is a promise?
// - Object.
// - { then: function(), catch: function() }
// - { sayHello: function() }


var artist;
console.log(1);
var getArtist = function(name) {
    var param = {
      q:name,
      limit:1,
      type: 'artist'
    };

    return getFromApi('search', param).then(function (json) {  
        artist = json.artists.items[0];
        return artist;
    });

    console.log(3);
   // getFromApi('search', param).then(function(json){ //json is  promise.value
      console.log(7);
      
    console.log(json.artists.items);
    
  //}).catch(function(err) {
    console.log(err);
//});
    console.log(4.5);
    //return getFromApi()
  };
//console.log(2);

