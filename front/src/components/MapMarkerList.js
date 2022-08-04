import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './MapMarkerList.css'


function MapMarkerList(){
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        console.log(res)
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return(
    <div className="mapmarkerlist">
      <b className='mapMarkerTitle'>최종선택</b>
      <div className='mapMarkerSelect'>
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.id}</li>
          ))
          }
        </ul>
      </div>
      <b className='mapMarkerTitle'>후보</b>
      <div className='mapMarkerSub'>
        <ul>
          {posts.map(post => (
            <li key={post.id}>{post.id}</li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}

export default MapMarkerList