
import {
    FETCH_SEATS_SUCCESS,
    RESERVE_SEATS_REQUEST,
    RESERVE_SEATS_SUCCESS,
    SET_LOADING, SET_NUM_OF_SEATS
} from "./types";


export const reducer = (state, action) => {
    switch (action.type) {
        case FETCH_SEATS_SUCCESS:
            return {
                ...state,
                seatsData: action.payload,
                isLoading: false,
            };

        case RESERVE_SEATS_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case RESERVE_SEATS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                seatsData: state.seatsData.map(seat => {
                    if (action.payload.includes(seat.seatNo)) {
                        return { ...seat, isBooked: true };
                    }
                    return seat;
                }),
            };

       
        case SET_NUM_OF_SEATS:
            return {
                ...state,
                numOfSeats: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };
        default:
            return state;
    }
};
