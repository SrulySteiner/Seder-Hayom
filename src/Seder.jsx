import React, {useState, useEffect} from 'react';
import Popup from 'reactjs-popup';
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
                                    <svg class="h-6 w-6 text-black hover:text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" />  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
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
                                <div class="absolute bottom-0 right-1 hover:text-white text-grey border-grey hover:bg-grey">
                                    <button onClick=
                                        {() => close()}>
                                      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 122.879 122.879" enableBackground="new 0 0 122.879 122.879" xmlSpace="preserve"><g><path fill-rule="evenodd" clipRule="evenodd" fill="#FF4141" d="M61.44,0c33.933,0,61.439,27.507,61.439,61.439 s-27.506,61.439-61.439,61.439C27.507,122.879,0,95.372,0,61.439S27.507,0,61.44,0L61.44,0z M73.451,39.151 c2.75-2.793,7.221-2.805,9.986-0.027c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.076,12.249 c2.729,2.77,2.689,7.257-0.08,10.022c-2.773,2.765-7.23,2.758-9.955-0.013L61.446,71.54L49.428,83.728 c-2.75,2.793-7.22,2.805-9.986,0.027c-2.763-2.776-2.776-7.293-0.027-10.084L51.48,61.434L39.403,49.185 c-2.728-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.953,0.013l11.997,12.165L73.451,39.151L73.451,39.151z"/></g></svg>
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