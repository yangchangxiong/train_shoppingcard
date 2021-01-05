import React from 'react';
import { connect } from 'dva';
import { Button, List } from 'antd';
import {
  SyncOutlined,
} from '@ant-design/icons';

@connect(({ cart }) => ({
  cartData: cart.cartData,
  amount: cart.amount
}))
class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      key: 0
    }
  }

  changeOne = (key, id, size) => {
    const { dispatch } = this.props
    dispatch({
      type: 'cart/changeOne',
      payload: {
        key,
        id,
        size
      }
    })
  }

  removeData = async (id, size) => {
    const { dispatch } = this.props
    await dispatch({
      type: 'cart/remoteOne',
      payload: {
        id,
        size
      }
    })
  }

  settlement = async () => {
    console.log("sssssssssssssssssssss1", this.state);

    await this.setState({
      key: 1
    })
    console.log("sssssssssssssssssssss2", this.state);

    const { dispatch } = this.props
    await setTimeout(() => {
      dispatch({
        type: 'cart/settlementData',
      })
      this.setState({
        key: 0
      })
    }, 3000);

    console.log("sssssssssssssssssssss3", this.state);

  }

  render() {
    const { key } = this.state
    console.log("................", key);

    const { cartData, amount } = this.props
    return (
      <div style={{ height: 500 }}>
        <div style={{ height: '75%',backgroundColor:"skyblue", overflow: 'auto' }}>
          <List
            itemLayout="horizontal"
            dataSource={cartData}
            renderItem={item => (
              <List.Item
                actions={[
                  <Button.Group size="small">
                    <Button onClick={() => this.changeOne(-1, item.id, item.size)} disabled={item.number === 1}> - </Button>
                    <Button onClick={() => this.changeOne(1, item.id, item.size)}> + </Button>
                  </Button.Group>,
                  <Button onClick={() => this.removeData(item.id, item.size)} >X</Button>
                ]}
              >
                <List.Item.Meta
                  avatar={<img src={`./img/${item.sku}_2.jpg`} alt="1" style={{ width: 50 }} />}
                  title={item.title}
                  description={item.size + " | " + item.style}
                />
                <div>x {item.number}</div>
              </List.Item>
            )}
          />
        </div>
        <div style={{ height: '20%' }}>
          <h3 style={{ textAlign: 'center' }}>{`当前合计金额为: ${amount.toFixed(2)}美元`}</h3>
          <Button onClick={() => this.settlement()} disabled={amount.toFixed(2) <= 0.00} size="moddle" block>{key ? <div style={{ color: 'black' }}>正在结算中...</div> : <div>点击结算</div>}</Button>
          {this.state.key ? (<div className="icons-list" style={{ fontSize: "50px",textAlign:"center"}}>
            <SyncOutlined spin />
          </div>) : null}
        </div>
      </div>
    )
  }
}
export default Cart;