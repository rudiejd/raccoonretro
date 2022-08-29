import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Sprint'],
  endpoints: (builder) => ({
    getSprints: builder.query({
      query: () => '/sprints',
      providesTags: (result = [], error, arg) => [
        'Sprint',
        ...result.map(({ id }) => ({ type: 'Sprint', id })),
      ],
    }),
    getSprint: builder.query({
      query: (sprintId) => `/sprints/${sprintId}`,
      providesTags: (result, error, arg) => [{ type: 'Sprint', id: arg }],
    }),
    addNewSprint: builder.mutation({
      query: (initialSprint) => ({
        url: 'sprints',
        method: 'POST',
        body: initialSprint,
      }),
      invalidatesTags: ['Sprint'],
    }),
    editSprint: builder.mutation({
      query: (sprint) => ({
        url: `sprints/${sprint.id}`,
        method: 'PATCH',
        body: sprint,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Sprint', id: arg.id }],
    }),
    addCard: builder.mutation({
      query: ({ sprintId, card }) => ({
        url: `sprints/${sprintId.sprintId.toString()}/cards`,
        method: 'POST',
        // In a real app, we'd probably need to base this on user ID somehow
        // so that a user can't do the same reaction more than once
        body: { card },
      }),
      invalidatesTags: ['Sprint']
    }),
  }),
})

export const {
  useGetSprintsQuery,
  useGetSprintQuery,
  useAddNewSprintMutation,
  useAddCardMutation,
  useEditSprintMutation,
} = apiSlice
