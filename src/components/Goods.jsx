import React from 'react';
import { connect } from 'dva';
import { Card, Button, Popover, List, } from 'antd';
import {
    SyncOutlined, SolutionOutlined,
} from '@ant-design/icons';

@connect(({ shopData, cart }) => ({
    productData: shopData.productData,
    cartData: cart.cartData,
    amount: cart.amount,
    count: cart.count
}))

class Goods extends React.Component {
    constructor() {
        super()
        this.state = {
            key: 0
        }
    }

    async componentWillMount() {
        const { dispatch } = this.props
        await this.setState({
            key: 1
        })
        await dispatch({
            type: 'shopData/GetData'
        })
        if(window.localStorage.cartData){
            dispatch({
                type: 'cart/setStorage'
            })
        }
        await this.setState({
            key: 0
        })
    }

    addCart = async (data, size) => {
        const { dispatch } = this.props
        await dispatch({
            type: 'cart/addCart',
            payload: {
                data: data,
                size: size
            }
        })
    }

    render() {
        const { productData } = this.props
        const list = (productData || []).map((item, key) => (
            <Card className="cart" style={{ width: 300, margin: 10, borderRadius: "20%",border:'solid', }} key={key}>
                <img src={`./img/${item.sku}_1.jpg`} alt={item.title + "_1.jpg"} style={{ width: 252 }}></img>
                <h3 style={{ textAlign: 'center' }}>{item.title}</h3>
                <h5 style={{ textAlign: 'center' }}>{item.sex}</h5>
                <hr style={{ width: "50%", backgroundColor: 'black' }} />
                <h4 style={{ textAlign: 'center' }}>{item.currencyFormat + item.price}</h4>
                <Popover
                    content={
                        <List
                            size="small"
                            dataSource={item.availableSizes}
                            renderItem={size => <List.Item><Button onClick={() => this.addCart(item, size)} block>{size}</Button></List.Item>}
                        />
                    }
                    title="请选择需要的尺码"
                    trigger="click">
                    <Button style={{ backgroundColor: 'black', color: "#fff" }} size="large" block>添加到购物车</Button>
                </Popover>
            </Card>
        ));
        return (
            <>
                <div><h3 style={{ textAlign:"center",color:"red"}}>{` 当前的商品数为${productData.length} 件`}</h3></div>
                <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
                    {this.state.key ? (<div className="icons-list" style={{ fontSize: "50px",textAlign: "center" }}>
                        <SyncOutlined spin />
                    </div>) : list}
                </div>

            </>
        )
    }
}
export default Goods;