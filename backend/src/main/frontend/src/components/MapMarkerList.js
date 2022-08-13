import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

import "./MapMarkerList.css";
import { red } from "@mui/material/colors";
import { createHeaders } from "../api";

function MapMarkerList({ channelSeq, mapSeq, stomp }) {
  const store = useSelector((state) => state);
  const pins = store.PinList.pinList;
  const token = useSelector((state) => state.UserInfo.accessToken);
  const [columns, setColumns] = useState([]);
  let itemsCandi = [];
  let itemsFinal = [];

  const onDragEnd = (result, columns, setColumns) => {
    console.log("result : ", result);
    if (!result.destination) return;
    const { source, destination } = result;

    let chatMessage = { receiver: channelSeq, mapSeq: mapSeq };

    if (source.droppableId !== destination.droppableId) {
      chatMessage.status = "MOD_PINLIST_DIFFLAG";
    } else {
      if (source.index === destination.index) {
        return;
      }
      chatMessage.status = "MOD_PINLIST_SAMEFLAG";
    }
    chatMessage.pinFlag = source.droppableId ^ 1; // 이동 전 flag
    chatMessage.sourceOrder = source.index;
    chatMessage.destinationOrder = destination.index;
    stomp.send(
      "/app/private-message",
      createHeaders(token),
      JSON.stringify(chatMessage)
    );
  };

  pins.map((pin) => {
    // store에서 pin 가져와서 초기 세팅해주기
    let item = {
      id: uuid(),
      content: pin.pinTitle,
      pinSeq: pin.pinSeq,
      pinOrder: pin.pinOrder, // pin index
      pinFlag: pin.pinFlag, // 최종선택: 1 or 후보: 0
    };
    if (item.pinFlag === 1) {
      itemsFinal.push(item);
    } else {
      itemsCandi.push(item);
    }
  });

  itemsCandi.sort(function (a, b) {
    // order(idx) 순서로 정렬해주기
    if (a.pinOrder > b.pinOrder) {
      return 1;
    }
    if (a.pinOrder < b.pinOrder) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  itemsFinal.sort(function (a, b) {
    // order(idx) 순서로 정렬해주기
    if (a.pinOrder > b.pinOrder) {
      return 1;
    }
    if (a.pinOrder < b.pinOrder) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  const itemsFinalId = 0; // id 변수에 저장
  const itemsCandiId = 1;

  useEffect(() => {
    // 초기 세팅하고
    setColumns({
      [itemsFinalId]: {
        name: "최종선택",
        items: itemsFinal,
      },
      [itemsCandiId]: {
        name: "후보",
        items: itemsCandi,
      },
    });
  }, [pins]); // pins 정보 바뀌면 rerender

  // pin 안에 index, order 정보 넣어주기

  return (
    <div className="mapmarkerlist">
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div className="hi" style={{ backgroundColor: "#202225" }}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  style={{
                    backgroundColor: "#202225", // 리스트 박스색
                    color: "#e2e3e4", // 리스트 박스(최종선택, 후보) 글자색
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "auto", // 420 에서는 리스트 개수에 따라 망가짐
                  }}
                  key={columnId}
                >
                  <h2>{column.name}</h2>
                  <div style={{ margin: 2 }}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            className="mapMarkerSelect"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "#2f3136" // 리스트 드래그 했을때 배경 색
                                : "#202225", // 리스트 배경색
                              // color: "red",
                              padding: 4,
                              width: 200,
                              minHeight: 360,
                              maxHeight: 360,
                              overflow: "auto",
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          // padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "40px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#5865f2" // 리스트 드래그 했을때 색 // 후보색 5865f2, 3ba55d, DDE0E5, black
                                            : "#42464d", // 리스트 색  // 후보색 42464d, DDE0E5, 3ba55d
                                          color: snapshot.isDragging
                                            ? "#e2e3e4" // 리스트 드래그 했을때 글자색 // e2e3e4
                                            : "#e2e3e4", // 리스트 글자 색
                                          borderRadius: 10,
                                          marginTop: 5,
                                          marginLeft: 5,
                                          paddingTop: 5,
                                          paddingLeft: 10,
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.content}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default MapMarkerList;