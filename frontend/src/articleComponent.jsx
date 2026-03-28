const getDate = (timestamp) => {
    const dateObj = new Date(timestamp)
    const date = dateObj.toLocaleString([], {dateStyle: 'short'})
    const time = dateObj.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
    const dateTime = `${date} ${time}`
    return dateTime
}

const Article = ({article, getGenreImage}) => {
    const image = getGenreImage(article.genres)

    return(
        <div className="item">
            {image !== null ? (<img src={image} className="genreImage" />) : (null)}
            <h2 className="title"><a href={article.url} target="_blank">{article.title}</a></h2>
            <div className="articleInfo">
                <p className="authorName">{article.author}</p>
                <p className="publishedDate">{getDate(article.published)}</p>
            </div>
            <p className="articleContent">{article.content}</p>
        </div>
    )
}

export default Article