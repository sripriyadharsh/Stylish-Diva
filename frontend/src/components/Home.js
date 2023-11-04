import {Fragment, useEffect, useState,useCallback} from 'react';
import MetaData from './layouts/MetaData';
import { getProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Product from './product/Product';
import Loader from './layouts/Loader';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';

export default function Home(){
const dispatch = useDispatch();
const {products, loading, error, productsCount, resPerPage} = useSelector((state)=> state.productsState);
const [currentPage, setCurrentPage] = useState();

const setCurrentPageNo = useCallback((pageNo) => {
  setCurrentPage(pageNo);
}, []);


    useEffect(()=>{
      if(error){
        return toast.error(error,{
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
        dispatch(getProducts(null,null,null,null, currentPage))
    },[error, dispatch, currentPage])


    return(
     <Fragment>
      {loading ? <Loader/>:
          <Fragment>
          <MetaData  title={'Find Your Style'}/>
              <h1 id="products_heading" style={{textAlign:'center'}}>Latest Products</h1>

              <section id="products" className="container mt-5">
              <div className="row">
              { products && products.map(product =>(
                    <Product col={3} ey={product._id}  product={product}/>
               ))}
          

         
        </div>
      </section>
      {productsCount > 0 && productsCount > resPerPage ? (
      <div className='d-flex justify-content-center mt-5'>
                <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={'NEXT'}
                firstPageText={'FIRST'}
                lastPageText={'LAST'}
                itemClass={'page-item'}
                linkClass={'page-link'}
                />
      </div>
      ):null}

          </Fragment>
      }
    </Fragment>
    )
}