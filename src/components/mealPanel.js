import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Collapse from 'antd/lib/collapse';
import { Button, Col, Empty, InputNumber, Row, Select } from 'antd';
import { API } from 'aws-amplify';
import { CheckCircleTwoTone } from '@ant-design/icons';
import DeleteTwoTone from '@ant-design/icons/lib/icons/DeleteTwoTone';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined';
import CountUp from 'react-countup';
import { addToMenu, menuSelector, removeFromMenu } from '../slices/menu';
import onError from '../utils/onError';
import CompoundsDist from './charts/compoundsDist';
import { compounds, gutter } from '../utils/utilitiesFuncs';

const { Panel } = Collapse
const { Option } = Select

const MealPanel = (props) => {
  const { meal } = props
  const selectedFoods = useSelector(menuSelector)[meal]
  const [currentReqFood, setCurrentFood] = useState(null)
  const [resultsOptions, setResults] = useState([])
  const [searchLoading, setLoading] = useState(false)
  const [searchQuery, setQuery] = useState('')

  const defaultUnit = { unitName: 'גרם', amount: 1, selectedAmount: 100 }
  const [selectedUnits, setSelectedUnits] = useState(defaultUnit)

  const searchTimer = useRef();
  const queryRef = useRef(searchQuery)

  const checkIfDuplicate = (name) => selectedFoods.find((food) => food.foodName === name)

  const handleSearch = (query) => {
    queryRef.current = query
    setQuery(query)
    if (query.length >= 1) {
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
  const dispatch = useDispatch()

  // const sumCalories = selectedFoods.reduce(((acc, food) => acc + (food.calories * food.selectedAmount)), 0)

  const handleRemoveFromMenu = ({ value }) => {
    dispatch(removeFromMenu({ meal, removedValue: value }))
  }

  const addFoodToMenu = () => {
    const newFood = { ...currentReqFood, selectedAmount: Number(Number(selectedUnits.amount * selectedUnits.selectedAmount).toFixed(0)) }
    dispatch(addToMenu({ meal, newFood }))
    setCurrentFood(null)
  }

  const handleFoodSelect = (food) => {
    setCurrentFood(food)
    setSelectedUnits(defaultUnit)
    resetSearch()
  }

  const screens = useBreakpoint()

  return (

    <>
      <Row align="middle" justify="start">
        <Col span={2}><div>חפש פריט</div></Col>
        <Col span={2}>
          <Select
            style={{ width: '12em' }}
            placeholder="חפש..."
            dropdownStyle={{ borderRadius: '15px', margin: '5px' }}
            showArrow="false"
            showSearch
            value={currentReqFood ? currentReqFood.foodName : null}
            onSearch={(q) => handleSearch(q)}
            onSelect={(label, option) => handleFoodSelect(option.title)}
            loading={searchLoading}
            notFoundContent="לא מצאת? הוסף בעצמך 😎"
          >
            {resultsOptions.map((opt) => (<Option disabled={checkIfDuplicate(opt.foodName)} key={opt.foodName} title={opt} value={opt.foodName} />))}
          </Select>
        </Col>
      </Row>

      { currentReqFood && (
      <>
        <Row gutter={gutter} align="middle">
          <Col span={3}>
            <>
              <CountUp end={Number((currentReqFood.calories * 100).toFixed(0))} />
              {' '}
              קלוריות ל-100 ג'
            </>
          </Col>
          <Col span={3}><CompoundsDist total={false} legend small data={currentReqFood} /></Col>
        </Row>
        <Row justify="start">
          <Col span={2}><div>בחר כמות</div></Col>
          <Col span={4}>
            <InputNumber style={{ width: '100%' }} min={0.1} max={10000} value={selectedUnits.selectedAmount} onChange={(val) => setSelectedUnits({ ...selectedUnits, selectedAmount: val })} />
          </Col>
          <Col span={6}>
            <Select
              value={selectedUnits.unitName}
              optionLabelProp="label"
              style={{ width: '100%' }}
              onChange={(label, option) => setSelectedUnits({ unitName: option.title.unitName, amount: option.title.amount, selectedAmount: selectedUnits.selectedAmount === 100 ? 1 : selectedUnits.selectedAmount })}
              dropdownMatchSelectWidth
              showArrow
            >
              {[defaultUnit, ...(currentReqFood.units || [])].map((unit) => <Option key={unit.unitName} value={unit.unitName === 'גרם' ? 'גרם' : `${unit.unitName} - ${unit.amount} גרם `} title={unit} />)}
            </Select>
          </Col>
          <Col style={{ width: 'fit-content', margin: '10px 0px' }}><Button className="check-button" shape="circle" icon={<CheckCircleTwoTone twoToneColor="#52c41a" className="icon-check" />} onClick={() => addFoodToMenu()}>הוסף</Button></Col>
          <Col span={1} style={{ margin: '10px 2px' }}><Button className="delete-button" shape="circle" icon={<DeleteTwoTone twoToneColor="red" className="icon-delete" />} onClick={() => setCurrentFood(null)} /></Col>
        </Row>
      </>
      )}
      <br />
      <Row><Col><h2>פריטי הארוחה:</h2></Col></Row>
      <Row style={{ width: screens.xs ? '25em' : '58em' }}>
          { selectedFoods.length ? (
            <Select
              bordered={false}
              mode="multiple"
              labelInValue
              style={{ paddingBottom: '5px' }}
              value={selectedFoods.map((food) => ({ value: food.foodName, label: `${food.foodName} - ${food.selectedAmount} גרם` }))}
              onDeselect={(val) => handleRemoveFromMenu(val)}
              notFoundContent={null}
            />
          ) : (
            <Col>
              לא נמצאו פריטים
              <img alt="empty" src="https://img.icons8.com/clouds/100/000000/tableware.png" />
            </Col>
          )}
      </Row>
    </>
  )
}

export default MealPanel
