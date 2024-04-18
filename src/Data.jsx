import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [increment, setIncrement] = useState();
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
      setMetric(event.target.value);
      let totalLength = metric == index[0] ? length.length : length.reduce((a,b)=>a+b);
      let increment = Math.round(totalLength / daysBetween);
      console.log(increment);
      console.log(startDate);
      console.log(endDate);
      setIncrement(increment);
    }else if(studyType == index[0]){
      
    }else{

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
        //console.log(newSedarim);
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
      totalLength -= increment;
      while (loop.getDate() <= endDate.getDate()) {
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
        dayEnd = totalLength < increment ? dayEnd + totalLength : dayEnd + increment;
        totalLength = totalLength > increment ? totalLength - increment : 0;
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
        //console.log(index);
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
        //console.log(length);
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
   <div>
    <label>Pick a Category:
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
    {(studyType == 'Date') ? 
      <div>
        <label > Pick Start and End:
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
        </label>
        <label> Based on:
          <select onChange={changeIncrement}>
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
        <input type="number" id="metric" name="metric" min="1" max={length.length} onChange={changeIncrement} />
      </label>  
    }

      <button onClick={() => createSeder()}>Create Seder</button>
   </div>
    );
}

export default dataComp;