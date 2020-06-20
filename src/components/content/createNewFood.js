import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify'
import { Form, Button, Col, Row, Input, InputNumber, Space, message, Spin } from 'antd';
import MinusCircleOutlined from '@ant-design/icons/lib/icons/MinusCircleOutlined';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import { duplicateError, error } from '../../utils/utilitiesFuncs';

const CreateNewFood = (props) => {
  const [isUploading, setUploading] = useState(false)

  const success = () => {
    message.success('הפריט נשמר בהצלחה 🥳');
  };

  const fields = [{ label: 'שומן ל-100 ג', name: 'fats' }, { label: 'חלבון ל-100 ג', name: 'proteins' }, { label: 'פחמימה ל-100 ג', name: 'carbs' }, { label: 'קלוריות ל-100 ג', name: 'calories' }]
  const screens = useBreakpoint()
  const [form] = Form.useForm()

  const generateBody = (value) => {
    const requestBody = { ...value }
    fields.forEach((field) => {
      Number(requestBody[field.name] /= 100).toFixed(0)
    })
    requestBody.letter = requestBody.foodName.charAt(0)
    requestBody.dateAdded = new Date().toISOString().slice(0, 10)
    console.log(requestBody)
    return requestBody
  }

  const handleCreate = async (value) => {
    setUploading(true)
    try {
      await API.post('nutri-app', '/food', {
        body: generateBody(value)
      })
      form.resetFields()
      success()
    } catch (e) {
      e.response.data.error === 'The conditional request failed' ? duplicateError() : error()
    }
    setUploading(false)
  }

  return (
    <Spin spinning={isUploading}>
      <Form
        onFinish={(val) => handleCreate(val)}
        form={form}
        validateMessages={{ required: 'שדה חובה' }}
      >
        <Row justify={screens.xs ? 'start' : 'center'}>
          <Col span={5}>
            <Form.Item
              name="foodName"
              label="שם הפריט"
              rules={[{ required: true }]}
              colon={false}
              style={{ textAlign: 'center' }}
            >
              <Input placeholder="שם הפריט" style={{ width: '15em', float: 'right' }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          {fields.map(({ label, name }) => (
            <Col flex={0.25} key={name}>
              <Form.Item
                name={name}
                label={label}
                rules={[{ required: true }]}
                colon={false}
              >
                <InputNumber min={0} max={30000} />
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.List name="units">
          {/* eslint-disable-next-line no-shadow */}
          {(unitFields, { add, remove }) => (
            <div>
              {unitFields.map((field) => (
                <Row justify={screens.xs ? 'start' : 'center'} key={field.key}>
                  <Space key={field.key} style={{ marginBottom: 8 }} align="center">
                    <Form.Item
                      {...field}
                      name={[field.name, 'unitName']}
                      fieldKey={[field.fieldKey, 'unitName']}
                      rules={[{ required: true, message: 'שדה חובה' }]}
                    >
                      <Input style={{ width: screens.xs ? '8em' : '20em' }} placeholder="לדוגמה: 'חתיכה קטנה' \ 'כף' \ 'כוס' \ 'מנה'" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'amount']}
                      fieldKey={[field.fieldKey, 'amount']}
                      rules={[{ required: true, message: 'שדה חובה' }]}
                    >
                      <InputNumber placeholder="גרמים" min={0} max={30000} style={{ width: screens.xs ? '6em' : '12em' }} />
                    </Form.Item>

                    <MinusCircleOutlined
                      onClick={() => { remove(field.name) }}
                      style={{ verticalAlign: '1em', fontSize: 'large', paddingRight: '3px' }}
                    />
                  </Space>
                </Row>
              ))}

              <Form.Item>
                <Button
                  style={{ backgroundColor: 'gray', border: '1px dashed', color: 'white' }}
                  onClick={() => { add() }}
                  block
                >
                  <PlusOutlined /> הוסף יחידות מידה
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>

        <Row justify="center" style={{ padding: '5em' }}>
          <Button htmlType="submit" size="large">
            סיים
          </Button>
        </Row>
      </Form>
    </Spin>
  )
}

export default CreateNewFood;
