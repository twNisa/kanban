import React from "react";
import { useSelector } from "react-redux";

export default function useCurrentData(){
  const data = useSelector(state => state.boards)
  const currentData = data.boards.find(board => board.id === data.currentBoard)
  return currentData
}