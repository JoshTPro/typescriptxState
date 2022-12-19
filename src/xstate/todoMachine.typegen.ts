// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  internalEvents: {
    'xstate.init': { type: 'xstate.init' }
  }
  invokeSrcNameMap: {}
  missingImplementations: {
    actions: never
    delays: never
    guards: never
    services: never
  }
  eventsCausingActions: {
    addTodo: 'ADD_TODO'
    changeTodo: 'ON_CHANGE'
    delete: 'DELETE'
    toggle: 'TOGGLE'
  }
  eventsCausingDelays: {}
  eventsCausingGuards: {}
  eventsCausingServices: {}
  matchesStates: 'active' | 'completed'
  tags: never
}
