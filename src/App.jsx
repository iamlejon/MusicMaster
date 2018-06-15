import React, {Component} from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null
        }
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = BASE_URL + 'q=' + this.state.query +'&type=artist&limit=1';
        var accessToken = 'BQCRDz7rQhu0LagrIjer7gDwdm-5xp6G_lJmaD5TKZnhBeGxhmtVPcxN0LCGb4Ejn8R_Y3DyqjoaTcOmPJnAWbKlNHt_Bs_HZZ-Acb3CA_yHQVaarxfTc7GLKRW_IKKRnrkA5LPlLcbgZ8E7E_HyMpWYe7YeDoJu&refresh_token=AQBKRhv86nX75x-Ib8I2qfpcVlR6QMvrQWEdYSm2J1jVUtQwXQ2eOGSYWobJcm4mbrwQXntMQNpytp55-kWFZamB_0gPPhwImnsY-iYdlN_7YNAXjMGWTQKAwYvOkz_2gwI'
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
                <Profile 
                        artist={this.state.artist}
                />
                <div className="Gallery">
                    Gallery
                </div>
        </div>
        )
    }
}

export default App;