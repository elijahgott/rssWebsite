import Feed from './oneFeedComponent'

const Feeds = ({feeds, getGenreImage}) => {
    return(
        <div className='feedsContainer'>
            {feeds.length > 0 ?
                (feeds.map((feed, index) => {
                    return(<Feed feed={feed} getGenreImage={getGenreImage} key={index} />)
                })) :
                (<p className='loadingText'>no feeds...</p>)
            }
        </div>
    )
}

export default Feeds