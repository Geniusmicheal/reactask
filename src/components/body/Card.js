import React from 'react'
import PropTypes from 'prop-types';

function Card({task_: {name, link, description}}) {
    return (
        <div className="card">
            <p>{name}</p>
            <p>{description}</p>
            <p><a href={link}>Use Template</a></p>
        </div>
    )
}


Card.propTypes = { task_: PropTypes.object.isRequired };
  
export default Card

