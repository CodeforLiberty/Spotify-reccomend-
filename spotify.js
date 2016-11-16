var getFromApi = function(endpoint, query) {
    var url = 'https://api.spotify.com/v1/' + endpoint; //'https://api.spotify.com/v1/search?foo=bar&a=b'

    var queryString = Qs.stringify(query);
    if (queryString) {
        url += '?' + queryString;
    }

    return fetch(url).then(function(response) {
        if (response.status < 200 || response.status >= 300) {
            return Promise.reject(response.statusText);
        }
        return response.json(); //returns a promise with status and value
    });
};

// What is a promise?
// - Object.
// - { then: function(), catch: function() }
// - { sayHello: function() }


var artist;
var getArtist = function(name) {
    var param = {
      q:name,
      limit:1,
      type: 'artist'
    };

    return getFromApi('search', param).then(function (json) {
        artist = json.artists.items[0];
        var artistId = json.artists.items[0].id;
        var url = `artists/${artistId}/related-artists`;

        var firstPromise = getFromApi(url);
        var secondPromise = getFromApi(url);
        var thirdPromise = getFromApi(url);

          return Promise.all([firstPromise, secondPromise, thirdPromise]);
        })allPromise.then(function(promiseResults) {
          console.log(promiseResults);
            artist.related=promiseResults[0].artists;
            return artist;
        })
    .catch(function(err) {
    });
  };
