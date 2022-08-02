import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  getItemsets,
  reset as itemsetReset,
} from '../features/itemsets/itemsetSlice'
import { getRiders, reset as riderReset } from '../features/riders/riderSlice'
import Spinner from '../components/Spinner'

const Playground = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const {
    itemsets,
    isLoading: isItemsetLoading,
    isError: isItemsetError,
    message: itemsetMessage,
  } = useSelector((state) => state.itemsets)
  useEffect(() => {
    if (isItemsetError) {
      console.log(itemsetMessage)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getItemsets())

    return () => {
      dispatch(itemsetReset())
    }
  }, [user, navigate, isItemsetError, itemsetMessage, dispatch])

  const {
    riders,
    isLoading: isRiderLoading,
    isError: isRiderError,
    message: riderMessage,
  } = useSelector((state) => state.riders)
  useEffect(() => {
    if (isRiderError) {
      console.log(riderMessage)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getRiders())

    return () => {
      dispatch(riderReset())
    }
  }, [user, navigate, isRiderError, riderMessage, dispatch])

  if (isRiderLoading || isRiderLoading) {
    return <Spinner />
  }

  return <></>
}

export default Playground
