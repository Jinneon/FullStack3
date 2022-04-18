import React from 'react'

const FilterP = ({header,name,hSearch}) => {
  return (
    <div>{header}<input value={name} onChange={hSearch} />
    </div>
  )
}

export default FilterP 