import React, { useRef, useState } from 'react'
import { API } from 'aws-amplify';
import onError from '../utils/onError';

const FoodSelector = (props) => {
  const { onSelectFood, selectedFoods } = props
  const [resultsOptions, setResults] = useState([])
  const [searchLoading, setLoading] = useState(false)
  const [searchQuery, setQuery] = useState('')

  const searchTimer = useRef();
  const queryRef = useRef(searchQuery)

  const handleSearch = (query, reason) => {
    queryRef.current = query
    setQuery(query)
    if (reason.action === 'input-change') {
      clearTimeout(searchTimer.current)
      setLoading(true)
      searchTimer.current = setTimeout(async () => {
        try {
          const options = await API.get('nutri-app', `/foods/${encodeURIComponent(query)}`)
          setResults(options)
        } catch (e) {
          onError(e)
        }
        setLoading(false)
      }, 500)
    }
  }

  const resetSearch = () => {
    setResults([])
    setQuery('')
  }

  const generateFoodLabel = (option) => (option.selectedAmount ? ` גרם${option.selectedAmount} - ${option.foodName}` : option.foodName)

  return (
    <Select
      isMulti
      closeMenuOnSelect
      onMenuClose={() => resetSearch()}
      getOptionLabel={(option) => generateFoodLabel(option)}
      getOptionValue={(option) => option.foodName}
      isLoading={searchLoading}
      onInputChange={handleSearch}
      options={resultsOptions}
      isOptionsSelected={(a, b) => a.foodName === b.foodName}
      value={selectedFoods}
      onChange={onSelectFood}
    />
  )
}

export default FoodSelector
