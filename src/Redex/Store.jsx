import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer,FLUSH,REHYDRATE,PERSIST,PURGE,REGISTER, PAUSE} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import { userSlice } from "./Auth/UserSlice.jsx"
import { driverSlice } from "./Auth/DriverSlice.jsx"
const persistConfig = { key:'user',storage,version:1};
const driverPersistConfig = { key:'driver',storage,version:1};

const userPersistReducer = persistReducer(persistConfig,userSlice.reducer);
const driverPersistReducer = persistReducer(driverPersistConfig,driverSlice.reducer);


export const Store = configureStore({
    reducer: {
        user: userPersistReducer,
        driver: driverPersistReducer,
    },
    middleware:(getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
});


export const persistor = persistStore(Store);