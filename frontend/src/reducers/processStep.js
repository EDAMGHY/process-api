function ProcessStepReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'PROCESSSTEPS_SUCCESS':
      return {
        ...state,
        processsteps: payload,
        loading: false,
      };
    case 'GET_PROCESSSTEP':
      return {
        ...state,
        processstep: payload,
        loading: false,
      };
    case 'ADD_PROCESSSTEP':
      return {
        ...state,
        processsteps: [...state.processsteps, payload],
        loading: false,
      };
    case 'ADD_PROCESSSTEP_FAIL':
    case 'DELETE_PROCESSSTEP_FAIL':
    case 'GET_PROCESSSTEP_FAIL':
      return {
        ...state,
        msg: payload,
        loading: false,
      };
    case 'DELETE_PROCESSSTEP':
      return {
        ...state,
        processsteps: state.processsteps.filter(
          (item) => item.process_stepId !== payload
        ),
        loading: false,
      };

    case 'PROCESSSTEPS_FAIL':
      return {
        ...state,
        processsteps: [],
        msg: payload,
        loading: false,
      };
    case 'RESET':
      return {
        ...state,
        msg: null,
      };

    default:
      return state;
  }
}
export default ProcessStepReducer;
