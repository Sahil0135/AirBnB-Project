import React, { useContext } from 'react';
import { DataContext } from '../Context/DataProvider';
import '../CSS/ListingPage3.css'; // External CSS file
import { useNavigate } from 'react-router-dom';

function ListingPage3() {
    const {
        city, landMark, title, rent, category, description,
        addListing, frontImage1, frontImage2, frontImage3,
    adding} = useContext(DataContext);

    let navigate=useNavigate();

    return (
        <div className="listing-container">
                    <h3 className="listing-back" onClick={() => navigate("/listing2")}>← Back</h3>

            <h2 className="location-text">
                In {landMark.toUpperCase()}, {city.toUpperCase()}
            </h2>

            <div className="image-box">
                <div className="top-image-wrapper">
                    <img src={frontImage1} alt="Main" className="top-image" />
                </div>
                <div className="bottom-images">
                    <img src={frontImage2} alt="2" />
                    <img src={frontImage3} alt="3" />
                </div>
            </div>

            <h3>{title.toUpperCase()}, {category.toUpperCase()}, {landMark.toUpperCase()}</h3>
            <h3>{description.toUpperCase()}</h3>
            <h3>Rs. {rent}</h3>

            <button className="add-button" onClick={addListing} disabled={adding}>
               {adding?"Adding..":"ADD"} </button>
        </div>
    );
}

export default ListingPage3;


