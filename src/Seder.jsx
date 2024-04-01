import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Data from './Data.jsx';

function Sedarim({d, t}){
    const [sedarim, setSeder] = useState([]);

    const createSeder = (event) => {
        event.preventDefault();
          const newSeder = {
              id: crypto.randomUUID(),
            name: taskRef.current.value,
            startDate: d.currentDate.toLocaleDateString(),
          };
          setSeder(() => {
            const newSedarim = [...sedarim, newSeder];
            return newSedarim;
          });
      };

    return (
        <div>
            <Popup trigger=
                {<button> Create Seder </button>} 
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content'>
                                <Data/>
                                <button onClick=
                                    {() => createSeder()}>
                                        Create Seder
                                </button>
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