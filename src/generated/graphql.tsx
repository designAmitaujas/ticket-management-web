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

export type IChangePassword = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
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
  changePassword: IStatusResponse;
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


export type MutationChangePasswordArgs = {
  options: IChangePassword;
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

export type AuthResolverMutationVariables = Exact<{
  options: IAuthInput;
}>;


export type AuthResolverMutation = { __typename?: 'Mutation', authResolver: { __typename?: 'IAuthResoverResponse', success: boolean, msg: string, jwt: string, email: string, name: string, user?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null } };

export type GetDepartmentQuestionsByIdQueryVariables = Exact<{
  options: IGetById;
}>;


export type GetDepartmentQuestionsByIdQuery = { __typename?: 'Query', getDepartmentQuestionsById: { __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean, department?: { __typename?: 'Department', _id: string, isActive: boolean, name: string } | null } };

export type GetAllDepartmentQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDepartmentQuestionsQuery = { __typename?: 'Query', getAllDepartmentQuestions: Array<{ __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean, department?: { __typename?: 'Department', _id: string, isActive: boolean, name: string } | null }> };


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