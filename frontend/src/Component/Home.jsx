import React, { useContext } from 'react';
import Nav from '../Conponent2/Nav';
import { DataContext } from '../Context/DataProvider';
import Card from '../Conponent2/Card';


function Home(props) {
    
        const {listingData, setListingData,newList} = useContext(DataContext);
        console.log("home",listingData);
        
    
    
    return (
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"2rem"}} >
        
            <div style={{width:"100%" ,position:"sticky",top:'0',zIndex:"999", backgroundColor: "white"}}><Nav></Nav></div>
                             <div style={{display:"flex",width:"80%",flexWrap:"wrap"}}>

                {
                  listingData &&  newList.map((item)=>(
                 
                    
                      <Card title={item.title} description={item.description} rent={item.rent} city={item.city}
                      landMark={item.landMark} image1={item.image1} image2={item.image2} image3={item.image3} id={item._id}
                      ratings={item.ratings} isBooked={item.isBooked} host={item.host} category={item.category}/>

                      )  )
                }
            </div>
            
        </div>
        
    );
}

export default Home;