import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Button, Col, Divider, Modal, Row, Spin } from 'antd';
import MenuContainer from './menuContainer';
import { fetchMenuDates, userDetailsSelector, userHasAuthenticated } from '../slices/userDetails';
import ChartContainer from './chartsContainer';
import { menuSelector } from '../slices/menu';
import IntroCarousel from './introCarousel';

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { isLoading } = useSelector(menuSelector)
  const { isAuthenticated } = useSelector(userDetailsSelector)
  const [modalVisible, setModal] = useState(false)

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchMenuDates())
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (!isAuthenticated) setModal(true)
    }, 2000)
  }, [isAuthenticated])

  return (
    <>
      <Spin spinning={isLoading}>
        <Row justify="center" align="top" style={{ direction: 'rtl' }}>
          <Col flex={1} order={2}><ChartContainer /></Col>
          <Col flex={2} order={1}><MenuContainer /></Col>
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
