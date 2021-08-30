import { createMachine, interpret } from "xstate";

interface Context {}

enum EVENT_TYPES {
  START_ROUND = "start_round",
  PLAN = "plan_for_the_round",
  RESOLVE = "resolve",
  END_PHASE = "end_phase",
  END_GAME = "end_game",
}

type Events =
  | { type: EVENT_TYPES.START_ROUND }
  | { type: EVENT_TYPES.PLAN }
  | { type: EVENT_TYPES.RESOLVE }
  | { type: EVENT_TYPES.END_GAME }
  | { type: EVENT_TYPES.END_PHASE };

type TypeState = {
  value: GAME_STATES;
  context: Context;
};

enum GAME_STATES {
  SETUP = "game_setup",
  END_GAME = "end_game",
  ROUND = "round_start",
  STEP_PLANNING = "planning_step",
  STEP_RESOLVE = "resolve_step",
  STEP_END = "end_step",
  PHASE_DEVELOPMENT = "development_phase",
  PHASE_CONSTRUCTION = "construction_phase",
  PHASE_ACTION = "action_phase",
  PHASE_PRODUCTION = "production_phase",
  PHASE_RESEARCH = "research_phase",
}

const phases = {
  [GAME_STATES.PHASE_DEVELOPMENT]: {
    on: {
      [EVENT_TYPES.END_PHASE]: { target: GAME_STATES.PHASE_CONSTRUCTION },
      [EVENT_TYPES.END_GAME]: { target: GAME_STATES.END_GAME },
    },
  },
  [GAME_STATES.PHASE_CONSTRUCTION]: {
    on: {
      [EVENT_TYPES.END_PHASE]: { target: GAME_STATES.PHASE_ACTION },
      [EVENT_TYPES.END_GAME]: { target: GAME_STATES.END_GAME },
    },
  },
  [GAME_STATES.PHASE_ACTION]: {
    on: {
      [EVENT_TYPES.END_PHASE]: { target: GAME_STATES.PHASE_PRODUCTION },
      [EVENT_TYPES.END_GAME]: { target: GAME_STATES.END_GAME },
    },
  },
  [GAME_STATES.PHASE_PRODUCTION]: {
    on: {
      [EVENT_TYPES.END_PHASE]: { target: GAME_STATES.PHASE_RESEARCH },
      [EVENT_TYPES.END_GAME]: { target: GAME_STATES.END_GAME },
    },
  },
  [GAME_STATES.PHASE_RESEARCH]: {
    on: {
      [EVENT_TYPES.END_PHASE]: { target: GAME_STATES.STEP_END },
      [EVENT_TYPES.END_GAME]: { target: GAME_STATES.END_GAME },
    },
  },
};

const steps = {
  [GAME_STATES.STEP_PLANNING]: {
    on: {
      [EVENT_TYPES.RESOLVE]: { target: GAME_STATES.STEP_RESOLVE },
    },
  },
  [GAME_STATES.STEP_RESOLVE]: {
    initial: GAME_STATES.PHASE_DEVELOPMENT,
    states: phases,
  },
  [GAME_STATES.STEP_END]: {
    on: {
      [EVENT_TYPES.START_ROUND]: { target: GAME_STATES.ROUND },
    },
  },
};

const stateMachine = createMachine<Context, Events, TypeState>(
  {
    id: "terraforming_mars_ares_expedition",
    initial: GAME_STATES.SETUP,
    states: {
      [GAME_STATES.SETUP]: {
        on: {
          [EVENT_TYPES.START_ROUND]: { target: GAME_STATES.ROUND },
        },
      },
      [GAME_STATES.ROUND]: {
        initial: GAME_STATES.STEP_PLANNING,
        states: steps,
      },
      [GAME_STATES.END_GAME]: {},
    },
  },
  {
    actions: {
      foo: (context, event): void => {
        console.log(context, event);
      },
    },
  }
);

const service = interpret(stateMachine);
console.log(service);