const express = require('express')
const app = express()

const RssParser = require('rss-parser')
const rssParser = new RssParser

const rssFeedsList = [
    {
        title: "ESPN NBA",
        url: "https://www.espn.com/espn/rss/nba/news"
    },
    {
        title: "YouTube - The Act Man",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCWRvdx9K5uKlnwZaiiWQO3w"
    }
]

// template for item object
const itemObj = {
    title: "",
    author: "",
    url: "",
    published: "",
    content: "",
    // maybe more?
}


const items = []

// gets feed data from rss
// includes items (articles), feed title, feed url, etc
const getFeedItems = async (url) => {
    const feed = await rssParser.parseURL(url)

    if(feed){
        feed.items.forEach(item => {
            normalizedObj = {
                title: item.title,
                author: item.author || item.creator || "N/A",
                url: item.link,
                published: item.pubDate, // may need to format this differently
                content: item.content || '',
            }
            items.push(normalizedObj)
        })
    }
}

// fetch feed for all rss feeds in list
rssFeedsList.forEach(async item => {
    // items.push(await getFeedItems(item.url))
    await getFeedItems(item.url)
})

// display data in items
setTimeout(() => {
    console.log(items)
}, 200)

module.exports = app