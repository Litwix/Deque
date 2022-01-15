import React from 'react';
import { Link } from 'react-router-dom';
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
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div className="App">
        <h1>GIANT BOMB API</h1>
        <div className="characters">
          {this.state.characters.length === 0 && <h1>Loading...</h1>}
          {this.state.characters.length > 0 && (
            <table>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>First Game</th>
                <th>Date Added</th>
                <th>Date Updated</th>
              </tr>
              {this.state.characters.map((character) => (
                <tr key={character.id}>
                  <td>
                    <Link to={`/${character.guid}`}>{character.name}</Link>
                  </td>
                  <td>
                    <img
                      src={character.image.icon_url}
                      alt="Avatar"
                      width="100px"
                      height="100px"
                    />
                  </td>
                  <td>
                    {character.first_appeared_in_game
                      ? character.first_appeared_in_game.name
                      : 'None'}
                  </td>
                  <td>{character.date_added.slice(0, 11)}</td>
                  <td>{character.date_last_updated.slice(0, 11)}</td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default Characters;
