import {configureStore} from '@reduxjs/toolkit';

import singleVideoReducer from './single.redux';

const store = configureStore({
    reducer: {
        singleVideo:singleVideoReducer
    }
})

export default store;