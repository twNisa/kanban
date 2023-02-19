import React from "react";
import Modal from "./Modal";
import {useFieldArray, useForm } from "react-hook-form"
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../app/boardsSlice";
import {MdDeleteForever} from "react-icons/md"


export default function ViewTask({toggleState, targetTask}){
  const dispatch = useDispatch()
  console.log(targetTask)

  return (
    <Modal toggleState={toggleState} > 
        
    </Modal>
  )

}