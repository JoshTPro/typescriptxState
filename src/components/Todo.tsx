//create a todolist component using typescript
import React from 'react'

//define the type of the props

interface Todo {
  complete: boolean
  text: string
}

interface ToggleTodo {
  (selectedTodo: Todo): void
}

interface AddTodo {
  (newTodo: string): void
}

interface TodoProps {
  todos: Array<Todo>
  toggleTodo: ToggleTodo
  addTodo: AddTodo
}

export const Todo: React.FC<TodoProps> = ({ todos, toggleTodo, addTodo }) => {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-screen-xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide text-blue-600">
              {new Date().toLocaleDateString()}
            </h2>
            <p className="my-3 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Todo List
            </p>
            <p className="text-xl text-gray-400">Start building for free.</p>
            <p className="mt-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  //dont want the button click event?
                  //want value of onchange todo
                  // addTodo()
                }}
              >
                <input
                  type="text"
                  placeholder="Add Todo"
                  onChange={(e) => {
                    addTodo(e.target.value)
                  }}
                />
                <button type="submit">Add Todo</button>
              </form>
            </p>
          </div>
        </div>
      </div>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.text}>
              <label
                style={{
                  textDecoration: todo.complete ? 'line-through' : undefined
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => {
                    toggleTodo(todo)
                  }}
                />
                {todo.text}
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}
