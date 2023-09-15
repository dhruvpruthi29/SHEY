import { Button, Table, message  } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { UpdateProductsStatus, GetProducts } from '../../apicalls/products';
import { setLoader  } from '../../redux/loadersSlice';
import { GetAllUsers, UpdateUserStatus } from "../../apicalls/users";





function Users() {

    const [ Users , setUsers ] = React.useState([]);

    const dispatch = useDispatch();


    const getData = async() => {
        try {
            dispatch(setLoader(true));
            const response = await GetAllUsers(null);
            dispatch(setLoader(false));
            if(response.success){
                setUsers(response.data)
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message)
        }
    }

    const onStatusUpdate = async (id, status) => {
        try {
            dispatch(setLoader(true));
            const response = await UpdateUserStatus(id,  status );
            dispatch(setLoader(false));
            if(response.success) {
                message.success(response.message);
                getData();
            } else {
                throw new Error(response.message);
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
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Role",
            dataIndex: "role",
            render: (text,record) => {
                return record.role.toUpperCase();
            },
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
        },
        {
            title: "Status",
            dataIndex: "status",
            render : (text, record) => {
                return record.state.toUpperCase();
            }
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (text, record) => {
                const {status , _id} = record
            
            return( 
            <div className='flex gap-3'>
                    {status === "active" && (
                    <span 
                    className='underline cursor-pointer'
                    onClick={() => onStatusUpdate(_id, "blocked")}
                >
                        Block
                    </span>
                    )}

                    {status === "blocked" && (
                    <span 
                    className='underline cursor-pointer'
                    onClick={() => onStatusUpdate(_id, "active")}
                        >
                        Unblocked
                    </span>
                    )}

                </div>
            );
        },
    },
];

    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
        <Table columns={columns} dataSource={Users} />
        </div>
    )
}

export default  Users;