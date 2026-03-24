import { useEffect, useState } from 'react'

import axios from 'axios'
const baseUrl = '/api/articles'

import './App.css'

import NavBar from './navBar'
import Filter from './filterComponent'
import Article from './articleComponent'

function App() {
  const [data, setData] = useState([])
  const [genres, setGenres] = useState([])
  const [activeGenres, setActiveGenres] = useState([])

  // get all items and data from backend
  useEffect(() => {
    const getAll = async () => {
      try{
        const res = await axios.get(baseUrl)
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

  return (
    <>
      <NavBar />
      <div className="itemsContainer">
        <Filter genres={genres} activeGenres={activeGenres} toggleGenre={toggleGenre} />
        {filteredData.length === 0 ? (
          <h2 className='loadingText'>nothing to show...</h2>
        ) : (
          filteredData.map((item, index) => <Article article={item} key={index}/>)
        )}
      </div>
    </>
  )
}

export default App
