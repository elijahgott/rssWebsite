const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

const RssParser = require('rss-parser')
const rssParser = new RssParser

const rssFeedsList = [
    {
        title: "Yahoo - Finance",
        url: "https://finance.yahoo.com/news/rssindex",
        genres: ['news', 'finance']
    },
    {
        title: 'BBC - World',
        url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
        genres: ['news', 'left']
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
    },
    {
        title: "YouTube - Chrrism",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCBoPMDqg57i0dPLu3hrN9Hw",
        genres: ['youtube', 'gaming']
    },
    {
        title: "YouTube - Cold Ones",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCfbnTUxUech4P1XgYUwYuKA",
        genres: ['youtube']
    },
    {
        title: "YouTube - cscoopVEVO",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCFSnAipx-2xRlR-209Rz5cA",
        genres: ['youtube', 'gaming']
    },
    {
        title: "YouTube - docm77",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UC4O9HKe9Jt5yAhKuNv3LXpQ",
        genres: ['youtube', 'gaming']
    },
    {
        title: "YouTube - KennyForReal",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UC8xZt-P1j-G7ckm0LM2p6eQ",
        genres: ['youtube', 'sports']
    },
    {
        title: "YouTube - Keralis",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCcJgOennb0II4a_qi9OMkRA",
        genres: ['youtube', 'gaming']
    },
    {
        title: "YouTube - Mind Pulp",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UC_uuCO-tZMc73_qRvr46OFA",
        genres: ['youtube', 'gaming']
    },
    {
        title: "YouTube - Odyssey Central",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCMiOWDKN0wNKHQ4rzGAp6ig",
        genres: ['youtube', 'gaming']
    },
    {
        title: "YouTube - Replay Mode",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCBkl0KmpNuPjIKEkonYub9w",
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

// get all sources / feeds
app.get('/api/feeds', async (req, res) => {
    res.json(rssFeedsList)
})

// get all articles
app.get('/api/articles', async (req, res) => {
    // holds each article / item
    // fetched from rss feeds
    const items = []

    for(const unparsed of rssFeedsList){
        const feed = await rssParser.parseURL(unparsed.url)
        const genres = unparsed.genres

        if(feed){
            let count = 0
            feed.items.forEach(item => {
                const timestamp = new Date(item.pubDate || item.published || item.isoDate).getTime()

                // dont push articles older than a week old
                if(isWithinWeek(timestamp) && count < 10){
                    normalizedObj = {
                        title: item.title,
                        author: item.author || item.creator || "N/A",
                        url: item.link,
                        published: timestamp,
                        content: item.content || '',
                        genres: genres || []
                    }
                    items.push(normalizedObj)
                    count++
                }
            })
        }
    }

    res.json(items.sort((a, b) => b.published - a.published))
})

module.exports = app