import React from 'react'
import PropTypes from 'prop-types'

const Rating = ({value, text, color}) => {
    return (
        <div className='rating'>
            {
                new Array(5).fill('')
                            .map((_, i) => i + 1)
                            .map((currentStar) => (
                                <span key={currentStar}>
                                    <i style={{color}} 
                                       className={value >= currentStar 
                                                        ? 'fas fa-star' 
                                                        : value >= currentStar - 0.5 
                                                        ? 'fas fa-star-half-alt' 
                                                        : 'far fa-star'}></i>
                                </span>
                            ))
            }
           {text && (<span className='rating_text'>({text})</span>)}
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8e825'
}

Rating.protoType = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}

export default Rating
