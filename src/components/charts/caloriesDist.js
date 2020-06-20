import React, { useState, useEffect, useRef } from 'react'
import Chart from 'react-apexcharts';
import { Col, Empty } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { useSelector } from 'react-redux';
import { meals, mealsDict } from '../../utils/utilitiesFuncs';
import CompoundsDist from './compoundsDist';
import { menuSelector } from '../../slices/menu';

const CaloriesDist = ({ data }) => {
  const [selectedMeal, setMeal] = useState(null)
  const { date } = useSelector(menuSelector)

  useEffect(() => setMeal(null), [date])

  const options = { chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    toolbar: {
      show: true
    },
    zoom: {
      enabled: true
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
      }
    },
    events: {
      dataPointSelection: (e, t, selectedPoint) => { e.preventDefault(); setMeal(meals[selectedPoint.seriesIndex]) },
    },
  },
  colors: ['#E25A53', '#EFBC68', '#C2D7D0', '#5F9595'],
  xaxis: {
    type: 'category',
    categories: ['סך קלוריות']
  },
  yaxis: { tickAmount: 10 }
  }

  const formatCaloriesData = (caloriesData) => meals.map((meal) => ({ name: mealsDict[meal], data: [caloriesData[meal].calories] }))
  const screens = useBreakpoint()

  return (
    <>
      <Col span={8}><Chart options={options} series={formatCaloriesData(data)} type="bar" height={550} width={screens.xs ? 160 : 200} /></Col>
      <Col span={12} offset={4}>
        {selectedMeal ? (
          <>
            <h4>התפלגות בארוחה</h4>
            <CompoundsDist size="medium" legend={false} data={data[selectedMeal]} />
          </>
        ) : (
          <h4>לחץ על עמודה מהגרף</h4>
        )}
      </Col>
    </>
  )
}

export default CaloriesDist
