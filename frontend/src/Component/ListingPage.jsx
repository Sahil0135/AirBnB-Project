
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/DataProvider';
import '../CSS/ListingPage.css'; // ✅ Import CSS

function ListingPage() {
  const navigate = useNavigate();
  const {
    title, setTitle,
    description, setDescription,
    rent, setRent,
    city, setCity,
    landMark, setLandMark,
    frontImage1, setFrontImage1,
    frontImage2, setFrontImage2,
    frontImage3, setFrontImage3,
    backImage1, setBackImage1,
    backImage2, setBackImage2,
    backImage3, setBackImage3
  } = useContext(DataContext);

  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setBackImage1(file);
    setFrontImage1(URL.createObjectURL(file));
  };

  const handleImage2 = (e) => {
    const file = e.target.files[0];
    setBackImage2(file);
    setFrontImage2(URL.createObjectURL(file));
  };

  const handleImage3 = (e) => {
    const file = e.target.files[0];
    setBackImage3(file);
    setFrontImage3(URL.createObjectURL(file));
  };

  return (
    <div className="listing-container">
      <form
        className="listing-form"
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/listing2');
        }}
      >
        <h3 className="listing-back" onClick={() => navigate("/")}>← Back</h3>
        <h3 className="listing-heading">Set Your Home</h3>

        <label>Title</label>
        <input type="text" placeholder='_bhk house or best title' required onChange={(e) => setTitle(e.target.value)} value={title} />

        <label>Description</label>
        <textarea required onChange={(e) => setDescription(e.target.value)} value={description}></textarea>

        <label>Image 1</label>
        <input type="file" accept="image/*" required onChange={handleImage1} />

        <label>Image 2</label>
        <input type="file" accept="image/*" required onChange={handleImage2} />

        <label>Image 3</label>
        <input type="file" accept="image/*" required onChange={handleImage3} />

        <label>Rent</label>
        <input type="number" placeholder='Rs.__/day' required onChange={(e) => setRent(e.target.value)} value={rent} />

        <label>City</label>
        <input type="text" placeholder='city,country' required onChange={(e) => setCity(e.target.value)} value={city} />

        <label>Landmark</label>
        <input type="text" required onChange={(e) => setLandMark(e.target.value)} value={landMark} />

        <button style={{padding:"4px"}} type="submit">Next</button>
      </form>
    </div>
  );
}

export default ListingPage;















