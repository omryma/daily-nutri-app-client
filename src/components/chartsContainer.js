import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Divider, Empty, Row } from 'antd';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { menuSelector } from '../slices/menu';
import { compounds, meals } from '../utils/utilitiesFuncs';
import CompoundsDist from './charts/compoundsDist';
import CaloriesDist from './charts/caloriesDist';

const ChartContainer = (props) => {
  const mealsData = useSelector(menuSelector)

  const initialSummary = {
    breakfast: { fats: 0, proteins: 0, carbs: 0, calories: 0 },
    lunch: { fats: 0, proteins: 0, carbs: 0, calories: 0 },
    dinner: { fats: 0, proteins: 0, carbs: 0, calories: 0 },
    inBetween: { fats: 0, proteins: 0, carbs: 0, calories: 0 },
    total: { fats: 0, proteins: 0, carbs: 0, calories: 0 }
  }

  const checkIfEmpty = () => {
    const { breakfast, lunch, dinner, inBetween } = mealsData
    if (breakfast.length || lunch.length || dinner.length || inBetween.length) return false
    return true
  }

  const [nutriSummary, setSummary] = useState(initialSummary)
  const [isEmpty, setEmpty] = useState(checkIfEmpty())

  useEffect(() => {
    const newSummary = { ...initialSummary }
    meals.forEach((meal) => {
      mealsData[meal].forEach((food) => {
        newSummary[meal].calories += Number((food.calories * food.selectedAmount).toFixed(0))
        compounds.forEach((compound) => {
          newSummary[meal][compound] += Number((food[compound] * food.selectedAmount).toFixed(0))
        })
      })
      Object.keys(newSummary.total).forEach((attr) => newSummary.total[attr] += Number(newSummary[meal][attr].toFixed(0)))
    })
    setSummary(newSummary)
    setEmpty(checkIfEmpty())
  }, [mealsData])

  const screens = useBreakpoint()

  return (
    <>
      <Row justify="center">
        <Col><h1>סיכום יומי</h1></Col>
      </Row>
      { isEmpty ? (
        <Empty
          style={{ height: !screens.lg ? '20em' : '60em' }}
          description="לא נמצאו ארוחות"
          image="https://img.icons8.com/clouds/100/000000/combo-chart.png"
          imageStyle={{ width: '150px', margin: 'auto' }}
        />
      ) : (
        <>
          <Row>
            <Col><h2>התפלגות רכיבים יומית</h2></Col>
          </Row>
          <Row justify={screens.xs ? 'start' : 'center'}>
            <Col span={20}><CompoundsDist size="big" total legend data={nutriSummary.total} /></Col>
          </Row>
          <Divider />
          <Row>
            <Col><h2>קלוריות לפי ארוחה</h2></Col>
          </Row>
          <Row align="middle">
            <CaloriesDist data={nutriSummary} />
          </Row>
        </>
      )}
    </>
  )
}

export default ChartContainer
