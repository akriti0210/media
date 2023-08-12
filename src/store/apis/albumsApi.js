import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { faker } from '@faker-js/faker'

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        fetchFn: async (...args) => {
            // remove for production
            await pause(1000)
            return fetch(...args)
        }
    }),
    endpoints(builder) {
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    // working fine because it has userId in album object
                    // not always the case
                    // return [{ type: 'Album', id: album.userId }]

                    // better solution
                    return [{ type: 'Album', id: album.id }]
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'PUT'
                    }
                }
            }),
            addAlbum: builder.mutation({
                // invalidatesTags: ['Album'],
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'UsersAlbums', id: user.id }]  
                },
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        }
                    }
                }
            }),
            fetchAlbums: builder.query({
                // providesTags: ['Album'],
                providesTags: (result, error, user) => {
                    // return [{ type: 'Album', id: user.id }]

                    // in case of removeAlbum
                    const tags = result.map(album => {
                        return { type: 'Album', id: album.id }
                    })
                    tags.push({ type: 'UsersAlbums', id: user.id })
                    return tags
                },
                // user passed 
                // from customHook useFetchAlbumsQuery in AlbumsList
                query: (user) => {
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id
                        },
                        method: 'GET'
                    }
                }
            })
        }
    }
})

export const {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation
} = albumsApi
export { albumsApi }