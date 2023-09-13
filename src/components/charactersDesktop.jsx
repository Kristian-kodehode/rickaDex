const CharactersDesktop = ({
  allCharacters,
  firstPage,
  prevPage,
  nextPage,
  lastPage,
  page,
  pages,
}) => {
  return (
    <div className="characters-container-desktop section-background-styling">
      <div className="characters-desktop">{allCharacters}</div>
      <div className="buttons-container section-background-styling">
        <button onClick={firstPage}>
          <iconify-icon icon="svg-spinners:gooey-balls-1"></iconify-icon>
        </button>
        <button onClick={prevPage}>
          <iconify-icon icon="memory:arrow-left-bold"></iconify-icon>
        </button>
        <h4>
          {page} / {pages}
        </h4>
        <button onClick={nextPage}>
          <iconify-icon icon="memory:arrow-right-bold"></iconify-icon>
        </button>
        <button onClick={lastPage}>
          <iconify-icon icon="svg-spinners:gooey-balls-1"></iconify-icon>
        </button>
      </div>
    </div>
  );
};

export default CharactersDesktop;
