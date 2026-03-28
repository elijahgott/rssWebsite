import Feed from './oneFeedComponent'

const Feeds = ({feeds}) => {
    return(
        <div className='feedsContainer'>
            {feeds.length > 0 ?
                (feeds.map((feed, index) => {
                    return(<Feed key={index} feed={feed} />)
                })) :
                (<p className='loadingText'>no feeds...</p>)
            }
        </div>
    )
}

export default Feeds