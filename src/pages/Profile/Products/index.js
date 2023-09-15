import { Button, Table, message  } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import ProductsForm from './ProductsForm';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteProduct, GetProducts  } from '../../../apicalls/products';
import { setLoader  } from '../../../redux/loadersSlice';

function Products() {
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [ products , setProducts ] = React.useState([]);
    const [showProductForm, setShowProductForm] = React.useState(false);
    const {user} = useSelector((state) => state.users);
    const dispatch = useDispatch();


    const getData = async() => {
        try {
            dispatch(setLoader(true));
            const response = await GetProducts({
                seller: user._id,
            });
            dispatch(setLoader(false));
            if(response.success){
                setProducts(response.data);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message)
        }
    }

    const deleteProduct = async (id) => {
        try {
            dispatch(setLoader(true));
            const response = await DeleteProduct(id);
            dispatch(setLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Age",
            dataIndex: "Age",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Added",
            dataIndex: "createdAt" ,
            render: (text, record) => {moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A")
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                return (<div className="flex gap-5">
                    <i className="ri-delete-bin-line"
                    onClick={() => {
                        deleteProduct(record._id);
                    }}
                    ></i>
                    <i className="ri-pencil-line"
                    onClick={()=>{
                        setSelectedProduct(record);
                        setShowProductForm(true);
                    }}></i>

                </div>
                );
            }
        },
    ];


    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <div className="flex justify-end mb-2">

            <Button type='default'
            onClick={()=>{
                setSelectedProduct(null);
                setShowProductForm(true)
            }}>
                Add Product
            </Button>
            </div> 

        <Table columns={columns} dataSource={products} />
            
        {showProductForm && <ProductsForm   showProductForm ={showProductForm}setShowProductForm = {setShowProductForm}
        selectedProduct={selectedProduct}
        getData={getData}
        />} 
        </div>
    )
}

export default  Products