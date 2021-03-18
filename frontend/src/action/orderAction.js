import Axios from "axios"
import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET, MY_ORDER_LIST_FAIL, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_REQUEST, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST} from "../constants/orderConstant"

export const createOrder = (order) => async (dispatch, getState)=>{
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await Axios.post('/api/orders', order, config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message: error.message
        })
    }

}

export const getOrderDetails = (id) => async (dispatch, getState)=>{
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await Axios.get(`/api/orders/${id}`,config)
        
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message: error.message
        })
    }

}

export const paidOrder = (id, paymentResult) => async (dispatch, getState)=>{
    try{
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await Axios.put(`/api/orders/${id}/paid`,paymentResult,config)
        
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message: error.message
        })
    }

}

export const deliverOrder = (order) => async (dispatch, getState)=>{
    try{
        dispatch({
            type: ORDER_DELIVER_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await Axios.put(`/api/orders/${order._id}/delivered`,{},config)
        
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message: error.message
        })
    }

}

export const myOrders = () => async (dispatch, getState)=>{
    try{
        dispatch({
            type: MY_ORDER_LIST_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await Axios.get(`/api/orders/myorders`,config)
        
        dispatch({
            type: MY_ORDER_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: MY_ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message: error.message
        })
    }

}

export const orderList = () => async (dispatch, getState)=>{
    try{
        dispatch({
            type: ORDER_LIST_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await Axios.get(`/api/orders/`,config)
        
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message: error.message
        })
    }

}