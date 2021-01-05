import React from 'react';
import { connect } from 'dva';
import { Menu } from 'antd';
import { ProjectOutlined,SkinOutlined,WomanOutlined } from '@ant-design/icons';

@connect(({ shopData }) => ({
  backupData: shopData.backupData,
  productData: shopData.productData,
}))
class Screen extends React.Component {
  onScreen = (key) => {
    const { backupData, dispatch } = this.props
    dispatch({
      type: 'shopData/screenData',
      payload: {
        data:backupData,
        key,
        i:1
      }
    })
  }

  onCollate = async (key) => {
    const {productData, dispatch } = this.props
    await dispatch({
      type: 'shopData/screenData',
      payload: {
        data:productData,
        key,
        i:0
      }
    })
  }

  onCollate = async (key) => {
    const {productData, dispatch } = this.props
    await dispatch({
      type: 'shopData/screenData',
      payload: {
        data:productData,
        key,
        i:0
      }
    })
  }
 
  render() {
    const { SubMenu } = Menu;
    return (
      <>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['3']}>
          <SubMenu icon={<SkinOutlined />} style={{color:"#40a9ff"}} title="尺码选择">
            <Menu.Item key="setting:6" onClick={() => this.onScreen()}>所有尺码</Menu.Item>
            <Menu.Item key="setting:1" onClick={() => this.onScreen("S")}>S</Menu.Item>
            <Menu.Item key="setting:2" onClick={() => this.onScreen('M')}>M</Menu.Item>
            <Menu.Item key="setting:3" onClick={() => this.onScreen('L')}>L</Menu.Item>
            <Menu.Item key="setting:4" onClick={() => this.onScreen('XL')}>XL</Menu.Item>
            <Menu.Item key="setting:5" onClick={() => this.onScreen('XXL')}>XXL</Menu.Item>
          </SubMenu>
          <SubMenu icon={<ProjectOutlined />} style={{color:"#40a9ff"}} title="价格排序">
            <Menu.Item key="setting:1" onClick={() => this.onCollate()}>综合排序</Menu.Item>
            <Menu.Item key="setting:2" onClick={() => this.onCollate('up')}>价格升序</Menu.Item>
            <Menu.Item key="setting:3" onClick={() => this.onCollate('down')}>价格降序</Menu.Item>
          </SubMenu>
          <SubMenu icon={<WomanOutlined />} style={{color:"#40a9ff"}} title="男女选择">
            <Menu.Item key="setting:1" onClick={() => this.onCollate("男")}>男</Menu.Item>
            <Menu.Item key="setting:2" onClick={() => this.onCollate("女")}>女</Menu.Item>
          </SubMenu>
        </Menu>
      </>
    )
  }
}
export default connect()(Screen);