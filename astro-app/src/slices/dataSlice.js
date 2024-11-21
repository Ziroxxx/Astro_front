import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";


const dataSlice = createSlice({
    name: "data",
    initialState: {
        PlanetName: '',
    },
    reducers: {
        setPlanetName(state, {payload}) {
            state.PlanetName = payload
        }
    }
})

export const usePlanetName = () =>
    useSelector((state) => state.ourData.PlanetName)

export const {
    setPlanetName: setPlanetNameAction
} = dataSlice.actions


export default dataSlice.reducer