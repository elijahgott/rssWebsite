const getDate = (timestamp) => {
    const dateObj = new Date(timestamp)
    const date = dateObj.toLocaleString([], {dateStyle: 'short'})
    const time = dateObj.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})
    const dateTime = `${date} ${time}`
    return dateTime
}

const getGenreImage = (genres) => {
    console.log(genres)
    if(genres){
        if(genres.includes('sports')){
            return '/basketball.png'
        }
        else if(genres.includes('gaming')){
            return '/gameController.png'
        }
        else if(genres.includes('right')){
            return '/elephant.png'
        }
        else if(genres.includes('left')){
            return '/donkey.png'
        }
        // after other types of news so specific types are picked first
        else if(genres.includes('news')){
            return '/book.png'
        }
    }
    return null
}

const Article = ({article}) => {
    const image = getGenreImage(article.genres)

    return(
        <div className="item">
            {image !== null ? (<img src={image} className="genreImage" />) : (null)}
            <h2 className="articleTitle"><a href={article.url} target="_blank">{article.title}</a></h2>
            <div className="articleInfo">
                <p className="authorName">{article.author}</p>
                <p className="publishedDate">{getDate(article.published)}</p>
            </div>
            <p className="articleContent">{article.content}</p>
        </div>
    )
}

export default Article