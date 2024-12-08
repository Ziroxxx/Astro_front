import { createSlice } from "@reduxjs/toolkit"
import { useSelector, useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { RootState, AppDispatch } from "../store";
import { MMwithPlanetSerial, PlanetsSerial, RequestDetailSerial, UserSerial } from "../api/Api";

export const getPlanetByName = createAsyncThunk<PlanetsSerial, string>(
    'data/setPlanetPage',
    async (PlanetName) => {
        const response = await api.planets.planetsList({PlanetName})
        return response.data
    }
)

export const add2Wish = createAsyncThunk<RequestDetailSerial, string, { rejectValue: { message: string; data?: any } }>(
    'data/add2Wish',
    async (planetID, {rejectWithValue}) => {
        const response = await api.planet.planetCreate(planetID)
        if(response.status == 200)
            return response.data
        return rejectWithValue({ message: 'Already processed', data: response.data })
    }
)

export const loginAction = createAsyncThunk<UserSerial, {username: string, password: string}>(
    'data/loginAction',
    async (userInput) => {
        const response = await api.user.userLoginCreate({username: userInput.username, password: userInput.password})
        return response.data
    }
)

export const logOutAction = createAsyncThunk(
    'data/logOutAction',
    async () => {
        const response = await api.user.userLogoutCreate()
        return response
    }
)

export const getPlanetsInCons = createAsyncThunk<RequestDetailSerial, string>(
    'data/getPlanetsInCons',
    async (id) => {
        const  response = await api.consPeriod.consPeriodRead(id)
        return response.data
    }
)

export const delFromWishAction = createAsyncThunk<MMwithPlanetSerial[], {req_id: string, planet_id: string}>(
    'data/delFromWishAction',
    async (mm) => {
        const respone = await api.mm.mmDelete(mm.req_id, mm.planet_id)
        return respone.data
    }
)

interface DataState{
    PlanetName: string,
    userInfo: UserSerial | null,
    wishID: string,
    wishCount: number,
    dateStart: string,
    dateEnd: string,
    constellation: string

}

const initialState: DataState = {
    PlanetName: '',
    userInfo: null,
    wishID: '',
    wishCount: 0,
    dateStart: '',
    dateEnd: '',
    constellation: ''
}

const dataSlice = createSlice({
    name: "data",
    initialState,
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
    },
    extraReducers: (builder) => {
        builder.addCase(getPlanetByName.fulfilled, (state, action) => {
            state.wishID = action.payload.wishID
            state.wishCount = action.payload.wishCount
        })

        builder.addCase(add2Wish.fulfilled, (state, action) => {
            state.wishCount += 1
            if(action.payload.reqID)
                state.wishID = action.payload.reqID.toString()
        })

        builder.addCase(add2Wish.rejected, () => {
            console.log("Уже добавлено")
        })

        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.userInfo = action.payload
        })

        builder.addCase(logOutAction.fulfilled, (state) => {
            state.PlanetName = ''
            state.constellation = ''
            state.dateEnd = ''
            state.dateStart = ''
            state.userInfo = null
            state.wishCount = 0
            state.wishID = ''
        })

        builder.addCase(getPlanetsInCons.fulfilled, (state, action) => {
            if(action.payload.constellation && action.payload.dateStart && action.payload.dateEnd){
                state.constellation = action.payload.constellation
                state.dateStart = action.payload.dateStart
                state.dateEnd = action.payload.dateEnd
            }
        })
        builder.addCase(delFromWishAction.fulfilled, (state) => {
            state.wishCount -= 1
        })
    }
})

export const usePlanetName = () =>
    useSelector((state: RootState) => state.ourData.PlanetName)

export const useUserInfo = () =>
    useSelector((state: RootState) => state.ourData.userInfo)

export const useWishID = () =>
    useSelector((state: RootState) => state.ourData.wishID)

export const useWishCount = () =>
    useSelector((state: RootState) => state.ourData.wishCount)

export const useDateStart = () =>
    useSelector((state: RootState) => state.ourData.dateStart)

export const useDateEnd = () =>
    useSelector((state: RootState) => state.ourData.dateEnd)

export const useConstellation = () =>
    useSelector((state: RootState) => state.ourData.constellation)

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

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default dataSlice.reducer