import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from './apis/albumsApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { photosApi } from './apis/photosApi';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    // albums: albumsApi.reducer
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware)
  }
});

// only one time
setupListeners(store.dispatch)

export * from './thunks/fetchUsers';
export * from './thunks/addUser';
export * from './thunks/removeUser';
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation
} from './apis/albumsApi'
export {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation
} from './apis/photosApi'