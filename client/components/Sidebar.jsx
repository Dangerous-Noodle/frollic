import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapDispatchToProps = (dispatch) => ({
  getResults: (location, radius, categories) => {
    dispatch(actions.getResults(location, radius, categories));
  }
});

const Sidebar = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    
    //possibly refactor?
    //run a test and console log to better understand
    const location = document.querySelector('input[name="location"]').value;
    const radius = document.querySelector('select[name="radius"]').value;
    const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    let categories = '';
    checkboxes.forEach((el) => categories += ',' + el.name);
    categories = categories.slice(1);
    props.getResults(location, radius, categories);
  }
  //  onSubmit={() => {return false}}
  return (
    <aside>
      <form>
        <div className="location-and-radius">
        <div className="form-element">
        <label htmlFor="location" className="side-header">Your Address or Zipcode</label><br/>
        <input type="text" name="location" placeholder="eg. 123 Main Street, New York, NY, 10036 or 90210"></input><br/>
        </div>
        
        <div className="form-element">
        <label htmlFor="radius" className="side-header">Search Radius</label><br/>
        <select name="radius">
          <option value=".5">less than 1 mile</option>
          <option value="1">1 mile</option>
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="25">25 miles</option>
        </select><br/>
        </div>
        </div>

        <div className="filters">
          <p className="side-header">What type of locations are you looking for?</p>
          <div className="checkboxes">
            <div className="checkbox">
            <input type="checkbox" name="galleries"></input>
            <label htmlFor="Galleries">Art Galleries</label><br/>
            </div>

            <div className="checkbox">
            <input type="checkbox" name="bars"></input>
            <label htmlFor="Bar">Bar</label><br/>
            </div>
          
            <div className="checkbox">
            <input type="checkbox" name="coffee"></input>
            <label htmlFor="Coffee &amp; Tea">Coffee &amp; Tea</label><br/>
            </div>
          
            <div className="checkbox">
            <input type="checkbox" name="desserts"></input>
            <label htmlFor="Desserts">Desserts</label><br/>
            </div>
          
            <div className="checkbox">
            <input type="checkbox" name="restaurants"></input>
            <label htmlFor="Restaurants">Restaurants</label><br/>
            </div>

            <div className="checkbox">
            <input type="checkbox" name="movietheaters"></input>
            <label htmlFor="Cinema">Cinema</label><br/>
            </div>

            <div className="checkbox">
            <input type="checkbox" name="musicvenues"></input>
            <label htmlFor="Music Venues">Music Venues</label><br/>
            </div>

            <div className="checkbox">
            <input type="checkbox" name="shopping"></input>
            <label htmlFor="Shopping">Shopping</label><br/>
            </div>

          </div>
        </div>
        <button id="search" onClick={handleClick}>Search</button>

      </form>
    </aside>
  )
};

export default connect(null, mapDispatchToProps)(Sidebar);