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
        <h1 class="text-3xl font-bold">Seder Hayom</h1>
        <div>
          <div class="flex flex-col flex-row items-center">
            <button class="bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full"onClick={handleToday}>Today</button>
          </div >
          <div class="flex flex-row justify-center items-center">
            <button onClick={() => changeDate('prev')}><svg class="h-8 w-8 text-blue-900 hover:text-blue-800"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="5" y1="12" x2="9" y2="16" />  <line x1="5" y1="12" x2="9" y2="8" /></svg></button>
            <p class="text-lg">{state.currentDate.toLocaleDateString()}</p>
            <button onClick={() => changeDate('next')}><svg class="h-8 w-8 text-blue-900 hover:text-blue-800"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="5" y1="12" x2="19" y2="12" />  <line x1="15" y1="16" x2="19" y2="12" />  <line x1="15" y1="8" x2="19" y2="12" /></svg></button>
          </div>
        </div>
      </header>
    );
}

export default Header
