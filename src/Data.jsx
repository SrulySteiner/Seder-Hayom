import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function addDays(date, days){
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

function dataComp({d, t, s}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('Tanakh');
  const [texts, setTexts] = useState([]);
  const [text, setText] = useState('Genesis');
  const [index, setIndex] = useState([]);
  const [length, setLength] = useState([]);
  const [studyType, setStudyType] = useState('Date');
  const [metric, setMetric] = useState();
  const [increment, setIncrement] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  const changeText = (event) =>{
    setText(event.target.value);
  }

  const changeStudyType = (event) =>{
    setStudyType(event.target.value.replace('By', '').trim());
    setMetric(event.target.value.replace('By', '').trim());
  }

  const changeIncrement = (event) =>{
    if(studyType == 'Date'){
      let daysBetween = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      let totalLength = event.target.value == index[0] ? length.length : length.reduce((a,b)=>a+b);
      let increment = Math.ceil(totalLength / daysBetween);
      setMetric(event.target.value);
      setIncrement(increment);
    }else if(studyType == index[0]){
      setMetric(studyType);
      setIncrement(event.target.valueAsNumber);
      let daysBetween = Math.ceil(length.length / increment);
      setEndDate(addDays(startDate, daysBetween));
    }else{
      setMetric(studyType);
      setIncrement(event.target.valueAsNumber);
      let daysBetween = Math.ceil(length.reduce((a,b) =>a+b) / increment);
      setEndDate(addDays(startDate, daysBetween));
    }
  }


  const createSeder = () => {
      const newSeder = {
          id: crypto.randomUUID(),
        name: text,
        studyType: studyType,
        startDate: startDate,
        endDate: endDate
      };
      s.setSeder(() => {
        const newSedarim = [...s.sedarim, newSeder];
        localStorage.setItem("sedarim", JSON.stringify(newSedarim));
        return newSedarim;
      });
      let loop = new Date(startDate);
      let newTasks = [...t.tasks];
      /*TODO: endDate, and therefore daysBetween, calculated based on study type - 
        if user selected 4 chapters a day, calculates the endDate for them
      */
      let totalLength = metric == index[0] ? length.length : length.reduce((a,b)=>a+b);
      console.log(totalLength);
      let dayStart = 1;
      let dayEnd = dayStart + increment - 1;
      while (loop.getDate() <= endDate.getDate() && dayStart <= totalLength) {
        console.log(dayEnd);
        let newTask = {
          id: crypto.randomUUID(),
          name: newSeder.name + ' ' + metric + ' ' + dayStart + '-' + dayEnd,
          date: loop.toLocaleDateString(),
          isSeder: true,
          sederId: newSeder.id
        };
        newTasks = [...newTasks, newTask];
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
        dayStart = dayEnd + 1;
        dayEnd = dayEnd + increment > totalLength ? totalLength : dayEnd + increment;
      }
      t.setTasks(() => {
        localStorage.setItem("tasks", JSON.stringify(newTasks));
        return newTasks;
      });
  };


  const categories = ['Tanakh', 'Mishnah', 'Talmud', 'Midrash', 'Halakhah', 'Kabbalah', 'Jewish Thought', 'Tosefta', 'Chasidut', 'Musar', 'Responsa'];
  
  useEffect(() => {
    async function fetchData() {
      try {
        const address = 'https://www.sefaria.org/api/shape/' + category;
        const response = await fetch(address);
        const data = await response.json();
        setTexts(data.map(e => e.title).filter(elm => elm));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [category]);

  useEffect(() => {
    async function fetchIndex() {
      try {
        const address = 'https://www.sefaria.org/api/index/' + text;
        const response = await fetch(address);
        const data = await response.json();
        setIndex(data.sectionNames);
        setMetric(index[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchIndex();
  }, [category, texts, text]);

  useEffect(() => {
    async function fetchLength() {
      try {
        const address = 'https://www.sefaria.org/api/shape/' + text;
        const response = await fetch(address);
        const data = await response.json();
        setLength(data[0].chapters);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchLength();
  }, [category, text, index]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
   <div class="flex flex-col flex-row justify-center">
    <label class="flex flex-auto ">Pick a Category:
      <select onChange={changeCategory}>
        {categories.map((c, index) =>{
          return <option key={index}>
                  {c}
                 </option>
        })}
      </select>
    </label>

    <label>Pick a Text:
      <select onChange={changeText}>
        {texts.map((t) =>{
          return <option key={t}>
                  {t}
                 </option>
        })}
      </select>
    </label>

    <label>Pick a Study Type:
      <select onChange={changeStudyType}>
      <option key={'byDate'}> 
          By Date
        </option>
        {index.map((i) =>{
          return <option key={i}>
                  By {i}
                 </option>
        })}
      </select>
    </label>
    <hr class="h-px my-1 bg-gray-300 border-0"/>
    {(studyType == 'Date') ? 
      <div>
        <label class="flex flex-col "> Pick Start and End:
          <div class="text-sm flex mb-4 items-center"> 
            <DatePicker
              selectsStart
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              startDate={startDate}/>
            <DatePicker
              selectsEnd
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              endDate={endDate}
              startDate={startDate}
              minDate={startDate}/>
          </div>
          </label>
        <label> Based on:
          <select onChange={changeIncrement}>
            <option></option>
            {index.map((i) =>{
              return <option key={i}>
                      {i}
                    </option>
            })}
          </select>       
        </label>
      </div>
       
     :
      <label>How many per day?
        <input type="number" id="metric" name="metric" min="1" max={length.length} defaultValue="1" onChange={changeIncrement}/>
      </label>  
    }
    <div class="flex flex-row items-center justify-center">
      <button class="h-12 w-32 border-2 rounded hover:text-blue-500 border-black hover:border-blue-500"onClick={() => createSeder()}>Create Seder</button>
    </div>
   </div>
    );
}

export default dataComp;