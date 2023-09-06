import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Character = () => {
  const { paramsId } = useParams();
  const [character, setCharacter] = useState(null);

  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${paramsId}`
        );
        if (!response.ok) {
          throw new Error("Network response NOT ok.");
        }
        const data = await response.json();
        setCharacter(data);
        console.log(character);
      } catch (error) {
        console.error("Error fetching character data: ", error);
      }
    };

    fetchCharacter();
  }, []);

  return (
    <div className="character-container-mobile section-background-styling">
      {character ? (
        <div>
          <img src={character.image} alt="" />
          <div className="character-genre">
            <p>#{character.id}</p>
            <span>|</span>
            <p>{character.species}</p>
            <span>|</span>
            <p>{character.gender}</p>
          </div>
          <h2>Name: {character.name}</h2>
          <h3>Status: {character.status}</h3>
          <h3>Origin: {character.origin.name}</h3>
          <h3>Last seen: {character.location.name}</h3>

          {/* <div>
            <h3>Episodes:</h3>
            <div className="episodes-list">
              {character.episode.map((episodeUrl) => (
                <div key={episodeUrl}>
                  <a
                    href={episodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Episode {episodeUrl.split("/").pop()}
                  </a>
                </div>
              ))}
            </div>
          </div> */}
          <Link to="/" className="go-back-link">
            Go back to characters
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Character;
