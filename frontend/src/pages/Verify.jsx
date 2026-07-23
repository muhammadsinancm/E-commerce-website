import React from 'react'
import { useContext } from 'react'
import { ShopeContext } from '../context/ShopeContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function Verify() {

  const {navigate, token, setCartItems, bakcendUrl} = useContext(ShopeContext)
  const {serchParams, setSerchParams} = useSearchParams()

  const success = serchParams.get('success')
  const orderId = serchParams.get('orderId')

  const verifyPayment = async ()=> {

    try {

        if (!token) {
            return null
        }

        const responce = await axios.post(bakcendUrl + '/api/order/verifyStripe', {success, orderId}, {headers:{token}})
        if (responce.data.success) {
            setCartItems({})
            navigate('/orders')
        } else {
            navigate('/cart')
        }
        
    } catch (error) {
        console.log(error);
        toast.error(error.message)
        
    }

  }

  useEffect(()=> {
    verifyPayment()
  }, [])

  return (
    <div>
      
    </div>
  )
}

export default Verify
