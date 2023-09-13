import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import chooseCharacterImage from "../images/imdbrick.jpg";
import CharactersMobile from "../components/charactersMobile";
import CharactersDesktop from "../components/charactersDesktop.jsx";

const Characters = () => {
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchedCharacters, setSearchedCharacters] = useState([]);

  // Page distribution
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
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [currentPage]);

  // Search Character distribution
  useEffect(() => {
    const searchCharacters = async () => {
      try {
        const searchUrl = `https://rickandmortyapi.com/api/character/?name=${searchInput}`;
        const characterResponseForSearch = await fetch(searchUrl);
        if (!characterResponseForSearch.ok) {
          throw new Error("Network response NOT ok.");
        }
        const characterSearchData = await characterResponseForSearch.json();
        setSearchedCharacters(characterSearchData.results);
        console.log(characterSearchData.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    searchCharacters();
  }, [searchInput]);

  useEffect(() => {
    // Filter characters based on the search input value
    const filtered = characters.filter((character) =>
      character.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredCharacters(filtered);
  }, [characters, searchedCharacters, searchInput]);

  /**
   * EVENT HANDLERS
   */
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

  /**
   * DISTRIBUTION OF CHARACTERS
   */
  // Showing Characters on mobile
  const charactersMobile = filteredCharacters.map((character) => (
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

  // Showing Characters on mobile based on input value
  const searchedCharactersMobile = searchedCharacters.map((character) => (
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

  // Showing characters based on input value length - Mobile
  const allCharactersMobile =
    searchInput.length > 0 ? searchedCharactersMobile : charactersMobile;

  /**
   * DESKTOP
   */
  // Showing Characters on desktop
  const charactersDesktop = filteredCharacters.map((character) => (
    <div key={character.id} className="characters-card">
      <Link onClick={() => handleCharacterClick(character)}>
        <div>
          <img src={character.image} alt="" className="thumbnailimages" />
          <h6 className="characters-names">{character.name}</h6>
        </div>
      </Link>
    </div>
  ));
  // Showing Characters on desktop based on input value
  const searchedCharactersDesktop = searchedCharacters.map((character) => (
    <div key={character.id} className="characters-card">
      <Link onClick={() => handleCharacterClick(character)}>
        <div>
          <img src={character.image} alt="" className="thumbnailimages" />
          <h6 className="characters-names">{character.name}</h6>
        </div>
      </Link>
    </div>
  ));

  // Showing characters based on input value length - Desktop
  const allCharactersDesktop =
    searchInput.length > 0 ? searchedCharactersDesktop : charactersDesktop;

  return (
    <div className="outer-container">
      <input
        type="text"
        placeholder="Search character..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="search-input-field section-background-styling"
      />
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
              <img
                src={chooseCharacterImage}
                alt="Rick and Morty Portal Image"
              />
              <div className="choose-character-text">
                <h2>Choose a character</h2>
                <h1>
                  <iconify-icon icon="memory:arrow-right-bold"></iconify-icon>
                </h1>
              </div>
            </div>
          )}
        </div>
        <div className="characters-shared-container">
          {/* CHOOSING CHARACTER + PAGES */}
          <CharactersMobile
            allCharacters={allCharactersMobile}
            firstPage={handleFirstPage}
            prevPage={handlePrevPage}
            nextPage={handleNextPage}
            lastPage={handleLastPage}
            page={currentPage}
            pages={pages}
          />

          <CharactersDesktop
            allCharacters={allCharactersDesktop}
            firstPage={handleFirstPage}
            prevPage={handlePrevPage}
            nextPage={handleNextPage}
            lastPage={handleLastPage}
            page={currentPage}
            pages={pages}
          />
        </div>
      </div>
    </div>
  );
};

export default Characters;
