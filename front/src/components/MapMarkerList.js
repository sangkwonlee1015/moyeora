import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './MapMarkerList.css';


function MapMarkerList(){

  // marker state
  const [posts, setPosts] = useState([])

  // drag and drop 한 뒤 변경 저장
  function handleOnDragEnd(result) {
    // console.log(result)
    const items = Array.from(posts);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPosts(items);
    }

    // axios 요청 보내기
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
        // console.log(res)
        setPosts(res.data)
        })
        .catch(err => {
        console.log(err)
        })
    }, [])

  return(
    <div className="mapmarkerlist">
      <b className='mapMarkerTitle'>최종선택</b>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
              <div className='mapMarkerSelect'>
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {posts.map((post, idx) => {
                    return (
                      <Draggable key={post.title} draggableId={post.title} index={idx}>
                        {(provided) => (
                          <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            {post.id}
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              </div>
            )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default MapMarkerList