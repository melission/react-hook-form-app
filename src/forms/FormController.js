import React, {useState} from 'react';
import "./forms.css";
import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField'

const FormComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [hasBeenOnTropicalIsland, setHasBeenOnTropicalIsland] = useState(null);
  const [hasVisitedLandmark, setHasVisitedLandmark] = useState(null)
  const [hasStory, setHasStory] = useState(null);

  const handleHasStory = (e) => {
    setHasStory(e.target.value);
  }

  const handleIslandChange = (e) => {
    setHasBeenOnTropicalIsland(e.target.value);
  };

  const handleLandmarkChange = (e) => {
    setHasVisitedLandmark(e.target.value)
  }

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:7683/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log('Successfully submitted, data: ', result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className='form-block text' onSubmit={handleSubmit(onSubmit)}>
      <h3>Favourite Travel Destinations</h3>
        <p>All fields above are required</p>
      <div className='form-element'>
        <label className='form-element__name'>What is your favourite destination?</label>
        <input className='form__input'{...register("destination", {required: "It's a requiered field", pattern: /^[A-Za-z]+$/i})}></input>
      </div>
      <div className='form-element'>
        <label className='form-element__name'>Which country would you like to visit the most?</label>
        <input className='form__input'{...register("fav_country", {required: true})}></input>
      </div>
      {/* <div className='form-element'>
        <label className='form-element__name'>Have you ever been on a tropical island?
        If yes, which one was your favourite?</label>
        <input className='form__input'></input>
      </div> */}
        <div className='form-element'>
          <label className='form-element__name'>Have you ever been on a tropical island?
          </label>
          <div className='radio-element'{...register("was_on_trpical_island", {required: true})}>
              <input type='radio' className='form__input' name='tropicalIsland' value='yes' onChange={handleIslandChange} />
              <label for='yes'>Yes</label>
              <input type='radio' className='form__input' name='tropicalIsland' value='no' onChange={handleIslandChange} />
              <label for='no'>No</label>
          </div>
        </div>
        {hasBeenOnTropicalIsland === 'yes' && (
          <div className='form-element'>
            <label className='form-element__name'>Which one was your favourite?</label>
            <input className='form__input'{...register("on_what_tropical_island_a_person_has_been", {required: true})}></input>
          </div>
        )}
      <div className='form-element'>
        <label className='form-element__name'>Which continent have you not traveled to yet, but would love to explore?</label>
        <input className='form__input'{...register("not_visited_continent", {required: true})}></input>
      </div>
      {/* <div className='form-element'>
        <label className='form-element__name'>Do you prefer a beach vacation or a mountain retreat?</label>
        <input name='beach' type="radio" className='form__input'>Beach</input>
        <input name='mountains' type="radio" className='form__input'>Mountain</input>
      </div> */}
      <div className='form-element'>
        <label className='form-element__name'>Have you ever visited a famous landmark?</label>
        <div className='radio-element'{...register("has_visited_landmark", {required: true})}>
            <input type="radio" className='form__input' name='hasVisitedLandmark' value="yes" onChange={handleLandmarkChange} /> 
            <label for="yes">Yes</label>
            <input type="radio" className='form__input' name='hasVisitedLandmark' value="no" onChange={handleLandmarkChange} /> 
            <label for="no">No</label>
        </div>
      </div>
      {hasVisitedLandmark === "yes" && (
        <div className='form-element'>
            <label className='form-element__name'>Which one left the biggest impression on you?</label>
            <input className="form__input"{...register("impressiveLandmark", {required: true})}></input>
        </div>
      )}
      <div className='form-element'>
        <label className='form-element__name'>What is your favourite city to visit for cultural experience?</label>
        <input className='form__input'{...register('fav_city', {required: true})}></input>
      </div>
      <div className='form-element'>
        <label className='form-element__name'>Which type of accommodations do you prefer: hotels, resorts, or vacation rentals?</label>
        <select className='form__input'{...register("favouriteAccommodation", {required: true})}>
          <option value="hotels">Hotels</option>
          <option value="resorts">Resorts</option>
          <option value="rentals">Vacation rentals</option>
        </select>
      </div>
      <div className='form-element'>
        <label className='form-element__name'>When you travel, do you like to plan every detail in advance or to be spontaneous?</label>
        <select className='form__input'{...register("travelPlanning", {required: true})}>
          <option value="inAdvance">In advance prevails</option>
          <option value="spontaneous">Be spontaneous prevails</option>
        </select>
      </div>
      <div className='form-element'>
        <label className='form-element__name'>Which type of cuisine do you enjoy exploring the most during your travels?</label>
        <input className='form__input'{...register("favCuisine", {required: true})}></input>
      </div>
      <div className='form-element'>
        <label className='form-element__name'>What is your favourite outdore activity to do when on vacation?</label>
        <input className='form__input'{...register("favActivity", {required: true})}></input>
      </div>
      <div className='form-element'>
        <label className='form-element__name'>Do you prefer travelling solo, with family, or with friends?</label>
        <select className='form__input'{...register("travelCompany", {required: true})}>
          <option value="solo">Solo</option>
          <option value="withFamily">With Family</option>
          <option value="withFriends">With Friends</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className='form-element'>
        <label className='form-element__name'>Do you enjoy exploring historical sites and landmarks?</label>
        <input className='form__input'{...register("enjoyExporing", {required: true})}></input>
      </div>
      <div className='form-element'>
        <label className='form-element__name'>Which travel destination is your top recommendation to visit?</label>
        <input className='form__input'{...register("favDestnation", {required: true})}></input>
      </div>
      <div className='form-element'>
        <label className='form-element__name'{...register('has_story_to_share', {required: true})}>A funny story about travelling to share?</label>
        <div className='radio-element'>
          <input className='form__input' type='radio' name='hasStory' value='yes' onChange={handleHasStory} />
          <label for='yes'>Yes</label>
          <input className='form__input' type='radio' name='hasStory' value='no' onChange={handleHasStory} />
          <label for='no'>No</label>
        </div>
      </div>
      {hasStory === 'yes' && (
        <div className='form-element'>
          <label className='form-element__name'>Share it!</label>
          <TextField placeholder='the field is here simply for the sake of binding MIU with React-hook-form'></TextField>
        </div>
        )}
      <button className='form-button' type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
