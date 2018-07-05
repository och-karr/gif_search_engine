var GIPHY_PUB_KEY = '1Teuf4HE3Am9l34XCe2OjsdOQbmXrER8';
var GIPHY_API_URL = 'https://api.giphy.com';

App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '', //klucz, który odbierany jest od komponentu Search
            gif: {}
        };
    },

    getGif: function(searchingText, callback) {  
    // Na wejście metody getGif przyjmujemy dwa parametry: 
    //wpisywany tekst (searchingText) i funkcję, która ma 
    //się wykonać po pobraniu gifa (callback)
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        // Konstruujemy adres URL dla API Giphy
        var xhr = new XMLHttpRequest();  
        // Wywołujemy całą sekwencję tworzenia 
        //zapytania XHR do serwera i wysyłamy je.
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
               var data = JSON.parse(xhr.responseText).data; 
               // W obiekcie odpowiedzi mamy obiekt z danymi. 
               //W tym miejscu rozpakowujemy je sobie do zmiennej data, 
               //aby nie pisać za każdym razem response.data.
                var gif = { 
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                //Układamy obiekt gif na podstawie tego 
                //co otrzymaliśmy z serwera (data)
                callback(gif);  
                //Przekazujemy obiekt (gif) do funkcji callback, 
                //którą przekazaliśmy jako drugi parametr metody getGif.
            }
        };
        xhr.send();
    },

    handleSearch: function(searchingText) {  //pobierz na wejściu wpisywany tekst
        this.setState({
            loading: true  //zasygnalizuj, że zaczął się proces ładowania,
        });
        this.getGif(searchingText, function(gif) {  //Rozpocznij pobieranie gifa
            this.setState({  // Na zakończenie pobierania:
                loading: false,  // przestań sygnalizować ładowanie
                gif: gif,  // ustaw nowego gifa z wyniku pobierania
                searchingText: searchingText  // ustaw nowy stan dla wyszukiwanego tekstu
            });
        }.bind(this)); //aby zachować kontekst
    },

    render: function() {

        var styles = { //obiekt styles
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            //przypisujemy obiekt styles do właściwości style
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. 
                Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search 
                    onSearch={this.handleSearch}
                />
                <Gif
                    loading={this.state.loading}//stan - info czy gif jest ładowany
                    url={this.state.gif.url}//jego bezpośredni adres url
                    sourceUrl={this.state.gif.sourceUrl}//adres do strony z gifem
                />
            </div>
        );
    }
});

