import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import secrets from './secrets';
import './Characters.css';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [sortOption, setSortOption] = useState('name');

  useEffect(() => {
    axios
      .get(
        `https://www.giantbomb.com/api/characters/?api_key=${secrets.API_KEY}&format=json`
      )
      .then((res) => {
        setCharacters(res.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSortChange = (evt) => {
    setSortOption(evt.target.value);
    sortCharacters();
  };

  const sortCharacters = () => {
    let sortedChars = [];
    if (sortOption === 'name') {
      sortedChars = characters.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (sortOption === 'game') {
      sortedChars = characters.sort((a, b) => {
        if (!a.first_appeared_in_game) return 1;
        else if (!b.first_appeared_in_game) return -1;
        else
          return a.first_appeared_in_game.name > b.first_appeared_in_game.name
            ? 1
            : -1;
      });
    } else if (sortOption === 'added') {
      sortedChars = characters.sort((a, b) =>
        a.date_added > b.date_added ? 1 : -1
      );
    } else if (this.state.sortOption === 'updated') {
      sortedChars = characters.sort((a, b) =>
        a.date_last_updated > b.date_last_updated ? 1 : -1
      );
    }
    return sortedChars;
  };

  const sortedCharacters = sortCharacters();

  return (
    <div className="App">
      <h1>GIANT BOMB API</h1>
      <div className="characters">
        {sortedCharacters.length === 0 && <h1>Loading...</h1>}
        {sortedCharacters.length > 0 && (
          <div>
            <div className="sort">
              <h3>Sort By:</h3>
              <select onChange={handleSortChange}>
                <option value="name">Name</option>
                <option value="game">First Game</option>
                <option value="added">Date Added</option>
                <option value="updated">Date Updated</option>
              </select>
            </div>
            <table>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>First Game</th>
                <th>Date Added</th>
                <th>Date Updated</th>
              </tr>
              {sortedCharacters.map((character) => (
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Characters;
