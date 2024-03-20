import React, { useState, useEffect } from 'react';

function dataComp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://www.sefaria.org/api/shape/Genesis');
        const data = await response.json();
        setData(JSON.stringify(data));
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    /*<div>
      {data.map((dataObj) => {
          return (
            <div key = {dataObj.id}
              style={{
                width: "15em",
                backgroundColor: "#35D841",
                padding: 2,
                borderRadius: 10,
                marginBlock: 10,
              }}
            >
              <p style={{ fontSize: 20, color: 'white' }}>{dataObj.name}</p>
            </div>
          );
        })}
    </div>*/
    <div>
           <pre>{data}</pre>
    </div>
  );
}

export default dataComp;

