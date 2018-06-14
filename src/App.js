import React, {Component} from 'react';
import './App.css';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    search() {
        console.log('this.state', this.state);
        const BASE_URL = 'https://api.spotify.com/v1/search?';
        const FETCH_URL = BASE_URL + 'q=' + this.state.query +'&type=artist&limit=1';
        var accessToken = 'BQCd0TT1_IgrGvwVDR3xQQoF_jFjKyE8Mvsdn2kqPaeSnhyeUY4P4nDRjyjdhA5ZaZpjFLbYYaQ2rgDwgdB31PVEw5wc5l23sJ1F3EckL5zcK4bHhZrCzGC9PGgjQ_JPe01lsF9dms_O8mr7HpCrQL39x8fsezg5&refresh_token=AQBqeydXMFACT_0rjNCCbXYwo-WFsaq_j-uKOHGkCQeC9J__hc6TVuEzAO4Kqw9hZLLyBIdMXbxyiEbBd5VaxM9JzJzCprnQD4pR5HrEf5X1sT9U0KQjh55G61wEq2ohQqM'
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
        .then(json => console.log(json))
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
                <div className="Profile">
                    <div>Artist Picture</div>
                    <div>Artist Name</div>
                </div>
                <div className="Gallery">
                    Gallery
                </div>
        </div>
        )
    }
}

export default App;