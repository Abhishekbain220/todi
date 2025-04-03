import axios from "./axios";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";

export let TaskContext = createContext()
export let TaskProvider = (props) => {
    

    const [heading, setHeading] = useState("")
    const [loading, setLoading] = useState(false)
    const [task, setTask] = useState("")
    const [viewTasks, setViewTasks] = useState([])
    const [updateHeading, setUpdateHeading] = useState("")
    const [updateTask, setUpdateTask] = useState("")
    const [id, setId] = useState("")
    const [updateSwitch, setUpdateSwitch] = useState(false)
    const [createSwitch, setCreateSwitch] = useState(false)
    
    let createTask = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            let newTask = { heading, task }
            setCreateSwitch(false)

            let response = await axios.post("/task/createTask", newTask, {
                withCredentials: true
            })
            setHeading("")
            setTask("")

            console.log(response)
            getTaskData()
            setLoading(false)


        } catch (error) {
            console.log(error)
        }

    }

    let getTaskData=async()=>{
        let {data}=await axios.get("/task/viewTasks",{
            withCredentials:true
        })
        console.log(data)
        setViewTasks(data.tasks)



    }
    useEffect(()=>{
        console.log("useEffect triggered")
        getTaskData()
    },[])

    let deleteTask=async(id)=>{
        setLoading(true)
        let {data}=await axios.delete(`/task/deleteTask/${id}`,{
            withCredentials:true
        })
        setUpdateHeading("")
        setUpdateTask("")
        getTaskData()
        setLoading(false)
        setTimeout(() => {
            toast.success(data.message)
        }, 1000);
    }
    let updateHandler=(heading,task,id)=>{
        setUpdateHeading(heading)
        setUpdateTask(task)
        setId(id)
        setUpdateSwitch(true)
        

    }
    let updateTaskHandler=async(e)=>{
        e.preventDefault()
        setLoading(true)
        let updatedNewTask={
            heading:updateHeading,
            task:updateTask
        }
        console.log(updatedNewTask)
        let {data}=await axios.put(`/task/updateTask/${id}`,updatedNewTask,{
            withCredentials:true
        })
        console.log(data)
        setUpdateHeading("")
        setUpdateTask("")
        setId("")
        setUpdateSwitch(false)
        getTaskData()
        setLoading(false)
        setTimeout(() => {
            toast.success(data.message)
        }, 1000);
    }
    let createForm=()=>{
        setCreateSwitch(true)
    }
    useEffect(()=>{
       setCreateSwitch(false) 
    },[])
    return (
        <TaskContext.Provider value={{ heading, setHeading, task, setTask,createTask ,viewTasks,deleteTask,updateHandler, updateHeading,setUpdateHeading,updateTask,setUpdateTask,updateTaskHandler,updateSwitch ,setUpdateSwitch,createForm,createSwitch,setCreateSwitch,getTaskData , loading,setLoading}}>
            {props.children}
        </TaskContext.Provider>
    )
} 