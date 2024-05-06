import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
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
            <div class="flex grid flex-col space-y-4">
                {sedarim.map((seder) => {
                      return (
                        <div class="flex flex-row justify-between" key={seder.id}> 
                                <p class="text-white">{seder.name}</p>
                                <button class="bg-white flex-no-shrink p-2 ml-2 border-1 rounded text-black border-red opacity-100 hover:outline outline-blue-500" aria-label="Close alert" type="button" onClick={() => removeSeder(seder.id)}>Delete</button>
                        </div>
                          );
                    })}
            </div>
            <div class="absolute bottom-0">
                <Popup class="flex-grow" trigger=
                    {<button class="bg-white-500 flex-no-shrink p-2 ml-2 border-1 rounded text-white border-red opacity-100 hover:text-black hover:bg-white" aria-label="Close alert">+ Create Seder </button>} 
                    modal nested>
                    {
                        close => (
                            <div className='modal'>
                                <div className='content'>
                                    <Data d = {d}
                                        t = {t}
                                        s = {{sedarim, setSeder}}/>
                                </div>
                                <div>
                                    <button onClick=
                                        {() => close()}>
                                            Close
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