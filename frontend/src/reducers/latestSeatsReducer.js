// Action types
export const UPDATE_LATEST_SEATS = 'UPDATE_LATEST_SEATS';
export const GET_LATEST_SEATS = 'GET_LATEST_SEATS';


export const initialState = {
  latestSeats: []
};

export const latestSeatsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_LATEST_SEATS:
      return {
        ...state,
        latestSeats: action.payload
      };
    case GET_LATEST_SEATS:
      return {
        ...state,
        latestSeats: action.payload
      };
    default:
      return state;
  }
};
