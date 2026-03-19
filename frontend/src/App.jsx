import { useEffect, useState } from 'react'

import axios from 'axios'
const baseUrl = '/api/articles'

import './App.css'

import Article from './articleComponent'

function App() {
  const [data, setData] = useState([])

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
      <h1>RSS Feed</h1>

      <div>
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
