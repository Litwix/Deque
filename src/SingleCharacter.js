import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import secrets from './secrets';
import './Characters.css';

const SingleCharacter = () => {
  const params = useParams();
  const guid = params.guid;

  const [character, setCharacter] = useState({});
  const [image, setImage] = useState('');

  useEffect(() => {
    axios
      .get(
        `https://www.giantbomb.com/api/character/${guid}/?api_key=${secrets.API_KEY}&format=json`
      )
      .then((res) => {
        setCharacter(res.data.results);
        setImage(res.data.results.image.original_url);
      })
      .catch((error) => console.log(error));
  }, [guid]);

  return (
    <div className="App">
      <div className="singleCharacterContainer">
        <div>
          <h1>{character.name}</h1>
          <img src={image} alt="Avatar" width="300px" height="auto" />
        </div>
        <div className="singleCharacterInfo">
          <h3>
            Real Name:{' '}
            {character.real_name ? character.real_name : character.name}
          </h3>
          <h3>
            Birthday: {character.birthday ? character.birthday : 'Unknown'}
          </h3>
          <h3>Gender: {character.gender === 1 ? 'Male' : 'Female'}</h3>
          <h3>Description:</h3>
          <p>{character.deck ? character.deck : 'Unavailable'}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleCharacter;
