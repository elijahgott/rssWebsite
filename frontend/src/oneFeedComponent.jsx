const Feed = ({feed}) => {
    return(
        <div className="feedContainer">
            <h2 className="title"><a href={feed.url}>{feed.title}</a></h2>
            <img src="./gameController.png"></img>
        </div>
    )
}

export default Feed