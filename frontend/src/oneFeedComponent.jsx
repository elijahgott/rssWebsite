const Feed = ({feed, getGenreImage}) => {
    const image = getGenreImage(feed.genres)

    return(
        <div className="feedContainer">
            <h2 className="title"><a href={feed.url} target="_blank">{feed.title}</a></h2>
            <img src={image}></img>
        </div>
    )
}

export default Feed