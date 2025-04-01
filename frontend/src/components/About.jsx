import React, { useContext } from 'react'
import Form from './Form'
import { TaskContext } from '../utils/TaskContext'

const About = () => {
    let {createTask}=useContext(TaskContext)
  return (
    <div>
        <Form createFunction={createTask} updateTask={"Update Task"} update={"update"} />
    </div>
  )
}

export default About