import React, {useEffect} from 'react'
import {Row,Col} from "react-bootstrap"
import Product from "./Product"
import Message from "../Message"
import Loader from "../Loader"
import Paginate from "../Paginate"
import {useDispatch, useSelector} from "react-redux"
import {listProducts} from "../../action/productAction"
import Caurosel from "./Caurosel"

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const dispatch = useDispatch()

    const productList = useSelector(state=>state.productList)
    const {loading, error, products, pages, page} = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword,pageNumber])
    return (
        <>
            {!keyword && <Caurosel/>}
            <h1>Latest Products</h1>
            {loading ? (<Loader />):error ? (<Message variant="danger">{error}</Message>):(
           <> 
           <Row>
                {products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword:""}/> 
            </>
            )}
        </>
    )
}

export default HomeScreen
