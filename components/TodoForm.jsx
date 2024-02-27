import {React, useState } from 'react'
import {useTodo} from '../Contexts/TodoContext.js'


function TodoForm() {
    let timel= new Date();
    let curr = timel.getHours()+ " hrs" + ": " + timel.getMinutes() + " mins" 
    let [todo, setTodo] = useState(""); 
    const {addTodo} = useTodo()
    const add = (e) => {
        e.preventDefault()
        if(!todo) return
        addTodo({id: Date.now(), todo:todo, completed: false, time:curr}) 
        setTodo("")
    }



    return (
        <>
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="To-Do here..."
                className="w-full border border/10 rounded-l-lg px-3 outline-none duration-150 bg-aqua/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit"
                
            className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0 ">
                Add
            </button>
            
        </form>
        
        </>
    );
}

export default TodoForm;