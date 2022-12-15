import React from 'react'

export interface Todo {
  newTodo?: { text: string; type: string }
  complete?: boolean
  text: string
  id: number
  isCompleted: boolean
  isDeleted: boolean
}

interface ToggleTodo {
  (selectedTodo: Todo): void
}

interface AddTodo {
  (text: { text: string }, isCompleted?: boolean, isDeleted?: boolean): void
}

interface TodoProps {
  id: number
  todos: Array<Todo>
  toggleTodo: ToggleTodo
  addTodo: AddTodo
  onChangeTodo: (text: string) => void
  text: string
  deleteTodo: (todo: Todo) => void
}

export const Todo: React.FC<TodoProps> = ({
  todos,
  toggleTodo,
  text,
  addTodo,
  onChangeTodo,
  deleteTodo
}) => {
  const onAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text) return
    addTodo(text as unknown as { text: string })
    onChangeTodo('')
  }

  const onToggleTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTodo(e.target.value)
  }

  return (
    <>
      <div className="flex bg-white ">
        <div className="mx-auto max-w-screen-xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold uppercase tracking-wide text-blue-600">
              {new Date().toLocaleDateString()}
            </h2>
            <p className="my-3 text-4xl font-bold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Todo List
            </p>
            <p className="mt-5">
              <form className="flex flex-col" onSubmit={onAddTodo}>
                <input
                  type="text"
                  value={text || ''}
                  className="rounded-md border border-gray-300 shadow-sm"
                  placeholder="Get Milk..."
                  onChange={onToggleTodo}
                />
                <button
                  className="mt-4 w-1/3 self-center rounded bg-blue-500 font-bold text-white transition ease-in-out hover:bg-blue-700"
                  type="submit"
                >
                  New Todo
                </button>
              </form>
            </p>
          </div>
        </div>
      </div>

      <ul className="flex flex-col">
        {todos.map((todo, idx) => {
          return (
            <li className="m-auto " key={idx}>
              <label
                style={{
                  textDecoration: todo.isCompleted ? 'line-through' : undefined
                }}
              >
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={todo.complete}
                  onChange={() => {
                    toggleTodo(todo)
                  }}
                />
                {todo?.text}
                <button
                  className="ml-1 text-red-600"
                  onClick={() => {
                    deleteTodo(todo)
                  }}
                >
                  X
                </button>
              </label>
            </li>
          )
        })}
      </ul>
    </>
  )
}
