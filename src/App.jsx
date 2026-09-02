import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Row from './components/Row'
const API_URL = 'http://localhost:3001'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/tasks`)
      .then(response => {
        setTasks(response.data)
      })
      .catch(error => {
        alert(error.response.data ? error.response.data.message : error.message)
      })
  }, [])

  const deleteTask = (deleted) => {
    axios.delete(`${API_URL}/tasks/${deleted}`)
      .then(response => {
        setTasks(currentTasks => currentTasks.filter(task => task.id !== deleted))
      })
      .catch(error => {
        alert(error.response.data ? error.response.data.message : error.message)
      })
  }

  const addTask = (e) => {
    e.preventDefault()
    const newTask = { description: task }
    axios.post(`${API_URL}/tasks`, { task: newTask })
      .then(response => {
        setTasks(currentTasks => [...currentTasks, response.data])
        setTask('')
      })
      .catch(error => {
        alert(error.response.data ? error.response.data.message : error.message)
      })
  }

  return (
    <div id="container">
      <h3>Todos</h3>
      <form onSubmit={addTask}>
        <input
          placeholder="Add new task"
          value={task}
          onChange={event => setTask(event.target.value)}
        />
      </form>
      <ul>
        {tasks.map(item => (
          <Row key={item.id} task={item} onDelete={deleteTask} />
        ))}
      </ul>
    </div>
  )
}

export default App