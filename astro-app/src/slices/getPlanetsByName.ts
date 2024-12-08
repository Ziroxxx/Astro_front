import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api";
import { PlanetsSerial } from "../api/Api";

export const getPlanetByName = createAsyncThunk<PlanetsSerial, string>(
    'data/setPlanetPage',
    async (PlanetName, thunkAPI) => {
        const response = await api.planets.planetsList({PlanetName: PlanetName})
        return response.data
    }
)