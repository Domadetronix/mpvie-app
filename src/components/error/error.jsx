import React from 'react'
import './error.css'
import { Alert, Space } from 'antd'

export default function ErrorMessage({ description }) {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Alert
        style={{ width: '100%', height: '100%' }}
        message="Error"
        description={description}
        type="error"
        showIcon
      />
    </Space>
  )
}
