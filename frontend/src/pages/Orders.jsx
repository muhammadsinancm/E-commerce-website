import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopeContext } from '../context/ShopeContext'
import axios from 'axios';

function Orders() {
  const {backendUrl, token, currency, products} = useContext(ShopeContext);
  const [orderData, setOrderData] = useState([])

  const loadOrderData = async ()=> {
    try {

      if (!token) {
        return null
      }

      const responce = await axios.post(backendUrl + '/api/order/userorders', {}, {headers:{token}})
      console.log(responce);
      
      if (responce.data.success) {
        let allOrdersItem = []
        responce.data.orders.map((order)=> {
        order.items.map((items)=> {
          items['status'] = order.status
          items['payment'] = order.payment
          items['paymentMethod'] = order.paymentMethod
          items['date'] = order.date
          allOrdersItem.push(items)
        })
        })
        
        
        setOrderData(allOrdersItem.reverse());
        
        orderData.map((items)=> {
          console.log(items.date);
          
        })
        
      }
       
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=> {
    loadOrderData()
  }, [])

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>

      <div>
        {
          orderData.map((items, index)=> (
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                 <img className='w-16' src={items.image[0]} alt="" />
                 <div>
                  <p className='sm:text-base font-medium'>{items.name}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{items.price}</p>
                   <p>{currency}{items.price}</p>
                    <p>Quantity:{items.quantity}</p>
                    <p>Size: {items.size}</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(items.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gray-400'>{items.paymentMethod}</span></p>
                 </div>
              </div>
               
               <div className='md:w-1/2 flex justify-between'>
                 <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>Ready to ship</p>
                 </div>
                    <p className='text-sm md:text-base'>{items.status}</p>
                 </div>
                 <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
               </div>

          ))
        }
      </div>

    </div>
  )
}

export default Orders
