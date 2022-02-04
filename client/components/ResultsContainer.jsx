import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ResultCard from './ResultCard.jsx'
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  searchResults: state.search.searchResults,
  firstRender: state.search.firstRender,
  loggedIn: state.search.loggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  addFav: (businessID) => {
    dispatch(actions.addFav(businessID));
  },
  addFavAndGetFav: (businessID) => {
    dispatch(actions.addFavAndGetFav(businessID));
  },
  addComment: (comment) => {
    dispatch(actions.addComment(comment));
  }
});

const ResultsContainer = (props) => {

  if (!props.searchResults.length && !props.firstRender) {
    return (
      <section id="splash">
        <h2>Sorry, no results found matching your query. <br/>Try expanding your search radius.</h2>
      </section>
    )
  } else if (!props.searchResults.length) {
    return (
      <section id="splash">
        <h1>fun with frollic</h1>
      </section>
    )
  }

  const resultCards = props.searchResults.map((resultObj, index) => {
    return <ResultCard
      businessID={resultObj.businessID}
      // addFav={props.addFav}
      addFavAndGetFav={props.addFavAndGetFav}
      addComment={props.addComment}
      key={index}
      result={resultObj}
      name={resultObj.name}
      alias={resultObj.alias}
      image={resultObj.image}
      url={resultObj.url}
      address={resultObj.address}
      phone={resultObj.phone}
      rating={resultObj.rating}
      price={resultObj.price}
      distance={resultObj.distance}
      loggedIn={props.loggedIn}
    />
  });
  
  return (
    <section id="results-container">
      <h3 id="result-word">Results: </h3>
      {resultCards}
    </section>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer);