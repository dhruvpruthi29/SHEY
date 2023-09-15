import { Col, Form, Row, Tabs, message } from 'antd';
import Input from 'antd/es/input/Input';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'antd/es/modal/Modal';
import React, { useEffect } from 'react';
import { AddProduct, EditProduct } from '../../../apicalls/products';
import { setLoader } from '../../../redux/loadersSlice'; 
import Images from './Images';

const additionalThings = [
    {
        label: "Bill Available",
        name: "billAvailable",
    },
    {
        label: "Warranty Available",
        name: "warrantyAvailable",
    },
    {
        label: "Accesorie Available",
        name: "accessoriesAvailable",
    },
    {
        label: "Box Available",
        name: "boxAvailable",
    }
];

const rules = [
    {
        required: true,
        message: "Required",
    }
]

function ProductsForm({
    showProductForm,
    setShowProductForm,
    selectedProduct,
    getData
}) {
    const [selectedTab = "1", setSelectedTab] = React.useState("1");
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.users);
    const onFinish=async(values)=>{
        try {
            
            dispatch(setLoader(true));
            let response = null;
            if(selectedProduct){
                response = await EditProduct(selectedProduct._id, values);
            }
                console.log("function ran");
                values.seller = user._id;
                values.status = "pending";
                response = await AddProduct(values);
            
            
            dispatch(setLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
                setShowProductForm(false);
            } else {
                console.log(response);
                message.error(response.message);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    }
    
    const formRef = React.useRef(null);

    useEffect(()=>{
        if (selectedProduct) {
            formRef.current.setFieldsValue(selectedProduct);
        }
    }, [selectedProduct]);
    
    return (
        <Modal
        title=""
        open={showProductForm}
        onCancel={()=>setShowProductForm(false)}
        centered
        width={1000}
        okText="Save"
        onOk={() => {
            formRef.current.submit();
        }}
        {...(selectedTab==="2" && {footer: false})}
        >
            <div>
                <h1 className="text-primary text-2xl text-center font-semibold uppercase">
                {selectedProduct ? "edit Product": "Add Product"}
                </h1>
            <Tabs defaultActiveKey='1' activeKey={selectedTab}
            onChange={(key) => setSelectedTab(key)}
            >
                <Tabs.TabPane tab="General" key="1">
                    <Form layout='vertical'
                    
                    ref={formRef}
                    onFinish={onFinish}
                    >

                    <Form.Item label="Name" name='name'
                    
                    rules={rules}
                    
                    >
                        <Input type="text" />
                    </Form.Item>    
                    <Form.Item label="Description" name='descripttion'
                    rules={rules}
                    >
                        <TextArea type="text" />
                    </Form.Item>

                    <Row
                    gutter={[16,16]}
                    >
                        <Col span={8}>
                        <Form.Item      label="Price" name='price'
                        rules={rules}
                        >
                            <Input type="number" />
                        </Form.Item>
                        </Col>

                        <Col span={8}>
                        <Form.Item      label="Category" name='category'
                        rules={rules}
                        >
                            <select>
                                <option value=''>
                                    Select
                                </option>
                                <option value='electronics'>
                                    Electronics
                                </option>
                                <option value='fashion'>
                                    Fashion
                                </option>
                                <option value='home'>
                                    Home
                                </option>
                                <option value='sports'>
                                    Sports
                                </option>
                            </select>
                        </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label="Age" name="age"
                            rules={rules}
                            >
                                <Input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className='flex gap-10'>
                        {additionalThings.map((item) => {
                            return (
                                <Form.Item label={item.label} name={item.name}
                                valuePropName='checked'>
                                    <Input type='checkbox' 
                                    value={item.name}
                                    onChange={(e) => {
                                        formRef.current.setFieldsValue({
                                            [item.name]: e.target.checked,
                                        });
                                    }}
                                    checked = {formRef.current?.getFieldValue(item.name)}
                                    />
                                </Form.Item>
                            )
                        })}
                    </div>

                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Images" key="2"
                disabled={!selectedProduct}>
                    <Images selectedProduct={selectedProduct}
                    
                    getData={getData} setShowProductForm = {setShowProductForm}/>
                </Tabs.TabPane>
            </Tabs>
            </div>
        </Modal>
    )
}

export default ProductsForm;
