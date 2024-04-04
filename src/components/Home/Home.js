import React,{ useState,useEffect} from 'react';
import '../Home/Home.css'
import { useNavigate } from 'react-router-dom';
 
function Home() {
  const navigate = useNavigate();

  const cardList ={
    "cards":[
      {
        heading:'Farmers'
      },
      {
        heading:'Daily Production'
      },
      {
        heading:'Products'
      },
      {
        heading:'Customer Details'
      }
    ]
  }
 
  const [cards,setcards] = useState([]);
  useEffect(() => {
     setcards(cardList.cards)
   },[]);

   const handleClick = (heading) => {
    debugger;
     if (heading ==='Farmers') {                                                                         
      navigate('/FarmerList');
    }   else
    if(heading==='Daily Production'){
      navigate('/DailyProductionList');
    }  
    
    if(heading==='Products'){
      navigate('/products');
    }  
    if(heading==='Customer Details'){
      navigate('/CustomerDetails');
    }  
  };

  return (
    <div> 
     <div className='Card-wrap'>
{
  cards &&
  cards.map((item,index)=>(
    <div className='card' key={index}>
    <h4  onClick={() => handleClick(item.heading)}>{item.heading}</h4>
    </div>
  ))
}
       </div>
    </div>
  )
}

export default Home



