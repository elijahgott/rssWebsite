import { useEffect, useState } from 'react'

import axios from 'axios'
const baseUrl = '/api/articles'

import './App.css'

import NavBar from './navBar'
import Article from './articleComponent'

function App() {
  const [data, setData] = useState([
    // test data
    // {
    //   title: 'article name',
    //   author: 'author',
    //   url: 'https://elijahgott.github.io',
    //   published: '3-19-2026',
    //   content: 'hey all scott here',
    // },
    // {
    //   title: 'article 2 name',
    //   author: 'author 2',
    //   url: 'https://elijahgott.github.io',
    //   published: '3-18-2026',
    //   content: 'hey all scott here again',
    // }
  ])

  useEffect(() => {
    // fetch items from backend
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

  return (
    <>
      <NavBar />

      <div className="itemsContainer">
        {data.length === 0 ? (
          <h2>Nothing here...</h2>
        ) : (
          data.map((item, index) => <Article article={item} key={index}/>)
        )}
      </div>
    </>
  )
}

export default App
