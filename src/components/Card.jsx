import React from 'react'

const Card = ({ children, className = '', ...props }) => {
  return (
    <article className={`card ${className}`} {...props}>
      {children}
    </article>
  )
}

export default Card

