const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const RssParser = require('rss-parser')
const rssParser = new RssParser

const rssFeedsList = [
    {
        title: "CNN - World",
        url: "http://rss.cnn.com/rss/cnn_world.rss",
        genres: ['news', 'left', 'world']
    },
    {
        title: "Fox News - World",
        url: "https://moxie.foxnews.com/google-publisher/world.xml",
        genres: ['news', 'right', 'world']
    },
    {
        title: "ESPN - NBA",
        url: "https://www.espn.com/espn/rss/nba/news",
        genres: ['news', 'sports']
    },
    {
        title: "YouTube - The Act Man",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCWRvdx9K5uKlnwZaiiWQO3w",
        genres: ['youtube', 'gaming']
    },
    {
        title: "YouTube - EthosLab",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCFKDEp9si4RmHFWJW1vYsMA",
        genres: ['youtube', 'gaming']
    },
    {
        title: "YouTube - BdoubleO100",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UClu2e7S8atp6tG2galK9hgg",
        genres: ['youtube', 'gaming']
    },
    {
        title: "YouTube - Alex Webb",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCHmDySLF9yQVC1oTwZKWtSQ",
        genres: ['youtube', 'gaming']
    }
]

// return true if published date is within a week of current date
const isWithinWeek = (timestamp) => {
    const currentTime = new Date().getTime()
    const lastWeekTime = currentTime - (1000 * 60 * 60 * 24 * 7)

    return timestamp > lastWeekTime
}

// ------- API ------- //

// get all sources?

// get all articles
app.get('/api/articles', async (req, res) => {
    // holds each article / item
    // fetched from rss feeds
    const items = []

    for(const unparsed of rssFeedsList){
        const feed = await rssParser.parseURL(unparsed.url)
        const genres = unparsed.genres

        if(feed){
            feed.items.forEach(item => {
                const timestamp = new Date(item.pubDate || item.published || item.isoDate).getTime()

                // dont push articles older than a week old
                if(isWithinWeek(timestamp)){
                    normalizedObj = {
                        title: item.title,
                        author: item.author || item.creator || "N/A",
                        url: item.link,
                        published: timestamp,
                        content: item.content || '',
                        genres: genres || []
                    }
                    items.push(normalizedObj)
                }
            })
        }
    }

    res.json(items.sort((a, b) => b.published - a.published))
})

module.exports = app