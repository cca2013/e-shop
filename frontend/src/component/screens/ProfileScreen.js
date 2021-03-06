import React, {useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {Table,Form, Button,Row,Col} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Message from "../Message"
import Loader from "../Loader"
import {getUserDetails, Update} from "../../action/userAction"
import {myOrders} from "../../action/orderAction"

const ProfileScreen = ({history}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userDetails = useSelector(state=>state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userUpdate = useSelector(state=>state.update)
    const {success} = userUpdate

    const myorderList = useSelector(state=>state.myorderList)
    const {orders, error:errorOrders, loading:loadingOrders} = myorderList

    useEffect(() => {
        if(!userInfo){
            history.push("/login")
        }else{
            if(!user.name){
                dispatch(getUserDetails("profile"))
                dispatch(myOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [history, userInfo, user])

    const submitHandler =(e)=>{
        e.preventDefault()
        //DISPATCH REGISTER
        if(password !==confirmPassword){
            setMessage("Passwords do not match")
        }else{
        //UPDATE PROFILE
        dispatch(Update({id:user._id, name,email,password}))
        }
    }
    return (
    <Row>
        <Col md={3}>
        <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Confirm Password" value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Update
                </Button>
            </Form>    
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader/> : errorOrders ? <Message variant="danger">{errorOrders}</Message>:
            (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {orders.map(order =>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0,10) : (<i className="fas fa-times" style={{color:"red"}}></i>)}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (<i className="fas fa-times" style={{color:"red"}}></i>)}</td>
                                    <td><LinkContainer to={`/order/${order._id}`}>
                                        <Button className="btn-sm" variant="light">Details</Button>
                                    </LinkContainer></td>
                                </tr>
                            ))}
                        </tbody>
                    
                </Table>
            )}
        </Col>
    </Row>
    )
}

export default ProfileScreen
