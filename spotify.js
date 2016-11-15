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


var artist;
console.log(1);
var getArtist = function(name) {
    var param = {
      q:name,
      limit:1,
      type: 'artist'
    };
    console.log(3);
    getFromApi('search', param).then(function(json){ //json is  promise.value
      console.log(7);
      // artist = item.artists.items[0];
      return artist;
    });
    console.log(4.5);

  };
console.log(2);
getArtist('green day');
