import React from 'react'
import { Tabs } from 'antd'

import SearchTab from '../search-tab/search-tab'
import RatedTab from '../rated/rated'

const onChange = (key) => {
  console.log(key)
}
const items = [
  {
    key: '1',
    label: 'Search',
    children: <SearchTab />,
  },
  {
    key: '2',
    label: 'Rated',
    children: <RatedTab />,
  },
]
function TabsComp() {
  return <Tabs defaultActiveKey="1" centered destroyInactiveTabPane items={items} onChange={onChange} />
}
export default TabsComp
