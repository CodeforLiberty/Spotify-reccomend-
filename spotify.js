var getFromApi = (endpoint, query) => {
    
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
        type:'artist',
        country: 'US'
    };

    
    return getFromApi('search', query).then((res) => {
        artist = res.artists.items[0];

        
        return getFromApi(`artists/${res.artists.items[0].id}/related-artists`).then((res) => {
            var container = [];
            var allPromises = Promise.all(container);
            
            artist.related = res.artists;
            
            console.log(res.artists[0].id);
            console.log(artist.related)
            
            for (let i = 0 ; i<artist.related.length; i++) {
                
                container[i] = getFromApi(`artists/${res.artists[i].id}/top-tracks`,query);
                
                console.log(container);
            
            }


            getFromApi(`artists/${res.artists[0].id}/top-tracks`,query).then((Artist) => {
                
                console.log(Artist);

                return allPromises.then( (res) => {
                   
                    console.log(artist.related);
                    console.log(res);
                    console.log(Artist.tracks);
                    console.log(res[0].tracks);

                    res[0].tracks = Artist.tracks[0];
                    
//loop through each res item and set it's track property to res.tracks
                    for(let a= 0; a<res.length; a++) {
                        
                        res[a].tracks = Artist.tracks;
                        
                        console.log(res[0]);


                    }
                });
            });
        });
    });
    console.log(artist);
   
    return artist;
};

      //so why does it matter if pass on the promise further?
      //how would I pass in the top tracks request and have the program continue running



