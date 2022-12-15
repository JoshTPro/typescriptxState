import { Todo } from 'components/Todo'
import { assign, createMachine } from 'xstate'

type TodoContext = {
  todos: Todo[]
  id?: number
  text?: string
  isCompleted?: boolean
  isDeleted?: boolean
}

export const todoMachine = createMachine<TodoContext>(
  {
    id: 'todo',
    initial: 'active',
    context: {
      todos: [
        { id: 0, text: 'First Todo', isCompleted: false, isDeleted: false }
      ]
    },
    states: {
      active: {
        predictableActionArguments: true,
        strict: true,
        on: {
          ADD_TODO: {
            target: 'active',
            actions: 'addTodo'
          },
          TOGGLE: { actions: 'toggle' },
          ON_CHANGE: { target: 'active', actions: 'changeTodo' },
          DELETE: { target: 'deleted', actions: 'delete' }
        }
      },
      completed: {
        on: {
          TOGGLE: { target: 'active', actions: 'toggle' },
          DELETE: 'deleted'
        }
      },
      deleted: { type: 'history' }
    }
  },
  {
    actions: {
      toggle: assign({
        todos: (context, event) => {
          const id = event.completed.id as number
          const todo = context.todos.find((todo) => todo.id === id)
          if (todo) {
            todo.isCompleted = !todo.isCompleted
          }
          return [...context.todos]
        }
      }),
      delete: assign({
        todos: (context, event) => {
          const id = event.todo.id as number
          const todo = context.todos.find((todo) => todo.id === id)
          if (todo) {
            todo.isDeleted = true
          }
          return context.todos.filter((todo) => todo.id !== id)
        }
      }),
      addTodo: assign({
        todos: (context, event) => {
          const text = event.text as string
          const id = context.todos.length
          const todo = { id, text, isCompleted: false, isDeleted: false }
          return [...context.todos, todo]
        }
      }),
      changeTodo: assign({
        text: (_context, event) => {
          return event.text as string
        }
      })
    }
  }
)
