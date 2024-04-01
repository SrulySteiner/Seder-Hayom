import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function dataComp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('Tanakh');
  const [texts, setTexts] = useState([]);
  const [text, setText] = useState('Genesis');
  const [index, setIndex] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  const changeText = (event) =>{
    setText(event.target.value);
  }

  const changeStudyType = (event) =>{
    console.log(event.target.value);
  }

  const categories = ['Tanakh', 'Mishnah', 'Talmud', 'Midrash', 'Halakhah', 'Kabbalah', 'Jewish Thought', 'Tosefta', 'Chasidut', 'Musar', 'Responsa'];
  
  useEffect(() => {
    async function fetchData() {
      try {
        const address = 'https://www.sefaria.org/api/shape/' + category;
        const response = await fetch(address);
        const data = await response.json();
        setData(data);
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
        setIndex(data.sectionNames.map(i => i));
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchIndex();
  }, [category, text]);

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
        {categories.map((c) =>{
          return <option key={c}>
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
   </div>
    );
}

export default dataComp;