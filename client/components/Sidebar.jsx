import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapDispatchToProps = (dispatch) => ({
  getResults: (location, radius, categories, attributes) => {
    dispatch(actions.getResults(location, radius, categories, attributes));
  }
});

const Sidebar = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    //possibly refactor?
    //run a test and console log to better understand
    const location = document.querySelector('input[name="location"]').value;
    const radius = document.querySelector('select[name="radius"]').value;
    
    const checkboxes = document.querySelectorAll('input[class=categories]:checked');
    let categories = '';
    checkboxes.forEach((el) => categories += ',' + el.name);
    categories = categories.slice(1);

    const accessible = document.querySelectorAll('input[class=accessibility]:checked');
    let attributes = '';
    accessible.forEach((el)=> attributes += ',' + el.name);
    attributes = attributes.slice(1);

    props.getResults(location, radius, categories, attributes);
  }
  //  onSubmit={() => {return false}}
  return (
    <aside>
      <form>
        <div className="location-and-radius">
          <div className="form-element">
            <label htmlFor="location" className="side-header">Your Address or Zipcode 
              <input type="text" name="location" placeholder="eg. 123 Main Street, New York, NY, 10036 or 90210" id = "location"></input>
            </label><br/>
          </div>
        
          <div className="form-element">
            <label htmlFor="radius" className="side-header">Search Radius 
              <select name="radius" id ='radius'>
                <option value=".5" selected >less than 1 mile</option>
                <option value="1">1 mile</option>
                <option value="5">5 miles</option>
                <option value="10">10 miles</option>
                <option value="25">25 miles</option>
              </select>
            </label><br/>
          </div>
        </div>

        <div className="filters">
          <p className="side-header">What type of locations are you looking for?</p>
          <div className="checkboxes">
            <div className="checkbox">
              <label htmlFor="Galleries">
              <input className="categories" type="checkbox" name="galleries" id="Galleries"></input>
              Art Galleries</label><br/>
            </div>

            <div className="checkbox">
             <label htmlFor="Bar">
              <input className="categories" type="checkbox" name="bars" id="Bar"></input>
              Bar</label><br/>
            </div>
          
            <div className="checkbox">
              <label htmlFor="Coffee &amp; Tea">
              <input className="categories" type="checkbox" name="coffee" id="Coffee &amp; Tea"></input>
              Coffee &amp; Tea</label><br/>
            </div>
          
            <div className="checkbox">
              <label htmlFor="Desserts">
              <input className="categories" type="checkbox" name="desserts" id="Desserts"></input>
              Desserts</label><br/>
            </div>
          
            <div className="checkbox">
              <label htmlFor="Restaurants">
              <input className="categories" type="checkbox" name="restaurants" id="Restaurants"></input>
              Restaurants</label><br/>
            </div>

            <div className="checkbox">
              <label htmlFor="Cinema">
              <input className="categories" type="checkbox" name="movietheaters" id="Cinema"></input>
              Cinema</label><br/>
            </div>

            <div className="checkbox">
              <label htmlFor="Music Venues">
              <input className="categories" type="checkbox" name="musicvenues" id="Music Venues"></input>
              Music Venues</label><br/>
            </div>

            <div className="checkbox">
              <label htmlFor="Shopping">
              <input className="categories" type="checkbox" name="shopping" id="Shopping"></input>
              Shopping</label><br/>
            </div>

          </div>

          <p className="side-header">Accessibility</p>
          <div className="checkboxes">

            <div className="checkbox">
              <label className="access" htmlFor="Gender Neutral">
              <input className="accessibility" type="checkbox" name="gender_neutral_restrooms" id="Gender Neutral"></input>
              <div>Gender Neutral<br/> Restrooms</div></label><br/>
            </div>

            <div className="checkbox">
              <label htmlFor="Reservation">
              <input className="accessibility" type="checkbox" name="reservation" id="Reservation"></input>
              Reservations</label><br/>
            </div>

            <div className="checkbox">
              <label className="access" htmlFor="Wheelchair Accessible">
              <input className="accessibility" type="checkbox" name="wheelchair_accessible" id="Wheelchair Accessible"></input>
              <div>Wheelchair<br/> Accessible</div></label><br/>
            </div>
          
            <div className="checkbox">
              <label htmlFor="Open To All">
              <input className="accessibility" type="checkbox" name="open_to_all" id ="Open To All"></input>
              Open To All</label><br/>
            </div>

          </div>

        </div>
        
        <button id="search" onClick={handleClick}>Search</button>

      </form>
    </aside>
  )
};

export default connect(null, mapDispatchToProps)(Sidebar);