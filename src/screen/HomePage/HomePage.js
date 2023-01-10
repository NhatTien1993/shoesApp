import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { memo } from 'react'
import AppBar from './components/AppBar'
import Menu from './components/Menu'
import ListShoes from './components/ListShoes'
import RelateShoes from './components/RelateShoes'
import { KEY_TOKEN, SIZES } from '../../common/Constant'
import { getStorage, saveStorage } from '../../common/LocalStorage'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addOrderList } from '../../redux/ReduxSlice'
export default memo(function HomePage() {
  const dispatch = useDispatch()
  const orderListShoes = useSelector((state) => state.redux.orderList)
  useEffect(() => {
    //  resetOderListStorage() // Reset order list local
    getLocalStorage()
  }, [])
  const getLocalStorage = async () => {
    const data = await getStorage(KEY_TOKEN.myCart)
    if (data) {
      dispatch(addOrderList(data))
    }
  }
  const resetOderListStorage = () => {      
    dispatch(addOrderList([]))
    saveStorage(KEY_TOKEN.myCart, orderListShoes)
    console.log(orderListShoes)
  }
  return (
    <ScrollView>
      <View style={{ backgroundColor: 'black', width: '100%', height: 250, position: 'absolute', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }} />
      <SafeAreaView style={{ minHeight: SIZES.height(105) }}>
        <AppBar />
        <Menu />
        <ListShoes />
        <RelateShoes />
      </SafeAreaView>
    </ScrollView>
  )
})