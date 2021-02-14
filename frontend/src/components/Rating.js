import React from 'react'
import PropTypes from 'prop-types'

export const Rating = ({ rating, outOff }) => {
    return (
        <div className='rating'>
            <span>
                <i style={{ color:'rgb(245,180,0)' }} className={ 
                    rating>=1 
                    ? 'fas fa-star' 
                    : rating>=0.5 
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'
                    }/>
            </span>
            <span>
                <i style={{ color:'rgb(245,180,0)' }} className={ 
                    rating>=2 
                    ? 'fas fa-star' 
                    : rating>=1.5 
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'
                    }/>
            </span>
            <span>
                <i style={{ color:'rgb(245,180,0)' }} className={ 
                    rating>=3 
                    ? 'fas fa-star' 
                    : rating>=2.5 
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'
                    }/>
            </span>
            <span>
                <i style={{ color:'rgb(245,180,0)' }} className={ 
                    rating>=4 
                    ? 'fas fa-star' 
                    : rating>=3.5 
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'
                    }/>
            </span>
            <span>
                <i style={{ color:'rgb(245,180,0)' }} className={ 
                    rating>=5 
                    ? 'fas fa-star' 
                    : rating>=4.5 
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'
                    }/>
            </span>
            <span style={{ marginLeft:'1%' }}>{ outOff && outOff }</span>
        </div>
    )
}

Rating.prototypes = {
    rating : PropTypes.number.isRequired,
    outOff : PropTypes.string.isRequired
}