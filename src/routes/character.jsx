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
          <h2>Name: {character.name}</h2>
          <h3>Status: {character.status}</h3>
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
