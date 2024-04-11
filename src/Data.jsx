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
  const [studyType, setStudyType] = useState();
  const [startDate, setStartDate] = useState(d.currentDate);
  const [endDate, setEndDate] = useState();

  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  const changeText = (event) =>{
    setText(event.target.value);
  }

  const changeStudyType = (event) =>{
    setStudyType(event.target.value);
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
        console.log(newSedarim);
        localStorage.setItem("sedarim", JSON.stringify(newSedarim));
        return newSedarim;
      });
      let loop = new Date(startDate);
      let newTasks = [...t.tasks];
      while (loop.getDate() <= endDate.getDate()) {
        let newTask = {
          id: crypto.randomUUID(),
          name: newSeder.name,
          date: loop.toLocaleDateString(),
          isSeder: true,
          sederId: newSeder.id
        };
        newTasks = [...newTasks, newTask];
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
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
        console.log(index);
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
        console.log(length);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchLength();
  }, [text, index]);

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
        {index.map((i) =>{
          return <option key={i}>
                  By {i}
                 </option>
        })}
        <option key={'byDate'}> 
          By Date
        </option>
      </select>
    </label>

    <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        startDate={startDate}
      />
      <DatePicker
        selectsEnd
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        endDate={endDate}
        startDate={startDate}
        minDate={startDate}
      />
      <button onClick={() => createSeder()}>Create Seder</button>
   </div>
    );
}

export default dataComp;