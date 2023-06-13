import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import BookingSection from './components/BookingSection';
import { reducer } from './reducers/Reducer';
import initialState from './reducers/IntialState';
import { FETCH_SEATS_SUCCESS, SET_LOADING } from './reducers/types';

const baseAPI = 'https://stormy-sunglasses-fly.cyclic.app/api/seats';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [latestSeats, setLatestSeats] = useState([])


  useEffect(() => {
    const getAllSeats = async () => {
      dispatch({ type: SET_LOADING, payload: true });
      try {
        const response = await fetch(`${baseAPI}/get/all`);
        const data = await response.json();
        dispatch({ type: FETCH_SEATS_SUCCESS, payload: data.seats });
      } catch (error) {
        console.error(error);
      }
      dispatch({ type: SET_LOADING, payload: false });
    };

    getAllSeats();
  }, [latestSeats]);

  const renderSeatDivs = (startSeat, seatsInRow) => {
    const seatDivs = [];

    for (let seat = startSeat; seat < startSeat + seatsInRow; seat++) {
      const seatData = state.seatsData.find(seatData => seatData.seatNo === seat);

      const seatDiv = (
        <div
          key={seat}
          className={`seat ${seatData && seatData.isBooked ? 'booked-seat' : 'available-seat'}`}
        >
          {seat}
        </div>
      );

      seatDivs.push(seatDiv);
    }

    return seatDivs;
  };

  const renderSeats = () => {
    const totalSeats = state.seatsData.length;
    const seatsPerRow = 7;
    const seatsInLastRow = totalSeats % seatsPerRow;

    const totalRows = Math.ceil(totalSeats / seatsPerRow);
    let seatNumber = 1;

    const seatRows = [];

    for (let row = 1; row <= totalRows; row++) {
      const seatsInRow = row === totalRows ? seatsInLastRow : seatsPerRow;

      const seatRow = (
        <div key={row} className="row">
          {renderSeatDivs(seatNumber, seatsInRow)}
        </div>
      );

      seatRows.push(seatRow);
      seatNumber += seatsInRow;
    }

    return seatRows;
  };

  const reserveSeats = async () => {
    if (!state.numOfSeats) {
      showToaster('Please enter the number of seats to book.');
      return;
    }
    else if (state.numOfSeats < 1) {
      showToaster('Please enter a number greater than or equal to 1.');
      return;
    }
    if (state.numOfSeats > 7) {
      showToaster('You can only book up to 7 seats at once.');
      return;
    }

    try {

      dispatch({ type: 'RESERVE_SEATS_REQUEST' });
      const response = await fetch(`${baseAPI}/book`, {
        method: 'POST',
        body: JSON.stringify({ numSeats: state.numOfSeats }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();
      console.log(responseData);

      if (responseData && responseData.message === 'Seats booked successfully') {
        showToaster(`Successfully booked ${state.numOfSeats} seat(s).`);
        dispatch({ type: 'RESERVE_SEATS_SUCCESS', payload: responseData.bookedSeats });
        setLatestSeats(responseData.bookedSeats)

      } else if (responseData.message === 'Seats not available') {
        showToaster(responseData.message);
      } else {
        showToaster(responseData.message);
      }
    } catch (error) {
      console.error(error);
    }
    dispatch({ type: 'SET_LOADING', payload: false });

  };


  const showToaster = message => {
    const toaster = document.getElementById('toaster');
    const alertMessage = toaster.getElementsByClassName('alert_message')[0];
    alertMessage.textContent = message;
    toaster.classList.add('show');

    setTimeout(() => {
      toaster.classList.remove('show');
    }, 3500);
  };


  const resetAllSeats = async () => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const response = await fetch(`${baseAPI}/reset`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      console.log(responseData);
      setLatestSeats([])
    } catch (error) {

    }
    dispatch({ type: SET_LOADING, payload: false });
  }



  return (
    <>
      <div id="toaster" className="toaster">
        <span className="alert_message"></span>
      </div>
      <h1>Seat Reservation</h1>

      <div className="main_container">
        <div className="seat-container">
          {state.isLoading ? (
            <p className="loading_text">Loading...</p>
          ) : (
            renderSeats()
          )}
        </div>

        <BookingSection
          numOfSeats={state.numOfSeats}
          setNumOfSeats={value => dispatch({ type: 'SET_NUM_OF_SEATS', payload: value })}
          reserveSeats={reserveSeats}
          isLoading={state.isLoading}
          bookedSeats={latestSeats}
          resetAllSeats={resetAllSeats}

        />
      </div>
    </>
  );
}


export default App;
