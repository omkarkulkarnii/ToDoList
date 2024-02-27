import { useEffect, useState } from 'react'
import {TodoProvider} from './Contexts'
import './App.css'
import TodoItem from './components/TodoItem'
import TodoForm from './components/TodoForm'
import Footer from './components/Footer'
function App() {


  let time2= new Date();
  let curr23 = time2.getDate()+ "/"+ (time2.getMonth() + 1) + "/" + time2.getFullYear()



  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo},...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  } 
 
  const deleteTodo = (id) => {
    //make a new array onlyu without the current array we want to delete
    setTodos((prev => prev.filter((todo) => todo.id !== id)))
  }
 
  const toggleComplete  = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => { //this is to get values from our local storage
   const todos = JSON.parse(localStorage.getItem("todos"));

   if(todos && todos.length > 0){
    setTodos(todos)
   }
  }, [])
  

  useEffect( () => {
    localStorage.setItem('todos' , JSON.stringify(todos))
  } , [todos])



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
    <div className="bg-[#a9abae] min-h-screen w-full py-8">
                <div className="w-full  max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-red
                ">
                    <h1  className="text-2xl font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
 text-orange-300 text-center mb-8 mt-2">Start Typing For <span style={{color:'lightBlue'}}>{curr23}</span></h1>
                    <div className="mb-4">
                       <TodoForm />
                    </div>
                    
                    <div className="flex flex-wrap gap-y-3">
                      {todos.map((todo) => (
                        <div key={todo.id} className='w-full'>
                          <TodoItem todo={todo}/>
                         
                        </div>
                      ))}
                    </div>
                </div>
              <Footer/>
    </div>
    </TodoProvider>
  )
}

export default App
