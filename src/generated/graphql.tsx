import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Department = {
  __typename?: 'Department';
  _id: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
};

export type DepartmentQuestions = {
  __typename?: 'DepartmentQuestions';
  _id: Scalars['String'];
  department?: Maybe<Department>;
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
};

export type IAuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type IAuthResoverResponse = {
  __typename?: 'IAuthResoverResponse';
  email: Scalars['String'];
  jwt: Scalars['String'];
  msg: Scalars['String'];
  name: Scalars['String'];
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type ICreateDepartment = {
  _id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
};

export type ICreateDepartmentQuestions = {
  _id?: InputMaybe<Scalars['String']>;
  department: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
};

export type ICreateTickets = {
  _id?: InputMaybe<Scalars['String']>;
  assignedCompany: Scalars['String'];
  assignedCustomer: Scalars['String'];
  assignedMiddleMan: Scalars['String'];
  department: Scalars['String'];
  departmentQuestion: Scalars['String'];
  description: Scalars['String'];
  file: Scalars['String'];
  isActive: Scalars['Boolean'];
  isResolved: Scalars['Boolean'];
  question: Scalars['String'];
};

export type ICreateUser = {
  _id?: InputMaybe<Scalars['String']>;
  assignedDepartment: Scalars['String'];
  email: Scalars['String'];
  hash: Scalars['String'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  isCompany: Scalars['Boolean'];
  isCustomer: Scalars['Boolean'];
  isMiddleMan: Scalars['Boolean'];
  isSuperAdmin: Scalars['Boolean'];
  name: Scalars['String'];
};

export type IGetById = {
  id: Scalars['String'];
};

export type IStatusResponse = {
  __typename?: 'IStatusResponse';
  data: Scalars['String'];
  msg: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authResolver: IAuthResoverResponse;
  createOrUpdateDepartment: IStatusResponse;
  createOrUpdateDepartmentQuestions: IStatusResponse;
  createOrUpdateTickets: IStatusResponse;
  createOrUpdateUser: IStatusResponse;
  deleteDepartment: IStatusResponse;
  deleteDepartmentQuestions: IStatusResponse;
  deleteTickets: IStatusResponse;
  deleteUser: IStatusResponse;
};


export type MutationAuthResolverArgs = {
  options: IAuthInput;
};


export type MutationCreateOrUpdateDepartmentArgs = {
  options: ICreateDepartment;
};


export type MutationCreateOrUpdateDepartmentQuestionsArgs = {
  options: ICreateDepartmentQuestions;
};


export type MutationCreateOrUpdateTicketsArgs = {
  options: ICreateTickets;
};


export type MutationCreateOrUpdateUserArgs = {
  options: ICreateUser;
};


export type MutationDeleteDepartmentArgs = {
  options: IGetById;
};


export type MutationDeleteDepartmentQuestionsArgs = {
  options: IGetById;
};


export type MutationDeleteTicketsArgs = {
  options: IGetById;
};


export type MutationDeleteUserArgs = {
  options: IGetById;
};

export type Query = {
  __typename?: 'Query';
  getAllDepartment: Array<Department>;
  getAllDepartmentQuestions: Array<DepartmentQuestions>;
  getAllTickets: Array<Tickets>;
  getAllUser: Array<User>;
  getDepartmentById: Department;
  getDepartmentQuestionsById: DepartmentQuestions;
  getTicketsById: Tickets;
  getUserById: User;
};


export type QueryGetDepartmentByIdArgs = {
  options: IGetById;
};


export type QueryGetDepartmentQuestionsByIdArgs = {
  options: IGetById;
};


export type QueryGetTicketsByIdArgs = {
  options: IGetById;
};


export type QueryGetUserByIdArgs = {
  options: IGetById;
};

export type Tickets = {
  __typename?: 'Tickets';
  _id: Scalars['String'];
  assignedCompany?: Maybe<User>;
  assignedCustomer?: Maybe<User>;
  assignedMiddleMan?: Maybe<User>;
  department?: Maybe<Department>;
  departmentQuestion?: Maybe<DepartmentQuestions>;
  description: Scalars['String'];
  file: Scalars['String'];
  isActive: Scalars['Boolean'];
  isResolved: Scalars['Boolean'];
  question: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  assignedDepartment?: Maybe<Department>;
  email: Scalars['String'];
  hash: Scalars['String'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  isCompany: Scalars['Boolean'];
  isCustomer: Scalars['Boolean'];
  isMiddleMan: Scalars['Boolean'];
  isSuperAdmin: Scalars['Boolean'];
  name: Scalars['String'];
};

export type CreateOrUpdateDepartmentMutationVariables = Exact<{
  options: ICreateDepartment;
}>;


export type CreateOrUpdateDepartmentMutation = { __typename?: 'Mutation', createOrUpdateDepartment: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type DeleteDepartmentMutationVariables = Exact<{
  options: IGetById;
}>;


export type DeleteDepartmentMutation = { __typename?: 'Mutation', deleteDepartment: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type DeleteDepartmentQuestionsMutationVariables = Exact<{
  options: IGetById;
}>;


export type DeleteDepartmentQuestionsMutation = { __typename?: 'Mutation', deleteDepartmentQuestions: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type CreateOrUpdateDepartmentQuestionsMutationVariables = Exact<{
  options: ICreateDepartmentQuestions;
}>;


export type CreateOrUpdateDepartmentQuestionsMutation = { __typename?: 'Mutation', createOrUpdateDepartmentQuestions: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type AuthResolverMutationVariables = Exact<{
  options: IAuthInput;
}>;


export type AuthResolverMutation = { __typename?: 'Mutation', authResolver: { __typename?: 'IAuthResoverResponse', success: boolean, msg: string, jwt: string, email: string, name: string, user?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null } };

export type GetDepartmentByIdQueryVariables = Exact<{
  options: IGetById;
}>;


export type GetDepartmentByIdQuery = { __typename?: 'Query', getDepartmentById: { __typename?: 'Department', _id: string, name: string, isActive: boolean } };

export type GetAllDepartmentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDepartmentQuery = { __typename?: 'Query', getAllDepartment: Array<{ __typename?: 'Department', _id: string, name: string, isActive: boolean }> };

export type GetDepartmentQuestionsByIdQueryVariables = Exact<{
  options: IGetById;
}>;


export type GetDepartmentQuestionsByIdQuery = { __typename?: 'Query', getDepartmentQuestionsById: { __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean, department?: { __typename?: 'Department', _id: string, isActive: boolean, name: string } | null } };

export type GetAllDepartmentQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDepartmentQuestionsQuery = { __typename?: 'Query', getAllDepartmentQuestions: Array<{ __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean, department?: { __typename?: 'Department', _id: string, isActive: boolean, name: string } | null }> };


export const CreateOrUpdateDepartmentDocument = gql`
    mutation CreateOrUpdateDepartment($options: ICreateDepartment!) {
  createOrUpdateDepartment(options: $options) {
    success
    msg
    data
  }
}
    `;
export type CreateOrUpdateDepartmentMutationFn = Apollo.MutationFunction<CreateOrUpdateDepartmentMutation, CreateOrUpdateDepartmentMutationVariables>;

/**
 * __useCreateOrUpdateDepartmentMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateDepartmentMutation, { data, loading, error }] = useCreateOrUpdateDepartmentMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOrUpdateDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateDepartmentMutation, CreateOrUpdateDepartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateDepartmentMutation, CreateOrUpdateDepartmentMutationVariables>(CreateOrUpdateDepartmentDocument, options);
      }
export type CreateOrUpdateDepartmentMutationHookResult = ReturnType<typeof useCreateOrUpdateDepartmentMutation>;
export type CreateOrUpdateDepartmentMutationResult = Apollo.MutationResult<CreateOrUpdateDepartmentMutation>;
export type CreateOrUpdateDepartmentMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateDepartmentMutation, CreateOrUpdateDepartmentMutationVariables>;
export const DeleteDepartmentDocument = gql`
    mutation DeleteDepartment($options: IGetByID!) {
  deleteDepartment(options: $options) {
    success
    msg
    data
  }
}
    `;
export type DeleteDepartmentMutationFn = Apollo.MutationFunction<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>;

/**
 * __useDeleteDepartmentMutation__
 *
 * To run a mutation, you first call `useDeleteDepartmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDepartmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDepartmentMutation, { data, loading, error }] = useDeleteDepartmentMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useDeleteDepartmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>(DeleteDepartmentDocument, options);
      }
export type DeleteDepartmentMutationHookResult = ReturnType<typeof useDeleteDepartmentMutation>;
export type DeleteDepartmentMutationResult = Apollo.MutationResult<DeleteDepartmentMutation>;
export type DeleteDepartmentMutationOptions = Apollo.BaseMutationOptions<DeleteDepartmentMutation, DeleteDepartmentMutationVariables>;
export const DeleteDepartmentQuestionsDocument = gql`
    mutation DeleteDepartmentQuestions($options: IGetByID!) {
  deleteDepartmentQuestions(options: $options) {
    success
    msg
    data
  }
}
    `;
export type DeleteDepartmentQuestionsMutationFn = Apollo.MutationFunction<DeleteDepartmentQuestionsMutation, DeleteDepartmentQuestionsMutationVariables>;

/**
 * __useDeleteDepartmentQuestionsMutation__
 *
 * To run a mutation, you first call `useDeleteDepartmentQuestionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDepartmentQuestionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDepartmentQuestionsMutation, { data, loading, error }] = useDeleteDepartmentQuestionsMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useDeleteDepartmentQuestionsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDepartmentQuestionsMutation, DeleteDepartmentQuestionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDepartmentQuestionsMutation, DeleteDepartmentQuestionsMutationVariables>(DeleteDepartmentQuestionsDocument, options);
      }
export type DeleteDepartmentQuestionsMutationHookResult = ReturnType<typeof useDeleteDepartmentQuestionsMutation>;
export type DeleteDepartmentQuestionsMutationResult = Apollo.MutationResult<DeleteDepartmentQuestionsMutation>;
export type DeleteDepartmentQuestionsMutationOptions = Apollo.BaseMutationOptions<DeleteDepartmentQuestionsMutation, DeleteDepartmentQuestionsMutationVariables>;
export const CreateOrUpdateDepartmentQuestionsDocument = gql`
    mutation CreateOrUpdateDepartmentQuestions($options: ICreateDepartmentQuestions!) {
  createOrUpdateDepartmentQuestions(options: $options) {
    success
    msg
    data
  }
}
    `;
export type CreateOrUpdateDepartmentQuestionsMutationFn = Apollo.MutationFunction<CreateOrUpdateDepartmentQuestionsMutation, CreateOrUpdateDepartmentQuestionsMutationVariables>;

/**
 * __useCreateOrUpdateDepartmentQuestionsMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateDepartmentQuestionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateDepartmentQuestionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateDepartmentQuestionsMutation, { data, loading, error }] = useCreateOrUpdateDepartmentQuestionsMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOrUpdateDepartmentQuestionsMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateDepartmentQuestionsMutation, CreateOrUpdateDepartmentQuestionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateDepartmentQuestionsMutation, CreateOrUpdateDepartmentQuestionsMutationVariables>(CreateOrUpdateDepartmentQuestionsDocument, options);
      }
export type CreateOrUpdateDepartmentQuestionsMutationHookResult = ReturnType<typeof useCreateOrUpdateDepartmentQuestionsMutation>;
export type CreateOrUpdateDepartmentQuestionsMutationResult = Apollo.MutationResult<CreateOrUpdateDepartmentQuestionsMutation>;
export type CreateOrUpdateDepartmentQuestionsMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateDepartmentQuestionsMutation, CreateOrUpdateDepartmentQuestionsMutationVariables>;
export const AuthResolverDocument = gql`
    mutation AuthResolver($options: IAuthInput!) {
  authResolver(options: $options) {
    success
    msg
    jwt
    email
    name
    user {
      _id
      name
      email
      hash
      isCustomer
      isMiddleMan
      isCompany
      isAdmin
      isSuperAdmin
      isActive
    }
  }
}
    `;
export type AuthResolverMutationFn = Apollo.MutationFunction<AuthResolverMutation, AuthResolverMutationVariables>;

/**
 * __useAuthResolverMutation__
 *
 * To run a mutation, you first call `useAuthResolverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthResolverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authResolverMutation, { data, loading, error }] = useAuthResolverMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAuthResolverMutation(baseOptions?: Apollo.MutationHookOptions<AuthResolverMutation, AuthResolverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthResolverMutation, AuthResolverMutationVariables>(AuthResolverDocument, options);
      }
export type AuthResolverMutationHookResult = ReturnType<typeof useAuthResolverMutation>;
export type AuthResolverMutationResult = Apollo.MutationResult<AuthResolverMutation>;
export type AuthResolverMutationOptions = Apollo.BaseMutationOptions<AuthResolverMutation, AuthResolverMutationVariables>;
export const GetDepartmentByIdDocument = gql`
    query GetDepartmentById($options: IGetByID!) {
  getDepartmentById(options: $options) {
    _id
    name
    isActive
  }
}
    `;

/**
 * __useGetDepartmentByIdQuery__
 *
 * To run a query within a React component, call `useGetDepartmentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDepartmentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDepartmentByIdQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetDepartmentByIdQuery(baseOptions: Apollo.QueryHookOptions<GetDepartmentByIdQuery, GetDepartmentByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDepartmentByIdQuery, GetDepartmentByIdQueryVariables>(GetDepartmentByIdDocument, options);
      }
export function useGetDepartmentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDepartmentByIdQuery, GetDepartmentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDepartmentByIdQuery, GetDepartmentByIdQueryVariables>(GetDepartmentByIdDocument, options);
        }
export type GetDepartmentByIdQueryHookResult = ReturnType<typeof useGetDepartmentByIdQuery>;
export type GetDepartmentByIdLazyQueryHookResult = ReturnType<typeof useGetDepartmentByIdLazyQuery>;
export type GetDepartmentByIdQueryResult = Apollo.QueryResult<GetDepartmentByIdQuery, GetDepartmentByIdQueryVariables>;
export const GetAllDepartmentDocument = gql`
    query GetAllDepartment {
  getAllDepartment {
    _id
    name
    isActive
  }
}
    `;

/**
 * __useGetAllDepartmentQuery__
 *
 * To run a query within a React component, call `useGetAllDepartmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDepartmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDepartmentQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDepartmentQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDepartmentQuery, GetAllDepartmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDepartmentQuery, GetAllDepartmentQueryVariables>(GetAllDepartmentDocument, options);
      }
export function useGetAllDepartmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDepartmentQuery, GetAllDepartmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDepartmentQuery, GetAllDepartmentQueryVariables>(GetAllDepartmentDocument, options);
        }
export type GetAllDepartmentQueryHookResult = ReturnType<typeof useGetAllDepartmentQuery>;
export type GetAllDepartmentLazyQueryHookResult = ReturnType<typeof useGetAllDepartmentLazyQuery>;
export type GetAllDepartmentQueryResult = Apollo.QueryResult<GetAllDepartmentQuery, GetAllDepartmentQueryVariables>;
export const GetDepartmentQuestionsByIdDocument = gql`
    query GetDepartmentQuestionsById($options: IGetByID!) {
  getDepartmentQuestionsById(options: $options) {
    _id
    name
    department {
      _id
      isActive
      name
    }
    isActive
  }
}
    `;

/**
 * __useGetDepartmentQuestionsByIdQuery__
 *
 * To run a query within a React component, call `useGetDepartmentQuestionsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDepartmentQuestionsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDepartmentQuestionsByIdQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetDepartmentQuestionsByIdQuery(baseOptions: Apollo.QueryHookOptions<GetDepartmentQuestionsByIdQuery, GetDepartmentQuestionsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDepartmentQuestionsByIdQuery, GetDepartmentQuestionsByIdQueryVariables>(GetDepartmentQuestionsByIdDocument, options);
      }
export function useGetDepartmentQuestionsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDepartmentQuestionsByIdQuery, GetDepartmentQuestionsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDepartmentQuestionsByIdQuery, GetDepartmentQuestionsByIdQueryVariables>(GetDepartmentQuestionsByIdDocument, options);
        }
export type GetDepartmentQuestionsByIdQueryHookResult = ReturnType<typeof useGetDepartmentQuestionsByIdQuery>;
export type GetDepartmentQuestionsByIdLazyQueryHookResult = ReturnType<typeof useGetDepartmentQuestionsByIdLazyQuery>;
export type GetDepartmentQuestionsByIdQueryResult = Apollo.QueryResult<GetDepartmentQuestionsByIdQuery, GetDepartmentQuestionsByIdQueryVariables>;
export const GetAllDepartmentQuestionsDocument = gql`
    query GetAllDepartmentQuestions {
  getAllDepartmentQuestions {
    _id
    name
    department {
      _id
      isActive
      name
    }
    isActive
  }
}
    `;

/**
 * __useGetAllDepartmentQuestionsQuery__
 *
 * To run a query within a React component, call `useGetAllDepartmentQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDepartmentQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDepartmentQuestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDepartmentQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllDepartmentQuestionsQuery, GetAllDepartmentQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllDepartmentQuestionsQuery, GetAllDepartmentQuestionsQueryVariables>(GetAllDepartmentQuestionsDocument, options);
      }
export function useGetAllDepartmentQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllDepartmentQuestionsQuery, GetAllDepartmentQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllDepartmentQuestionsQuery, GetAllDepartmentQuestionsQueryVariables>(GetAllDepartmentQuestionsDocument, options);
        }
export type GetAllDepartmentQuestionsQueryHookResult = ReturnType<typeof useGetAllDepartmentQuestionsQuery>;
export type GetAllDepartmentQuestionsLazyQueryHookResult = ReturnType<typeof useGetAllDepartmentQuestionsLazyQuery>;
export type GetAllDepartmentQuestionsQueryResult = Apollo.QueryResult<GetAllDepartmentQuestionsQuery, GetAllDepartmentQuestionsQueryVariables>;