const Filter = ({genres, activeGenres, toggleGenre}) => {
    return(
        <div className="filter">
            <p className="filterText">filter by genre:</p>
            <div>
                {genres.map((genre) => <button onClick={() => toggleGenre(genre)} className={activeGenres.includes(genre) ? "filterButton active" : "filterButton inactive"} key={genre}>{genre}</button>)}
            </div>
        </div>
    )
}

export default Filter