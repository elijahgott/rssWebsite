const Filter = ({genres}) => {
    return(
        <>
            <p>filter by genre:</p>
            <div>
                {genres.map((genre) => <button>{genre}</button>)}
            </div>
        </>
    )
}

export default Filter