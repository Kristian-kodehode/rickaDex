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
      <Link to="/">Go back to characters</Link>
      <h1>This is content for page two</h1>
      {character ? (
        <div>
          <h1>{character.name}</h1>
          <h1>{character.status}</h1>
          <img src={character.image} alt="" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Character;
