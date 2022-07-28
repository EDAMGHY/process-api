function processReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'PROCESSES_SUCCESS':
      return {
        ...state,
        processes: payload,
        loading: false,
      };
    case 'GET_PROCESS':
      return {
        ...state,
        process: payload,
        loading: false,
      };
    case 'ADD_PROCESS':
      return {
        ...state,
        processes: [...state.processes, payload],
        loading: false,
      };
    case 'ADD_PROCESS_FAIL':
    case 'DELETE_PROCESS_FAIL':
    case 'GET_PROCESS_FAIL':
      return {
        ...state,
        msg: payload,
        loading: false,
      };
    case 'DELETE_PROCESS':
      return {
        ...state,
        processes: state.processes.filter((item) => item.processId !== payload),
        loading: false,
      };

    case 'PROCESSES_FAIL':
      return {
        ...state,
        processes: [],
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
export default processReducer;
