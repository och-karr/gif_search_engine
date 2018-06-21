Search = React.createClass({

    getInitialState() {
        return {
            searchingText: ''
        };
    },

    handleChange: function(event) {
        var searchingText = event.target.value; //wartość zdarzenia otrzymujemy
        //wchodząc kolejno do kluczy : target->value 
        //target ??
        //value -> z inputa
        this.setState({searchingText: searchingText}) //aktualizujemy stan mając wartość z wyżej
        if (searchingText.length > 2) { //warunek, który sprawdza czy wpisywany tekst ma więcej niż 2 litery
            this.props.onSearch(searchingText);
        }
    },

    handleKeyUp: function(event) {
        if (event.keyCode === 13) {//metoda rozpoznaje, że wciśnięty klawisz to enter
            this.props.onSearch(this.state.searchingText); //wysyła wiadomość do rodzica, 
            //aby ten jeszcze raz uruchomił funkcję wysyłającą zapytanie po gifa
        }
    },

    render: function() {
        var styles = {
            fontSize: '1.5em',
            width: '90%',
            maxWidth: '350px'
        };

        return <input
            type="text"
            onChange={this.handleChange}
            //onChange - wartość stanu (?)
            onKeyUp={this.handleKeyUp} //nasłuchiwanie na odkliknięcie
            placeholder="Tutaj wpisz wyszukiwaną frazę"
            style={styles}
            value={this.state.searchTerm} //searchTerm ???
            //value - trzyma wartość stanu a nie tego co wwpisał
            //użytkownik!
        />
    }
});