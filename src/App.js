import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://course-api.com/react-tours-project');

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const removeTour = (id) =>{
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const tours = JSON.parse(data.contents);  
      setTours(tours);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchTours();
  }, []);

  if(loading){
    return (<main>
      <Loading />
    </main>
  );
};

if(tours.length === 0){
  return (
    <div className='title'>
      <h2>No Tours Left</h2>
      <button className='btn' onClick={() =>{
        fetchTours();
      }}>Refresh Tours</button>
    </div>
  )
}
  return <main>
    <Tours tours={tours} removeTour={removeTour}/>
  </main>
}

export default App
