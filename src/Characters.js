import React from 'react';
import axios from 'axios';
import secrets from './secrets';
import './Characters.css';

class Characters extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://www.giantbomb.com/api/characters/?api_key=${secrets.API_KEY}&format=json`
      )
      .then((res) => {
        this.setState({ characters: res.data.results });
        console.log(res.data.results);
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <h1>GIANT BOMB API</h1>
        <div className="characters">
          {this.state.characters.length === 0 && <h1>Loading...</h1>}
          {this.state.characters.length > 0 &&
            this.state.characters.map((character) => <h3>{character.name}</h3>)}
        </div>
      </div>
    );
  }
}

export default Characters;
