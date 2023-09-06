import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterResponse = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${currentPage}`
        );
        if (!characterResponse.ok) {
          throw new Error("Network response NOT ok.");
        }
        const characterData = await characterResponse.json();
        setCharacters(characterData.results);
        setPages(characterData.info.pages);

        // console.log(characterData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 42) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handleLastPage = () => {
    setCurrentPage(pages);
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const charactersMobile = characters.map((character) => (
    <div key={character.id} className="characters-card">
      <Link
        to={`/character/${character.id}`}
        onClick={() => handleCharacterClick(character)}
      >
        <img src={character.image} alt="" className="thumbnailimages" />
        <h6 className="characters-names">{character.name}</h6>
      </Link>
    </div>
  ));

  const charactersDesktop = characters.map((character) => (
    <div key={character.id} className="characters-card">
      <Link onClick={() => handleCharacterClick(character)}>
        <div>
          <img src={character.image} alt="" className="thumbnailimages" />
          <h6 className="characters-names">{character.name}</h6>
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="container">
      {/* DISPLAY CHOSEN CHARACTER ON DESKTOP */}
      <div className="character-desktop section-background-styling">
        {selectedCharacter ? (
          <div>
            <img src={selectedCharacter.image} alt="" />
            <h1>Name: {selectedCharacter.name}</h1>
            <h1>Status: {selectedCharacter.status}</h1>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        {/* CHOOSING CHARACTER + PAGES */}
        <div className="characters-container-mobile section-background-styling">
          <div className="characters-mobile ">{charactersMobile}</div>
          <h4>
            Page: {currentPage} / {pages}
          </h4>
          <div className="buttons-container">
            <button onClick={handleFirstPage}>First</button>
            <button onClick={handlePrevPage}>Prev</button>
            <button onClick={handleNextPage}>Next</button>
            <button onClick={handleLastPage}>Last</button>
          </div>
        </div>
        <div className="characters-container-desktop section-background-styling">
          <div className="characters-desktop ">{charactersDesktop}</div>
          <h4>
            Page: {currentPage} / {pages}
          </h4>
          <div className="buttons-container">
            <button onClick={handleFirstPage}>First</button>
            <button onClick={handlePrevPage}>Prev</button>
            <button onClick={handleNextPage}>Next</button>
            <button onClick={handleLastPage}>Last</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
