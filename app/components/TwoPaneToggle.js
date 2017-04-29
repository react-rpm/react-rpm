import React, { PropTypes } from 'react';



const TwoPaneToggle = (props) => {

  const {twoGraphsAreActive, handleChange} = props

  return (
    <div id='two-pane-toggle'>
      <label>
        Single Graph: 
        <input type="radio" value='toggleSingleGraph' onChange={()=>{handleChange(false)}} checked={!twoGraphsAreActive} />
      </label>
      <label>
        Double Graph: 
        <input type="radio" value='toggleTwo' onChange={()=>{handleChange(true)}} checked={twoGraphsAreActive} />
      </label>
    </div>
  )
}

export default TwoPaneToggle;