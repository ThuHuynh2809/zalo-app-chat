import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import mainReducer from './slice/mainSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
    // Các reducer khác nếu có
  },
});




