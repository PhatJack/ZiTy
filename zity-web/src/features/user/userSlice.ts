import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'
import { User } from '@/schema/user.validate'

interface QrScanInformation {
  nationID?: string
  name?: string
  dob?: string
  gender?: string
}

interface UserState {
  isEditingUser: boolean
  qrScanInformation?: Partial<QrScanInformation>
  user?: User
}

const initialState: UserState = {
  isEditingUser: false,
  qrScanInformation: undefined,
  user: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getQrScanInformation: (
      state,
      action: PayloadAction<QrScanInformation | undefined>,
    ) => {
      state.qrScanInformation = action.payload
    },
    getUserInformation: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
  },
})

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<
      ResponseDataType<User>,
      { page?: number; username?: string }
    >({
      query: (params = { page: 1, username: '' }) => {
        let baseUrl = `users?page=${params.page}`
        if (params.username && params.username != '') {
          baseUrl += `&username=like:${params.username}`
        }
        return {
          url: baseUrl,
        }
      },
      providesTags: (results) =>
        results
          ? [
              ...results.contents.map(({ id }) => ({
                type: 'Users' as const,
                id,
              })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    getUserById: builder.query<User, string | number>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => 'users/me',
    }),
    createUser: builder.mutation<
      void,
      Partial<User> &
        Omit<
          User,
          | 'id'
          | 'createdAt'
          | 'updatedAt'
          | 'items'
          | 'otherAnswers'
          | 'relationships'
          | 'surveys'
          | 'userAnswers'
        >
    >({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
    }),
    updateUser: builder.mutation<
      void,
      {
        id: string | number
        body: Partial<User> &
          Omit<
            User,
            | 'id'
            | 'createdAt'
            | 'updatedAt'
            | 'items'
            | 'otherAnswers'
            | 'relationships'
            | 'surveys'
            | 'userAnswers'
          >
      }
    >({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: 'PUT',
        body: data.body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Users', id }],
    }),
    deleteUser: builder.mutation<void, string | number | undefined>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Users', id }],
    }),
  }),
})

export default userSlice.reducer
export const { getQrScanInformation, getUserInformation } = userSlice.actions
export const {
  useGetUserQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} = userApiSlice
