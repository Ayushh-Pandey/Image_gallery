import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const IMAGES_API = process.env.REACT_APP_IMAGES_API;

export const imagesApi = createApi({
    reducerPath: 'imagesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.unsplash.com/'}),
    endpoints : (builder)=>({
        getImageByTag: builder.query({
            query: ({query,page})=> `search/photos?page=${page}&query=${query}&client_id=${IMAGES_API}`,

        })
    })
})

export const {useGetImageByTagQuery} = imagesApi;