import React, { useState, useEffect } from 'react';

function Header({state}){

    const changeDate = (direction) => {
        const newDate = new Date(state.currentDate);
        if (direction === 'prev') {
          newDate.setDate(newDate.getDate() - 1);
        } else if (direction === 'next') {
          newDate.setDate(newDate.getDate() + 1);
        }
        state.setCurrentDate(newDate);
      };
    
      const handleToday = () => {
        state.setCurrentDate(new Date());
      };

    return(
        <header className="App-header">
        <h1>Seder Hayom</h1>
        <div>
          <div className="App-header">
            <button onClick={handleToday}>Today</button>
          </div >
          <div className="App-header">
            <button onClick={() => changeDate('prev')}>&lt;</button>
            <span>{state.currentDate.toLocaleDateString()}</span>
            <button onClick={() => changeDate('next')}>&gt;</button>
          </div>
        </div>
      </header>
    );
}

export default Header
