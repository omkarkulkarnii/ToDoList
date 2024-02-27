import {React, useState} from 'react'
import {useTodo , TodoProvider} from '../Contexts/TodoContext.js'

function TodoItem({ todo }) {
    
  const [isTodoEditable, setIsTodoEditable] =  useState(false)
  const [todoMsg, setTodoMsg] =  useState(todo.todo)
  
  
  const {deleteTodo, updateTodo, toggleComplete} = useTodo()
  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg , time: todo.time})
    setIsTodoEditable(false)
  }
  const toggleCompleted = () => {
    toggleComplete(todo.id)
  }


  return (
    <>
      <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
              todo.completed ? "bg-[#e36666]" : "bg-[#939096]"
          }`}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={toggleCompleted}
             
          />
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value ) }
              readOnly={!isTodoEditable}
              
          />
        
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      editTodo();
                  } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {isTodoEditable ? "📁" : "📝"}
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              ❌
          </button>
         
          
      </div>
      <div>
      <label style={{margin:32, paddingTop:10 , borderRadius:8, padding:3, color:'black'}} className={`${
              todo.completed ? "bg-[#e36666]" : "bg-[#939096]"
          } ${todo.completed ? "line-through" : ""} `}>{todo.time}</label>
      </div>
      </>
  );
}

export default TodoItem;
