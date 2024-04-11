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
        <div>
            {sedarim.map((seder) => {
                      return (
                        <div key={seder.id}> 
                              <label>
                                <input type="checkbox" />
                                <span>{seder.name}</span>
                                <button className="close-button" aria-label="Close alert" type="button" data-close onClick={() => removeSeder(seder.id)}>&times;</button>
                              </label>
                        </div>
                          );
                    })}
            <Popup trigger=
                {<button> Create Seder </button>} 
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
    )
}

export default Sedarim