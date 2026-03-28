import { useEffect, useState } from 'react'

import axios from 'axios'
const articlesUrl = '/api/articles'
const feedsUrl = '/api/feeds'

import NavBar from './navBar'
import Filter from './filterComponent'
import Article from './articleComponent'
import Feeds from './allFeedsComponent'

function App() {
  const [data, setData] = useState([])
  const [genres, setGenres] = useState([])
  const [activeGenres, setActiveGenres] = useState([])

  const [feeds, setFeeds] = useState([])

  // get all items and data from backend
  useEffect(() => {
    const getAll = async () => {
      try{
        const res = await axios.get(articlesUrl)
        setData(res.data)
      }
      catch (e){
        console.error('Error fetching articles: ', e)
      }
    }
    getAll()
  }, [])

  // get all unique genres from articles
  useEffect(() => {
    if(data.length > 0){
      // get all genres from articles
      const allGenres = data.flatMap(item => item.genres || [])
      const unqiueGenres = [...new Set(allGenres)]
      setGenres(unqiueGenres)
    }
  }, [data])

  // function to toggle genre with button
  const toggleGenre = (genre) => {
    setActiveGenres(prev => {
      return prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    })
  }

  // filter articles based on selected filters
  const filteredData = activeGenres.length === 0 ? data : data.filter(item => item.genres.some(genre => activeGenres.includes(genre)))

  // get all feeds from backend !!!
  // get all items and data from backend
  useEffect(() => {
    const getAll = async () => {
      try{
        const res = await axios.get(feedsUrl)
        setFeeds(res.data)
      }
      catch (e){
        console.error('Error fetching feeds: ', e)
      }
    }
    getAll()
  }, [])

  // gets image based on genre
  const getGenreImage = (genres) => {
    if(genres){
        if(genres.includes('sports')){
            return '/basketball.png'
        }
        else if(genres.includes('gaming')){
            return '/gameController.png'
        }
        else if(genres.includes('finance')){
            return '/money.png'
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

  return (
    <>
      <NavBar />
      <div className="container items">
        <Filter genres={genres} activeGenres={activeGenres} toggleGenre={toggleGenre} />
        {filteredData.length === 0 ? (
          <h2 className='loadingText'>nothing to show...</h2>
        ) : (
          filteredData.map((item, index) => <Article article={item} getGenreImage={getGenreImage} key={index}/>)
        )}
      </div>
      <div className='container'>
        <Feeds feeds={feeds} getGenreImage={getGenreImage} />
      </div>
    </>
  )
}

export default App
