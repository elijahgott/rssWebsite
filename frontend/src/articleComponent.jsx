const getDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString()
}

const Article = ({article}) => {
    return(
        <div className="item">
            <h2 className="articleTitle"><a href={article.url} target="_blank">{article.title}</a></h2>
            <p className="articleInfo">by {article.author} - {getDate(article.published)}</p>
            <p>{article.content}</p>
        </div>
    )
}

export default Article