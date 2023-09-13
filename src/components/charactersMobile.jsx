const CharactersMobile = ({
  allCharacters,
  firstPage,
  prevPage,
  nextPage,
  lastPage,
  page,
  pages,
}) => {
  return (
    <div className="characters-container-mobile section-background-styling">
      <div>
        <div className="characters-mobile">{allCharacters}</div>
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
    </div>
  );
};

export default CharactersMobile;
