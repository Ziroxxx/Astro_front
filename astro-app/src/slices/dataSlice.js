import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        Data: [],
        PlanetName: '',
    },
    reducers: {
        setData(state, {payload}) {  // изменяем состояние на полученные данные
            state.Data = payload
        },
        setPlanetName(state, {payload}) {
            state.PlanetName = payload
        }
    }
})

export const useData = () =>
    useSelector((state) => state.ourData.Data)

export const usePlanetName = () =>
    useSelector((state) => state.ourData.PlanetName)

export const {
    setData: setDataAction,
    setPlanetName: setPlanetNameAction
} = dataSlice.actions


export default dataSlice.reducer