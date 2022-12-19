import { useMachine } from '@xstate/react'
import React from 'react'
import { TodoItem, todoMachine } from '../xstate/todoMachine'

export const TodoApp: React.FC = () => {
  const [state, send] = useMachine(todoMachine)
  const { todos, text } = state.context

  const onChangeTodo = (text: string) => send({ type: 'ON_CHANGE', text })

  const onAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!text) return

    send({ type: 'ADD_TODO', text })
    onChangeTodo('')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChangeTodo(e.target.value)

  const toggleTodo = (completed: TodoItem) =>
    send({ type: 'TOGGLE', completed })

  const deleteTodo = (todo: TodoItem) => send({ type: 'DELETE', todo })

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
                  value={text}
                  className="rounded-md border border-gray-300 shadow-sm"
                  placeholder="Get Milk..."
                  onChange={onChange}
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
        {todos.map((todo) => {
          return (
            <li className="m-auto " key={todo.id}>
              <label
                style={{
                  textDecoration: todo.isCompleted ? 'line-through' : undefined
                }}
              >
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => toggleTodo(todo)}
                />
                {todo?.text}
                <button
                  className="ml-1 text-red-600"
                  onClick={() => deleteTodo(todo)}
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
