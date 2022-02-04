import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ResultCard = (props) => {
  return (
    <article>
      <div className="business">
        <img className="businessImg"src={props.image}alt={props.alias}></img>
        <div className="businessDetails">
          <p className="distance">{props.distance}</p>
          <p><a className="name" href={props.url}>{props.name}</a></p>
          <p><span className="price">{props.price}</span><span>&#8226;</span><span className="rating">Rating: {props.rating}</span></p>
          <p className="Address">{props.address}</p>
          <p className="phone">{props.phone}</p>
          <button className="add-comment">Show Comments</button>
        </div>
      </div>
        {props.loggedIn ?
        <div className="buttonContainer">
        <button className="addFav" onClick={() => props.addFavAndGetFav(props.businessID)}>Favorite</button>
        <button className="comment" onClick={props.addComment}>Comment</button>
        <CopyToClipboard text={props.url}>
          <button className="share" onClick={(e) => {e.target.innerText = 'Copied!'; setTimeout(() => {e.target.innerText = 'Share'}, 1000) }}>Share</button>
        </CopyToClipboard>
        </div> :
        <div className="buttonContainer">
        <CopyToClipboard text={props.url}>
          <button className="share" onClick={(e) => {e.target.innerText = 'Copied!'; setTimeout(() => {e.target.innerText = 'Share'}, 1000) }}>Share</button>
        </CopyToClipboard>
        </div>}
    </article>
  );
}

export default ResultCard;