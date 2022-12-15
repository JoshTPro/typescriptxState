import { Todo } from './Todo'
import { todoMachine } from 'xstate/todoMachine'
import { useMachine } from '@xstate/react'

function App() {
  const [state, send] = useMachine(todoMachine)
  const { todos, id, text } = state.context

  return (
    <div className="bg-white">
      <Todo
        todos={todos}
        toggleTodo={(completed) => send({ type: 'TOGGLE', completed })}
        addTodo={(text) => send('ADD_TODO', { text })}
        onChangeTodo={(text) => send({ type: 'ON_CHANGE', text })}
        text={text as string}
        id={id as number}
        deleteTodo={(todo) => send({ type: 'DELETE', todo })}
      />
    </div>
  )
}

export default App
