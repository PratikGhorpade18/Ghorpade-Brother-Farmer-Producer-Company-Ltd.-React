import React, { useEffect } from 'react';
import '../AllProduct/AllProduct.css';
import { Url } from '../../constants/APIUrl';
import { getAPICall } from '../../APIMethods/APIMethods';

function AllProduct() {
    useEffect(() => {
        debugger;
 
        getAPICall(Url.getAllProduct)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='AllProduct'>
            <div className='product-card'>
                <div>
                    <img src='' alt='' />
                    <div className='product-detail'>
                        <h4>jaggery</h4>
                        <h>29-08-2024</h>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllProduct;
