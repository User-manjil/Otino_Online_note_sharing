import React, { useState } from 'react'

const FilterData = () => {

  const Filters = [
    { label: "Subjects", values: ['Physics', 'Math', 'Managements', 'Nepali'] },
    { label: "Level", values: ['Bachelor', 'Plus 2', 'Masters'] },
    { label: "Price", values: ['Free', 'Paid'] }
  ]

  // Stores selected filters
  const [selected, setSelected] = useState({})

  const handleCheckbox = (group, value) => {
    setSelected(prev => {
      const currentGroup = prev[group] || []

      // if selected → unselect
      if (currentGroup.includes(value)) {
        return {
          ...prev,
          [group]: currentGroup.filter(item => item !== value)
        }
      }

      // otherwise → select
      return {
        ...prev,
        [group]: [...currentGroup, value]
      }
    })
  }

  return (
    <div className='flex flex-col gap-4 w-full p-3'>
      <h1 className='font-semibold text-base'>Filters</h1>

      {Filters.map((filter, index) => (
        <div key={index} className='text-sm'>
          <p className='font-bold mb-1'>{filter.label}</p>

          <div className='flex flex-col gap-1'>
            {filter.values.map((item, i) => (
              <label key={i} className='flex items-center gap-2'>
                <input
                  type="checkbox"
                  checked={selected[filter.label]?.includes(item) || false}
                  onChange={() => handleCheckbox(filter.label, item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className='mt-4 text-xs'>
        <h2 className='font-semibold'>Selected Filters:</h2>
        <pre className='bg-gray-100 p-2 rounded'>
          {JSON.stringify(selected, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default FilterData