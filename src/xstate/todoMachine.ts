import { Machine, Typestate, Interpreter } from 'xstate'
// import { getXstateUtils, MachineStateSchemaPaths } from '../xstate.utils'
// import { gql, GetMicroAppQuery } from '../../../../api-services'
export interface ManagePageContext {
  microAppDetails?: GetMicroAppQuery['apps_by_pk']
  errors?: string
}

export interface MicroAppState {
  states: {
    idle: object
    loading: object
    loaded: object
    errors: object
  }
}

export type MicroAppEvents = { type: 'microApp.fetchData' }

export interface MicroAppTypestates extends Typestate<ManagePageContext> {
  context: ManagePageContext
  value: MachineStateSchemaPaths<MicroAppState['states']>
}

export type MicroAppInterpreter = Interpreter<
  ManagePageContext,
  MicroAppState,
  MicroAppEvents,
  MicroAppTypestates,
  any
>

const { createInvokablePromise, createXstateHooks: createMicroAppXstateHooks } =
  getXstateUtils<
    ManagePageContext,
    MicroAppEvents,
    MicroAppTypestates,
    MicroAppState
  >()

export { createMicroAppXstateHooks }

export const microAppMachine = Machine<
  ManagePageContext,
  MicroAppState,
  MicroAppEvents
>({
  context: {},
  preserveActionOrder: true,
  predictableActionArguments: true,
  id: 'microApp',
  initial: 'idle',
  strict: true,
  states: {
    idle: {
      on: {
        'microApp.fetchData': 'loading'
      }
    },
    loading: {
      invoke: createInvokablePromise({
        id: 'loading',
        src: async () => gql.getMicroApp({ microAppId: 2 }),
        onDoneTarget: 'loaded',
        onDoneAssignContext({ ctx, data }) {
          ctx.microAppDetails = data.apps_by_pk
        },
        onErrorTarget: 'errors'
      })
    },
    loaded: {},
    errors: {}
  }
})
