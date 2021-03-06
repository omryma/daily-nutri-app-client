import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Modal, Row, Spin } from 'antd';
import MenuContainer from './menuContainer';
import { fetchMenuDates, userDetailsSelector } from '../../slices/userDetails';
import ChartContainer from './chartsContainer';
import { menuSelector } from '../../slices/menu';
import IntroCarousel from '../navigation/introCarousel';

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isLoading } = useSelector(menuSelector)
  const { isAuthenticated } = useSelector(userDetailsSelector)
  const [modalVisible, setModal] = useState(false)

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchMenuDates())
  }, [isAuthenticated])

  useEffect(() => {
    setTimeout(() => {
      if (!isAuthenticated) setModal(true)
    }, 2000)
  }, [isAuthenticated])

  return (
    <>
      <Spin spinning={isLoading}>
        <Row justify="center" align="top" style={{ direction: 'rtl' }}>
          <Col xs={24} md={24} lg={9} order={2}><ChartContainer /></Col>
          <Col xs={24} md={24} lg={14} order={1}><MenuContainer /></Col>
        </Row>
      </Spin>
      <Modal
        visible={modalVisible && !isAuthenticated}
        title="ברוכים הבאים למחשבון התזונה היומי 💁"
        onOk={null}
        onCancel={null}
        closeIcon={<></>}
        maskClosable={false}
        footer={[
          <Button key="signup" onClick={() => history.push('/signup')}>
            כניסה ראשונה? הירשם
          </Button>,
          <Button key="login" onClick={() => history.push('/login')}>
            התחבר
          </Button>
        ]}
      >
        <IntroCarousel />
      </Modal>
    </>
  )
}

export default Home;
