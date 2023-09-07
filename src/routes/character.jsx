import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Character = () => {
  const { paramsId } = useParams();
  const [character, setCharacter] = useState(null);

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
          <div className="character-main-info">
            <h5>
              <strong>Name:</strong> {character.name}
            </h5>
            <h5>
              <strong>Status:</strong> {character.status}
            </h5>
            <h5>
              <strong>Origin:</strong> {character.origin.name}
            </h5>
            <h5>
              <strong>Last seen:</strong> {character.location.name}
            </h5>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/" className="go-back-link section-background-styling">
        Go back to characters
      </Link>
    </div>
  );
};

export default Character;
