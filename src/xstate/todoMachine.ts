import { assign, createMachine } from 'xstate'

export interface TodoItem {
  id: number
  text: string
  isCompleted: boolean
}

interface ToggleEvent {
  type: 'TOGGLE'
  completed: TodoItem
}
interface AddEvent {
  type: 'ADD_TODO'
  text: string
}
interface OnChangeEvent {
  type: 'ON_CHANGE'
  text: string
}
interface DeleteEvent {
  type: 'DELETE'
  todo: TodoItem
}
type TodoAppEvents = ToggleEvent | AddEvent | OnChangeEvent | DeleteEvent

export const todoMachine = createMachine(
  {
    id: 'todo',
    initial: 'active',
    schema: {
      context: {
        text: '',
        todos: [] as TodoItem[]
      },
      events: {} as TodoAppEvents
    },
    // https://xstate.js.org/docs/guides/typescript.html#typegen
    // we don't use it in grizzlystudio project, but in this case we must do it
    tsTypes: {} as import('./todoMachine.typegen').Typegen0,
    context: {
      text: '',
      todos: []
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
          const id = event.completed.id
          const todo = context.todos.find((todo) => todo.id === id)
          if (todo) {
            todo.isCompleted = !todo.isCompleted
          }
          return [...context.todos]
        }
      }),
      delete: assign({
        todos: (context, event) => {
          return context.todos.filter((todo) => todo.id !== event.todo.id)
        }
      }),
      addTodo: assign({
        todos: (context, event) => {
          const text = event.text
          const id = context.todos.length
          const todo = { id, text, isCompleted: false }
          return [...context.todos, todo]
        }
      }),
      changeTodo: assign({
        text: (_context, event) => {
          return event.text
        }
      })
    }
  }
)
