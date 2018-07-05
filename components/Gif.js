var GIPHY_LOADING_URL = 'http://www.ifmo.ru/images/loader.gif';
var styles = {
    minHeight: '310px',
    margin: '0.5em'
};

Gif = React.createClass({
    getUrl: function() { //adres strony z gifem
        return this.props.sourceUrl || GIPHY_LOADING_URL;
    },
    render: function() {
        var url = this.props.loading ? GIPHY_LOADING_URL : this.props.url;  //adres samego obrazka
        //url jest ustawiane na GIPHY_LOADING_URL gdy this.props.loading===true
        //gdy this.props.loading===false - ustawiany jest this.props.url


        return (
            <div style={styles}>
                <a href={this.getUrl()} title='view this on giphy' target='new'>
                    <img id='gif' src={url} style={{width: '100%', maxWidth: '350px'}}/>
                </a>
            </div>
        );
    }
});