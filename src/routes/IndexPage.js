import React from 'react';
import { connect } from 'dva';
import { Layout, Drawer, Button,Badge } from 'antd';
import {ShoppingCartOutlined } from '@ant-design/icons';
import styles from "./IndexPage.css"
import Goods from '../components/Goods'
import Cart from '../components/Cart';
import Screen from '../components/Screen'

@connect(({ cart }) => ({
  count: cart.count
}))
class IndexPage extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { Header, Content, Footer } = Layout;
    const {count} = this.props
    return (
     <div>
        <Layout >
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%', paddingLeft: "150px" }}>
            
            <div className="logo" />
            <Screen />
          </Header>
          <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
            <div className={styles.productlist} style={{ padding: 24, minHeight: 580, display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
              <Goods />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center',fontSize:"30px" }}></Footer>
        </Layout>
        <div style={{ position: 'fixed',zIndex: 2,top: 16, left: "80%" }} >
          <Badge count={count} showZero>
            <Button icon={<ShoppingCartOutlined />} style={{fontSize:"16px"}} type="primary" size="large" shape="round" onClick={this.showDrawer}>
              您的购物车
            </Button>
          </Badge>
        </div>
        <Drawer
          title="购物车"
          width="550"
          placement="right"
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Cart />
        </Drawer>
      </div>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
