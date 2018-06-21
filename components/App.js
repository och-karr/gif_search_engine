App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '', //klucz, który odbierany jest od komponentu Search
            gif: {}
        };
    },

    getGif: function(searchingText, callback) {  // 1.
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
        var xhr = new XMLHttpRequest();  // 3.
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
               var data = JSON.parse(xhr.responseText).data; // 4.
                var gif = {  // 5.
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);  // 6.
            }
        };
        xhr.send();
    },

    handleSearch: function(searchingText) {  // 1.
        this.setState({
            loading: true  // 2.
        });
        this.getGif(searchingText, function(gif) {  // 3.
            this.setState({  // 4
                loading: false,  // a
                gif: gif,  // b
                searchingText: searchingText  // c
            });
        }.bind(this));
    },

    /*  1. pobierz na wejściu wpisywany tekst searchnigText
        2. zasygnalizuj, że zaczął się proces ładowania,
        3. Rozpocznij pobieranie gifa,
        4. Na zakończenie pobierania:
            a. przestań sygnalizować ładowanie,
            b. ustaw nowego gifa z wyniku pobierania,
            c. ustaw nowy stan dla wyszukiwanego tekstu. */

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

