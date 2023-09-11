import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Characters = () => {
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

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
            <div className="character-genre">
              <p>#{selectedCharacter.id}</p>
              <span>|</span>
              <p>{selectedCharacter.species}</p>
              <span>|</span>
              <p>{selectedCharacter.gender}</p>
            </div>
            <div className="character-main-info">
              <h5>
                <strong>Name:</strong> {selectedCharacter.name}
              </h5>
              <h5>
                <strong>Status:</strong> {selectedCharacter.status}
              </h5>
              <h5>
                <strong>Origin:</strong> {selectedCharacter.origin.name}
              </h5>
              <h5>
                <strong>Last seen:</strong> {selectedCharacter.location.name}
              </h5>
            </div>
          </div>
        ) : (
          <div className="choose-character">
            <div className="choose-character-text">
              <h2>Choose a character</h2>
              <h1>
                <iconify-icon icon="memory:arrow-right-bold"></iconify-icon>
              </h1>
            </div>
            <img src="public/imdbrick.jpg" alt="" />
          </div>
        )}
      </div>
      <div className="characters-shared-container">
        {/* CHOOSING CHARACTER + PAGES */}
        <div className="characters-container-mobile section-background-styling">
          <div>
            <div className="characters-mobile">{charactersMobile}</div>
            {/* <h4>
              Page: {currentPage} / {pages}
            </h4> */}
            <div className="buttons-container section-background-styling">
              <button onClick={handleFirstPage}>
                <iconify-icon icon="svg-spinners:gooey-balls-1"></iconify-icon>
              </button>
              <button onClick={handlePrevPage}>
                <iconify-icon icon="memory:arrow-left-bold"></iconify-icon>
              </button>
              <h4>
                {currentPage} / {pages}
              </h4>
              <button onClick={handleNextPage}>
                <iconify-icon icon="memory:arrow-right-bold"></iconify-icon>
              </button>
              <button onClick={handleLastPage}>
                <iconify-icon icon="svg-spinners:gooey-balls-1"></iconify-icon>
              </button>
            </div>
          </div>
        </div>

        <div className="characters-container-desktop section-background-styling">
          <div className="characters-desktop">{charactersDesktop}</div>
          {/* <h4>
            Page: {currentPage} / {pages}
          </h4> */}
          <div className="buttons-container section-background-styling">
            <button onClick={handleFirstPage}>
              <iconify-icon icon="svg-spinners:gooey-balls-1"></iconify-icon>
            </button>
            <button onClick={handlePrevPage}>
              <iconify-icon icon="memory:arrow-left-bold"></iconify-icon>
            </button>
            <h4>
              {currentPage} / {pages}
            </h4>
            <button onClick={handleNextPage}>
              <iconify-icon icon="memory:arrow-right-bold"></iconify-icon>
            </button>
            <button onClick={handleLastPage}>
              <iconify-icon icon="svg-spinners:gooey-balls-1"></iconify-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
