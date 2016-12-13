var getFromApi = (endpoint='search', query={q:'Twiztid',limit:1,type:'artist'}) => {
    let url = 'https://api.spotify.com/v1/' + endpoint;

    let queryString = Qs.stringify(query);
    if (queryString) {
        url += '?' + queryString;
    }

    return fetch(url).then((response) => {
        if (response.status < 200 || response.status >= 300) {
            return Promise.reject(response.statusText);
        }
        return response.json();
    });
};


var artist;
const getArtist = (name) => {
    const query = {
        q:name,
        limit:1,
        type:'artist'
    };

    
   return getFromApi('search',query).then((response) => {
    artist = response.artists.items[0];
    console.log(artist);
    return artist;

        console.log(response);
    }).catch((err) => {
        console.log("Not getting a response, did you type in a artist?");
    });
   };