import React, { useState } from 'react'

const UnitsSelector = (props) => {
  const { currentFood: { units }, onSelect } = props

  const onAmountChange = (e) => {
    setSelectedUnits({ ...selectedUnits, selectedAmount: Number(e.target.value), total: Number(e.target.value) * selectedUnits.amount })
  }
  return (
    <Grid container wrap="nowrap" direction="row" justify="flex-start" alignItems="flex-start" spacing={1} style={{ width: '20em' }}>
      <Grid item xs={3}>
        <TextField size="small" type="number" value={selectedUnits.selectedAmount} onChange={onAmountChange} />
      </Grid>
      <Grid item xs={7}>
        <Select
          closeMenuOnSelect
          getOptionLabel={(option) => option.unitName}
          getOptionValue={(option) => option.unitName}
            // isLoading={searchLoading}
            // onInputChange={handleSearch}
          options={[defaultUnit].concat(units)}
          isSearchable={false}
          // isOptionsSelected={(a, b) => a.unitName === b.unitName}
          value={selectedUnits}
          onChange={(data) => setSelectedUnits({ ...selectedUnits, amount: data.amount, unitName: data.unitName, total: selectedUnits.selectedAmount * Number(data.amount) })}
        />
        {/*  {[{ unitName: 'גרם' }].concat(units).map((unit) =>*/}
        {/*    <MenuItem key={unit.unitName} value={unit}>{unit.unitName}</MenuItem>)}*/}
        {/*</Select>*/}
      </Grid>
      <Grid item xs={2}>
        <IconButton disabled={selectedUnits.selectedAmount <= 0 || !selectedUnits.unitName} size="small" onClick={() => onSelect(selectedUnits.total)}><CheckIcon /></IconButton>
      </Grid>
    </Grid>
  )
}
export default UnitsSelector
