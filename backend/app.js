const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const RssParser = require('rss-parser')
const rssParser = new RssParser

const rssFeedsList = [
    {
        title: "ESPN - NBA",
        url: "https://www.espn.com/espn/rss/nba/news"
    },
    {
        title: "YouTube - The Act Man",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCWRvdx9K5uKlnwZaiiWQO3w"
    },
    {
        title: "New York Times - World",
        url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml"
    }
]

// ------- API ------- //

// get all sources?

// get all articles
app.get('/api/articles', async (req, res) => {
    // holds each article / item
    // fetched from rss feeds
    const items = []

    for(const unparsed of rssFeedsList){
        const feed = await rssParser.parseURL(unparsed.url)

        if(feed){
            feed.items.forEach(item => {
                const timestamp = new Date(item.pubDate || item.published || item.isoDate).getTime()

                normalizedObj = {
                    title: item.title,
                    author: item.author || item.creator || "N/A",
                    url: item.link,
                    published: timestamp,
                    content: item.content || '',
                }
                items.push(normalizedObj)
            })
        }
    }

    res.json(items.sort((a, b) => b.published - a.published))
})

module.exports = app