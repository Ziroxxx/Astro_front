import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        PlanetName: '',
        userInfo: {},
        wishID: '',
        wishCount: 0,
        dateStart: '',
        dateEnd: '',
        constellation: ''
    },
    reducers: {
        setPlanetName(state, {payload}) {
            state.PlanetName = payload
        },
        setUserInfo(state, {payload}){
            state.userInfo = payload
        },
        setWishID(state, {payload}){
            state.wishID = payload
        },
        setWishCount(state, {payload}){
            state.wishCount = payload
        },
        addWishCount(state){
            state.wishCount += 1
        },
        delWishCount(state){
            state.wishCount -= 1
        },
        setDateStart(state, {payload}){
            state.dateStart = payload
        },
        setDateEnd(state, {payload}){
            state.dateEnd = payload
        },
        setConstellation(state, {payload}){
            state.constellation = payload
        }
    }
})

export const usePlanetName = () =>
    useSelector((state) => state.ourData.PlanetName)

export const useUserInfo = () =>
    useSelector((state) => state.ourData.userInfo)

export const useWishID = () =>
    useSelector((state) => state.ourData.wishID)

export const useWishCount = () =>
    useSelector((state) => state.ourData.wishCount)

export const useDateStart = () =>
    useSelector((state) => state.ourData.dateStart)

export const useDateEnd = () =>
    useSelector((state) => state.ourData.dateEnd)

export const useConstellation = () =>
    useSelector((state) => state.ourData.constellation)

export const {
    setPlanetName: setPlanetNameAction,
    setUserInfo: setUserInfoAction,
    setWishID: setWishIDAction,
    setWishCount: setWishCountAction,
    addWishCount: addWishCountAction,
    delWishCount: delWishCountAction,
    setDateStart: setDateStartAction,
    setDateEnd: setDateEndAction,
    setConstellation: setConstellationAction
} = dataSlice.actions


export default dataSlice.reducer