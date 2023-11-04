import {Fragment, useEffect, useState, useCallback} from 'react';
import MetaData from '.././layouts/MetaData';
import { getProducts } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Product from '.././product/Product';
import Loader from '.././layouts/Loader';
import { toast } from 'react-toastify';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import  'rc-tooltip/assets/bootstrap.css';

export default function ProductSearch(){
const dispatch = useDispatch();
const {products, loading, error, productsCount, resPerPage} = useSelector((state)=> state.productsState);
const [currentPage, setCurrentPage] = useState();
const [price, setPrice] = useState([150,5000]);
const [priceChanged, setPriceChanged] = useState(price);
const [category, setCategory] = useState(null);
const [rating, setRating] = useState(0);

const {keyword} =useParams();
const categories =[
  ''
];
const setCurrentPageNo = useCallback((pageNo) => {
  setCurrentPage(pageNo);
}, []);


    useEffect(()=>{
      if(error){
        return toast.error(error,{
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
        dispatch(getProducts(keyword,priceChanged,category,rating, currentPage))
    },[error, dispatch,keyword,  priceChanged, category,currentPage,rating])


    return(
     <Fragment>
      {loading ? <Loader/>:
          <Fragment>
          <MetaData  title={'Find Your Style'}/>
              <h1 id="products_heading" style={{textAlign:'center'}}> Search Products</h1>

              <section id="products" className="container mt-5">
              <div className="row">
                <div className='col-6 col-md-3 mb-5 mt-5' >
                  <div className='px-5' onMouseUp={()=>setPriceChanged(price)}>
                      <Slider
                        range={true}
                        marks={
                          {
                            150: "Rs.150",
                            5000: "Rs.5000"
                          }
                        }
                        min={150}
                        max={5000}
                        defaultValue={price}
                        onChange={(price)=>{
                          setPrice(price)
                        }}
                        handleRender={
                          renderProps=>{
                            return (
                              <Tooltip overlay={`Rs.${renderProps.props['aria-valuenow']}`}>
                                <div {...renderProps.props}></div>
                              </Tooltip>
                            )
                          }
                        }
                      
                      />
                  </div>
                  <hr className='my-5'/>
                  <div className='mt-5'>
                    <h3 className='mb-3'></h3>
                    <ul className='pl-0'>
                      {categories.map(category=>
                    <li style={{cursor:"pointer",
                    listStyleType:"none"}}
                    
                      key = {category}
                      onClick={()=>{
                          setCategory(category)

                      }
                      }
                      >
                      {category}
                    </li>
                    )}
                    </ul>
                  </div>
                  <div className='mt-5'>
                    <h4 className='mb-3'>Ratings</h4>
                    <ul className='pl-0'>
                      {[5,4,3,2,1].map(star=>
                    <li style=
                    {{cursor:"pointer",
                    listStyleType:"none"}}
                    
                      key = {star}
                      onClick={()=>{
                          setRating(star)

                      }
                      }
                      >
                      <div className='rating-outer'>
                          <div className='rating-inner'
                          style={{
                            width:`${star*20}%`
                          }}></div>
                      </div>
                    </li>
                    )}
                    </ul>
                  </div>
                </div>
                <div className='col-6 col-md-9'>
                  <div className='row'>
                  { products && products.map(product =>(
                    <Product col={4} key={product._id}  product={product}/>
               ))}
          
                  </div>
                </div>
              

         
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