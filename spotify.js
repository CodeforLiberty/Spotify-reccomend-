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
      // id: '1uNFoZAHBGtllmzznpCI3s'
    };

    return getFromApi('search', param).then(function (json) {
        artist = json.artists.items[0];
        console.log(json.artists.items[0].id);
        var artistId = json.artists.items[0].id;
       
        // }); 
         // var getRelatedArtist = (function(id){
         var url = `artists/${artistId}/related-artists`;
          
         //  // get the artist ID from the initial getFromApi function and hook it
         //  var artistId = json.artists.items[0].id;
         //  console.log(artistId);
          // into this function
    //     return getRelatedArtist()
    // }).then(function(artists){
          // Set artist.related to item.artists
          // Then return artist object i.e return artist;
          // getRelatedArtist();

          return getFromApi(url);
        }).then(function(item) {
            console.log(item);
            artist.related=item.artists;
            return artist;
        })
    .catch(function(err) {
      console.log("what???");
    });
  }


getArtist('Justin');
// getRelatedArtist(artistId);

// asyncthing.then(
//     return something).
//     then()