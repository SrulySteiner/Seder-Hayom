import React, {useState, useEffect} from 'react';
import Popup from '../node_modules/.vite/deps/reactjs-popup.js';
//import 'reactjs-popup/dist/index.css';
import Data from './Data.jsx';

const getIntitalState = () =>{
    const sedarim = localStorage.getItem("sedarim");
    return sedarim ? JSON.parse(sedarim) : [];
}
function Sedarim({d, t}){
    const [sedarim, setSeder] = useState(getIntitalState);

    useEffect(() =>{
        localStorage.setItem("sedarim", JSON.stringify(sedarim));
      }, [sedarim]);

    function removeSeder(sederId) {
        const updatedSedarim = sedarim.filter(seder => seder.id !== sederId);
        const updatedTasks = t.tasks.filter(task => task.sederId !== sederId);
        setSeder(updatedSedarim);
        t.setTasks(updatedTasks);
      };

    return (
        <div class="h-100 w-full flex grid items-center justify-center bg-teal-lightest font-sans">
            <h1 class="mb-4 text-2xl font-bold underline underline-offset-8 leading-none tracking-tight text-white">My Sedarim</h1>
            <div class="flex grid flex-col space-y-4">
                {sedarim.map((seder) => {
                      return (
                        <div class="flex flex-row justify-between" key={seder.id}> 
                                <p class="text-white">{seder.name}</p>
                                <button class="bg-white flex-no-shrink p-1 ml-2 border-1 rounded text-black border-red opacity-100 hover:outline outline-blue-500" aria-label="Close alert" type="button" onClick={() => removeSeder(seder.id)}>
                                    <svg class="h-6 w-6 text-black hover:text-white"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                </button>
                        </div>
                          );
                    })}
                <Popup class="flex-grow" trigger=
                    {<button class="bg-white-500 flex-no-shrink p-2 ml-2 border-1 rounded text-white border-red opacity-100 hover:text-black hover:bg-white" aria-label="Close alert">+ Create Seder </button>} 
                    modal nested>
                    {
                        close => (
                            <div class="flex flex-row flex-col items-center justify-center">
                                <div class="flex flex-row flex-col items-center justify-center">
                                    <Data d = {d}
                                        t = {t}
                                        s = {{sedarim, setSeder}}/>
                                </div>
                                <div class="absolute bottom-0 right-1 flex-no-shrink p-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">
                                    <button onClick=
                                        {() => close()}>
                                            &#10006;
                                    </button>
                                </div>
                            </div>
                        )
                    }
                </Popup>
            </div>
        </div>
    )
}

export default Sedarim