const Article = ({article}) => {
    return(
        <div>
            <h1><a href={article.url}>{article.title}</a></h1>
            <p>{article.author}</p>
            <p>{article.published}</p>
            <p>{article.content}</p>
        </div>
    )
}

export default Article