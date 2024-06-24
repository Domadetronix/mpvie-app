/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Space, Spin } from 'antd'

function Loader() {
  return (
    <Space
      style={{
        margin: '0, auto',
      }}
    >
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
            }}
            spin
          />
        }
      />
    </Space>
  )
}
export default Loader
