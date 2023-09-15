import React from 'react'
import { setLoader } from '../../redux/loadersSlice';
import { GetProductById, GetProducts } from '../../apicalls/products';
import { message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function ProductInfo() {
    const [product, setProduct] = React.useState(null)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const  {id} = useParams();
    const getData = async() => {
        try {
            dispatch(setLoader(true));
            const response = await GetProductById(id);
            dispatch(setLoader(false));
            if(response.success) {
                setProduct(response.data);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
        }
    };

    return (
    <div>
        ProductInfo
    </div>
    )
}

export default ProductInfo;