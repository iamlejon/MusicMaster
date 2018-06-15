import React, {Component} from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        let FETCH_URL = BASE_URL + 'q=' + this.state.query +'&type=artist&limit=1';
        const ALBUM_URL = 'https://api.spotify.com/v1/artists/';
        var accessToken = 'BQBpgGPFDIqGRcPKQ7M9USRJFTLdktAh_BwnfoKuhVG_ou9QI9xmJvyGFgWoaT2ZOkUI04dup_NkdoHIQuvDi_SAU50UudxjbtfY66uzflaXLWiIAwjwDYGJy41ubGaqFx3Q9VRIdykGgVzJEy9O6ebLdLRKSPlZ&refresh_token=AQB-YoeTE7bKTuQYWzEwa15aq2UDqtKxQ0lpgk74xqWHmfGxerMlp_8xnXMX5xojAudU1ntBcWvron1UCwMR2JshkDELEnkLrd5UHunzT12g8ma_uR01dC1oriwR-PgXUno'
        var myHeaders = new Headers();

        var myOptions = {
            method: 'GET',
             headers: {
                 'Authorization': 'Bearer ' + accessToken
             },
             mode: 'cors',
             cache: 'default'
        };

        fetch(FETCH_URL, myOptions)
        .then(response => response.json())
        .then(json => {
            const artist = json.artists.items[0];
            console.log('artist', artist);
            this.setState({artist});

            FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
            fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                console.log('artist\'s top tacks:', json);
                const {tracks} = json;
                this.setState({tracks});
            })
        });
    }
    render() {
        return (
        <div className="App">
            <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                        type="text"
                        placeholder="Search for an Artist"
                        value={this.state.query}
                        onChange={event => {this.setState({query: event.target.value})}}
                        onKeyPress={event => {
                            if (event.key === 'Enter') {
                                this.search()
                            }
                        }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                        <Glyphicon glyph="search"></Glyphicon>
                    </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null 
                    ? 
                   <div>
                        <Profile 
                            artist={this.state.artist}
                        />
                        <div className="Gallery"> 
                            Gallery 
                        </div> 
                    </div>
                  : <div></div>
                }
                
        </div>
        )
    }
}

export default App;