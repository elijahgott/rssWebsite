const express = require('express')
const app = express()

const RssParser = require('rss-parser')
const rssParser = new RssParser

const rssFeeds = [
    {
        title: "ESPN NBA",
        url: "https://www.espn.com/espn/rss/nba/news"
    },
    {
        title: "YouTube - The Act Man",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCWRvdx9K5uKlnwZaiiWQO3w"
    }
]

const articles = []

// gets feed data from rss
// includes items (articles), feed title, feed url, etc
const getFeed = async (url) => {
    const feed = await rssParser.parseURL(url)
    return feed.items
}

rssFeeds.forEach(async item => {
    console.log(await getFeed(item.url))
    articles.push(await getFeed(item.url))
})

module.exports = app