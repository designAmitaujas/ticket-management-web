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
  DateTime: any;
};

export type ClosedReason = {
  __typename?: 'ClosedReason';
  _id: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
};

export type CutomTicketResponse = {
  __typename?: 'CutomTicketResponse';
  ticket: Tickets;
  ticketBackAndForth: Array<TicketBackAndForth>;
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

export enum Direction {
  Company = 'COMPANY',
  Middle = 'MIDDLE',
  Null = 'NULL',
  User = 'USER'
}

export type EmailCredential = {
  __typename?: 'EmailCredential';
  _id: Scalars['String'];
  authPassword: Scalars['String'];
  authUser: Scalars['String'];
  host: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  port: Scalars['Float'];
  secure: Scalars['Boolean'];
};

export type EmailTemplate = {
  __typename?: 'EmailTemplate';
  _id: Scalars['String'];
  customId: Scalars['String'];
  emailCredentials?: Maybe<EmailCredential>;
  html: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
};

export type IAddTicketBackAndForth = {
  canCompanyAccept: Scalars['Boolean'];
  file: Scalars['String'];
  nextChooice: Direction;
  questionReply: Scalars['String'];
  ticketId: Scalars['String'];
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

export type ICountResponse = {
  __typename?: 'ICountResponse';
  totalClosedCount: Scalars['Float'];
  totalRunningCount: Scalars['Float'];
  totalTiketCount: Scalars['Float'];
};

export type ICreateClosedReason = {
  _id?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
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

export type ICreateEmailCredential = {
  _id?: InputMaybe<Scalars['String']>;
  authPassword: Scalars['String'];
  authUser: Scalars['String'];
  host: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  port: Scalars['Int'];
  secure: Scalars['Boolean'];
};

export type ICreateEmailTemplate = {
  _id?: InputMaybe<Scalars['String']>;
  customId: Scalars['String'];
  emailCredentials: Scalars['String'];
  html: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
};

export type ICreateTicketBackAndForth = {
  _id?: InputMaybe<Scalars['String']>;
  file: Scalars['String'];
  isActive: Scalars['Boolean'];
  isEdited: Scalars['Boolean'];
  isLastReopened: Scalars['Boolean'];
  isLastResolved: Scalars['Boolean'];
  isNexonCompany: Scalars['Boolean'];
  isNextOnCustomer: Scalars['Boolean'];
  isNextOnMiddleMan: Scalars['Boolean'];
  isRunningOnCustomer: Scalars['Boolean'];
  isRunningOnMiddleMan: Scalars['Boolean'];
  isRunnningOnCompany: Scalars['Boolean'];
  questionReply: Scalars['String'];
  ticket: Scalars['String'];
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
  mobile: Scalars['String'];
  question: Scalars['String'];
};

export type ICreateTransfetHistory = {
  _id?: InputMaybe<Scalars['String']>;
  reason: Scalars['String'];
  ticket: Scalars['String'];
  transferdUser: Scalars['String'];
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
  AddTicketBackAndForth: IStatusResponse;
  acceptTiketByCompany: IStatusResponse;
  acceptTiketByMiddleMan: IStatusResponse;
  authResolver: IAuthResoverResponse;
  changePassword: IStatusResponse;
  createOrUpdateClosedReason: IStatusResponse;
  createOrUpdateDepartment: IStatusResponse;
  createOrUpdateDepartmentQuestions: IStatusResponse;
  createOrUpdateEmailCredential: IStatusResponse;
  createOrUpdateEmailTemplate: IStatusResponse;
  createOrUpdateLawCategory: IStatusResponse;
  createOrUpdateTickets: IStatusResponse;
  createOrUpdateUser: IStatusResponse;
  deleteClosedReason: IStatusResponse;
  deleteDepartment: IStatusResponse;
  deleteDepartmentQuestions: IStatusResponse;
  deleteEmailCredential: IStatusResponse;
  deleteEmailTemplate: IStatusResponse;
  deleteTicketBackAndForth: IStatusResponse;
  deleteTickets: IStatusResponse;
  deleteUser: IStatusResponse;
  getTickerClosedById: IStatusResponse;
  transferTicket: IStatusResponse;
};


export type MutationAddTicketBackAndForthArgs = {
  options: IAddTicketBackAndForth;
};


export type MutationAcceptTiketByCompanyArgs = {
  options: IGetById;
};


export type MutationAcceptTiketByMiddleManArgs = {
  options: IGetById;
};


export type MutationAuthResolverArgs = {
  options: IAuthInput;
};


export type MutationChangePasswordArgs = {
  options: IChangePassword;
};


export type MutationCreateOrUpdateClosedReasonArgs = {
  options: ICreateClosedReason;
};


export type MutationCreateOrUpdateDepartmentArgs = {
  options: ICreateDepartment;
};


export type MutationCreateOrUpdateDepartmentQuestionsArgs = {
  options: ICreateDepartmentQuestions;
};


export type MutationCreateOrUpdateEmailCredentialArgs = {
  options: ICreateEmailCredential;
};


export type MutationCreateOrUpdateEmailTemplateArgs = {
  options: ICreateEmailTemplate;
};


export type MutationCreateOrUpdateLawCategoryArgs = {
  options: ICreateTicketBackAndForth;
};


export type MutationCreateOrUpdateTicketsArgs = {
  options: ICreateTickets;
};


export type MutationCreateOrUpdateUserArgs = {
  options: ICreateUser;
};


export type MutationDeleteClosedReasonArgs = {
  options: IGetById;
};


export type MutationDeleteDepartmentArgs = {
  options: IGetById;
};


export type MutationDeleteDepartmentQuestionsArgs = {
  options: IGetById;
};


export type MutationDeleteEmailCredentialArgs = {
  options: IGetById;
};


export type MutationDeleteEmailTemplateArgs = {
  options: IGetById;
};


export type MutationDeleteTicketBackAndForthArgs = {
  options: IGetById;
};


export type MutationDeleteTicketsArgs = {
  options: IGetById;
};


export type MutationDeleteUserArgs = {
  options: IGetById;
};


export type MutationGetTickerClosedByIdArgs = {
  options: IGetById;
};


export type MutationTransferTicketArgs = {
  options: ICreateTransfetHistory;
};

export type Query = {
  __typename?: 'Query';
  getAllAcceptAcceptByCompany: Array<Tickets>;
  getAllAcceptAcceptByMiddleMan: Array<Tickets>;
  getAllClosedReason: Array<ClosedReason>;
  getAllDepartment: Array<Department>;
  getAllDepartmentQuestions: Array<DepartmentQuestions>;
  getAllEmailCredentials: Array<EmailCredential>;
  getAllEmailTemplate: Array<EmailTemplate>;
  getAllTicketBackAndForth: Array<TicketBackAndForth>;
  getAllTickets: Array<Tickets>;
  getAllTransferUser: Array<User>;
  getAllUser: Array<User>;
  getClosedReasonById: ClosedReason;
  getDepartmentById: Department;
  getDepartmentQuestionsById: DepartmentQuestions;
  getEmailCredentialsById: EmailCredential;
  getEmailTemplateById: EmailTemplate;
  getMyTicketByCompany: Array<Tickets>;
  getMyTicketByMiddleMan: Array<Tickets>;
  getMyTicketByUser: Array<Tickets>;
  getTicketBackAndForthById: TicketBackAndForth;
  getTicketBackAndForthByTiketId: CutomTicketResponse;
  getTicketCount: ICountResponse;
  getTicketsById: Tickets;
  getUserById: User;
};


export type QueryGetClosedReasonByIdArgs = {
  options: IGetById;
};


export type QueryGetDepartmentByIdArgs = {
  options: IGetById;
};


export type QueryGetDepartmentQuestionsByIdArgs = {
  options: IGetById;
};


export type QueryGetEmailCredentialsByIdArgs = {
  options: IGetById;
};


export type QueryGetEmailTemplateByIdArgs = {
  options: IGetById;
};


export type QueryGetTicketBackAndForthByIdArgs = {
  options: IGetById;
};


export type QueryGetTicketBackAndForthByTiketIdArgs = {
  options: IGetById;
};


export type QueryGetTicketsByIdArgs = {
  options: IGetById;
};


export type QueryGetUserByIdArgs = {
  options: IGetById;
};

export type TicketBackAndForth = {
  __typename?: 'TicketBackAndForth';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy?: Maybe<User>;
  file: Scalars['String'];
  isActive: Scalars['Boolean'];
  isEdited: Scalars['Boolean'];
  isLastReopened: Scalars['Boolean'];
  isLastResolved: Scalars['Boolean'];
  isNexonCompany: Scalars['Boolean'];
  isNextOnCustomer: Scalars['Boolean'];
  isNextOnMiddleMan: Scalars['Boolean'];
  isRunningOnCustomer: Scalars['Boolean'];
  isRunningOnMiddleMan: Scalars['Boolean'];
  isRunnningOnCompany: Scalars['Boolean'];
  questionReply: Scalars['String'];
  ticket?: Maybe<Tickets>;
};

export type Tickets = {
  __typename?: 'Tickets';
  _id: Scalars['String'];
  assignedCompany?: Maybe<User>;
  assignedCustomer?: Maybe<User>;
  assignedMiddleMan?: Maybe<User>;
  canCompanyAccept: Scalars['Boolean'];
  closedReason?: Maybe<ClosedReason>;
  department?: Maybe<Department>;
  departmentQuestion?: Maybe<DepartmentQuestions>;
  description: Scalars['String'];
  file: Scalars['String'];
  isActive: Scalars['Boolean'];
  isResolved: Scalars['Boolean'];
  mobile: Scalars['String'];
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

export type AcceptTiketByMiddleManMutationVariables = Exact<{
  options: IGetById;
}>;


export type AcceptTiketByMiddleManMutation = { __typename?: 'Mutation', acceptTiketByMiddleMan: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type AcceptTiketByCompanyMutationVariables = Exact<{
  options: IGetById;
}>;


export type AcceptTiketByCompanyMutation = { __typename?: 'Mutation', acceptTiketByCompany: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type CreateOrUpdateDepartmentQuestionsMutationVariables = Exact<{
  options: ICreateDepartmentQuestions;
}>;


export type CreateOrUpdateDepartmentQuestionsMutation = { __typename?: 'Mutation', createOrUpdateDepartmentQuestions: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type AuthResolverMutationVariables = Exact<{
  options: IAuthInput;
}>;


export type AuthResolverMutation = { __typename?: 'Mutation', authResolver: { __typename?: 'IAuthResoverResponse', success: boolean, msg: string, jwt: string, email: string, name: string, user?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null } };

export type CreateOrUpdateUserMutationVariables = Exact<{
  options: ICreateUser;
}>;


export type CreateOrUpdateUserMutation = { __typename?: 'Mutation', createOrUpdateUser: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type DeleteUserMutationVariables = Exact<{
  options: IGetById;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type DeleteTicketsMutationVariables = Exact<{
  options: IGetById;
}>;


export type DeleteTicketsMutation = { __typename?: 'Mutation', deleteTickets: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type CreateOrUpdateTicketsMutationVariables = Exact<{
  options: ICreateTickets;
}>;


export type CreateOrUpdateTicketsMutation = { __typename?: 'Mutation', createOrUpdateTickets: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type ChangePasswordMutationVariables = Exact<{
  options: IChangePassword;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type AddTicketBackAndForthMutationVariables = Exact<{
  options: IAddTicketBackAndForth;
}>;


export type AddTicketBackAndForthMutation = { __typename?: 'Mutation', AddTicketBackAndForth: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type GetTickerClosedByIdMutationVariables = Exact<{
  options: IGetById;
}>;


export type GetTickerClosedByIdMutation = { __typename?: 'Mutation', getTickerClosedById: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type CreateOrUpdateEmailCredentialMutationVariables = Exact<{
  options: ICreateEmailCredential;
}>;


export type CreateOrUpdateEmailCredentialMutation = { __typename?: 'Mutation', createOrUpdateEmailCredential: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type DeleteEmailCredentialMutationVariables = Exact<{
  options: IGetById;
}>;


export type DeleteEmailCredentialMutation = { __typename?: 'Mutation', deleteEmailCredential: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type CreateOrUpdateEmailTemplateMutationVariables = Exact<{
  options: ICreateEmailTemplate;
}>;


export type CreateOrUpdateEmailTemplateMutation = { __typename?: 'Mutation', createOrUpdateEmailTemplate: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type DeleteEmailTemplateMutationVariables = Exact<{
  options: IGetById;
}>;


export type DeleteEmailTemplateMutation = { __typename?: 'Mutation', deleteEmailTemplate: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type TransferTicketMutationVariables = Exact<{
  options: ICreateTransfetHistory;
}>;


export type TransferTicketMutation = { __typename?: 'Mutation', transferTicket: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type CreateOrUpdateClosedReasonMutationVariables = Exact<{
  options: ICreateClosedReason;
}>;


export type CreateOrUpdateClosedReasonMutation = { __typename?: 'Mutation', createOrUpdateClosedReason: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type DeleteClosedReasonMutationVariables = Exact<{
  options: IGetById;
}>;


export type DeleteClosedReasonMutation = { __typename?: 'Mutation', deleteClosedReason: { __typename?: 'IStatusResponse', success: boolean, msg: string, data: string } };

export type GetDepartmentByIdQueryVariables = Exact<{
  options: IGetById;
}>;


export type GetDepartmentByIdQuery = { __typename?: 'Query', getDepartmentById: { __typename?: 'Department', _id: string, name: string, isActive: boolean } };

export type GetAllDepartmentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDepartmentQuery = { __typename?: 'Query', getAllDepartment: Array<{ __typename?: 'Department', _id: string, name: string, isActive: boolean }> };

export type GetAllAcceptAcceptByMiddleManQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAcceptAcceptByMiddleManQuery = { __typename?: 'Query', getAllAcceptAcceptByMiddleMan: Array<{ __typename?: 'Tickets', _id: string, question: string, description: string, file: string, isResolved: boolean, isActive: boolean, department?: { __typename?: 'Department', _id: string, isActive: boolean, name: string } | null, departmentQuestion?: { __typename?: 'DepartmentQuestions', _id: string, isActive: boolean, name: string } | null, assignedCustomer?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedMiddleMan?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedCompany?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null }> };

export type GetAllAcceptAcceptByCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAcceptAcceptByCompanyQuery = { __typename?: 'Query', getAllAcceptAcceptByCompany: Array<{ __typename?: 'Tickets', _id: string, question: string, description: string, file: string, isResolved: boolean, isActive: boolean, department?: { __typename?: 'Department', _id: string, isActive: boolean, name: string } | null, departmentQuestion?: { __typename?: 'DepartmentQuestions', _id: string, isActive: boolean, name: string } | null, assignedCustomer?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedMiddleMan?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedCompany?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null }> };

export type GetDepartmentQuestionsByIdQueryVariables = Exact<{
  options: IGetById;
}>;


export type GetDepartmentQuestionsByIdQuery = { __typename?: 'Query', getDepartmentQuestionsById: { __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean, department?: { __typename?: 'Department', _id: string, isActive: boolean, name: string } | null } };

export type GetAllDepartmentQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllDepartmentQuestionsQuery = { __typename?: 'Query', getAllDepartmentQuestions: Array<{ __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean, department?: { __typename?: 'Department', _id: string, isActive: boolean, name: string } | null }> };

export type GetAllUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserQuery = { __typename?: 'Query', getAllUser: Array<{ __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean, assignedDepartment?: { __typename?: 'Department', _id: string, name: string, isActive: boolean } | null }> };

export type GetUserByIdQueryVariables = Exact<{
  options: IGetById;
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean, assignedDepartment?: { __typename?: 'Department', _id: string, name: string, isActive: boolean } | null } };

export type GetAllTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTicketsQuery = { __typename?: 'Query', getAllTickets: Array<{ __typename?: 'Tickets', _id: string, question: string, description: string, file: string, isResolved: boolean, isActive: boolean, department?: { __typename?: 'Department', _id: string, name: string, isActive: boolean } | null, departmentQuestion?: { __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean } | null, assignedCustomer?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedMiddleMan?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedCompany?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null }> };

export type GetTicketsByIdQueryVariables = Exact<{
  options: IGetById;
}>;


export type GetTicketsByIdQuery = { __typename?: 'Query', getTicketsById: { __typename?: 'Tickets', _id: string, question: string, description: string, file: string, isResolved: boolean, mobile: string, isActive: boolean, department?: { __typename?: 'Department', _id: string, name: string, isActive: boolean } | null, departmentQuestion?: { __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean } | null, assignedCustomer?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedMiddleMan?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedCompany?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null } };

export type GetMyTicketByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTicketByUserQuery = { __typename?: 'Query', getMyTicketByUser: Array<{ __typename?: 'Tickets', _id: string, question: string, description: string, file: string, isResolved: boolean, isActive: boolean, department?: { __typename?: 'Department', _id: string, name: string, isActive: boolean } | null, departmentQuestion?: { __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean } | null, assignedCustomer?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedMiddleMan?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedCompany?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null }> };

export type GetMyTicketByMiddleManQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTicketByMiddleManQuery = { __typename?: 'Query', getMyTicketByMiddleMan: Array<{ __typename?: 'Tickets', _id: string, question: string, description: string, file: string, isResolved: boolean, isActive: boolean, department?: { __typename?: 'Department', _id: string, name: string, isActive: boolean } | null, departmentQuestion?: { __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean } | null, assignedCustomer?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedMiddleMan?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedCompany?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null }> };

export type GetMyTicketByCompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTicketByCompanyQuery = { __typename?: 'Query', getMyTicketByCompany: Array<{ __typename?: 'Tickets', _id: string, question: string, description: string, file: string, isResolved: boolean, isActive: boolean, department?: { __typename?: 'Department', _id: string, name: string, isActive: boolean } | null, departmentQuestion?: { __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean } | null, assignedCustomer?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedMiddleMan?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedCompany?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null }> };

export type GetTicketBackAndForthByTiketIdQueryVariables = Exact<{
  options: IGetById;
}>;


export type GetTicketBackAndForthByTiketIdQuery = { __typename?: 'Query', getTicketBackAndForthByTiketId: { __typename?: 'CutomTicketResponse', ticket: { __typename?: 'Tickets', _id: string, mobile: string, question: string, description: string, file: string, isResolved: boolean, isActive: boolean, department?: { __typename?: 'Department', _id: string, name: string, isActive: boolean } | null, departmentQuestion?: { __typename?: 'DepartmentQuestions', _id: string, name: string, isActive: boolean } | null, assignedCustomer?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedMiddleMan?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null, assignedCompany?: { __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean } | null }, ticketBackAndForth: Array<{ __typename?: 'TicketBackAndForth', _id: string, questionReply: string, file: string, isRunningOnCustomer: boolean, isRunningOnMiddleMan: boolean, isRunnningOnCompany: boolean, isNextOnCustomer: boolean, isNextOnMiddleMan: boolean, isNexonCompany: boolean, isLastResolved: boolean, isLastReopened: boolean, isEdited: boolean, isActive: boolean, createdAt: any, createdBy?: { __typename?: 'User', name: string, email: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean } | null }> } };

export type GetAllTransferUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTransferUserQuery = { __typename?: 'Query', getAllTransferUser: Array<{ __typename?: 'User', _id: string, name: string, email: string, hash: string, isCustomer: boolean, isMiddleMan: boolean, isCompany: boolean, isAdmin: boolean, isSuperAdmin: boolean, isActive: boolean, assignedDepartment?: { __typename?: 'Department', _id: string, isActive: boolean, name: string } | null }> };

export type GetTicketCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTicketCountQuery = { __typename?: 'Query', getTicketCount: { __typename?: 'ICountResponse', totalTiketCount: number, totalRunningCount: number, totalClosedCount: number } };

export type GetAllEmailCredentialsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmailCredentialsQuery = { __typename?: 'Query', getAllEmailCredentials: Array<{ __typename?: 'EmailCredential', _id: string, name: string, host: string, port: number, secure: boolean, authUser: string, authPassword: string, isActive: boolean }> };

export type GetEmailCredentialsByIdQueryVariables = Exact<{
  options: IGetById;
}>;


export type GetEmailCredentialsByIdQuery = { __typename?: 'Query', getEmailCredentialsById: { __typename?: 'EmailCredential', _id: string, name: string, host: string, port: number, secure: boolean, authUser: string, authPassword: string, isActive: boolean } };

export type GetEmailTemplateByIdQueryVariables = Exact<{
  options: IGetById;
}>;


export type GetEmailTemplateByIdQuery = { __typename?: 'Query', getEmailTemplateById: { __typename?: 'EmailTemplate', _id: string, name: string, html: string, customId: string, isActive: boolean, emailCredentials?: { __typename?: 'EmailCredential', _id: string, name: string, host: string, port: number, secure: boolean, authUser: string, authPassword: string, isActive: boolean } | null } };

export type GetAllEmailTemplateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllEmailTemplateQuery = { __typename?: 'Query', getAllEmailTemplate: Array<{ __typename?: 'EmailTemplate', _id: string, name: string, html: string, customId: string, isActive: boolean, emailCredentials?: { __typename?: 'EmailCredential', _id: string, name: string, host: string, port: number, secure: boolean, authUser: string, authPassword: string, isActive: boolean } | null }> };

export type GetAllClosedReasonQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllClosedReasonQuery = { __typename?: 'Query', getAllClosedReason: Array<{ __typename?: 'ClosedReason', _id: string, name: string, isActive: boolean }> };

export type GetClosedReasonByIdQueryVariables = Exact<{
  options: IGetById;
}>;


export type GetClosedReasonByIdQuery = { __typename?: 'Query', getClosedReasonById: { __typename?: 'ClosedReason', _id: string, name: string, isActive: boolean } };


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
export const AcceptTiketByMiddleManDocument = gql`
    mutation AcceptTiketByMiddleMan($options: IGetByID!) {
  acceptTiketByMiddleMan(options: $options) {
    success
    msg
    data
  }
}
    `;
export type AcceptTiketByMiddleManMutationFn = Apollo.MutationFunction<AcceptTiketByMiddleManMutation, AcceptTiketByMiddleManMutationVariables>;

/**
 * __useAcceptTiketByMiddleManMutation__
 *
 * To run a mutation, you first call `useAcceptTiketByMiddleManMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptTiketByMiddleManMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptTiketByMiddleManMutation, { data, loading, error }] = useAcceptTiketByMiddleManMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAcceptTiketByMiddleManMutation(baseOptions?: Apollo.MutationHookOptions<AcceptTiketByMiddleManMutation, AcceptTiketByMiddleManMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptTiketByMiddleManMutation, AcceptTiketByMiddleManMutationVariables>(AcceptTiketByMiddleManDocument, options);
      }
export type AcceptTiketByMiddleManMutationHookResult = ReturnType<typeof useAcceptTiketByMiddleManMutation>;
export type AcceptTiketByMiddleManMutationResult = Apollo.MutationResult<AcceptTiketByMiddleManMutation>;
export type AcceptTiketByMiddleManMutationOptions = Apollo.BaseMutationOptions<AcceptTiketByMiddleManMutation, AcceptTiketByMiddleManMutationVariables>;
export const AcceptTiketByCompanyDocument = gql`
    mutation AcceptTiketByCompany($options: IGetByID!) {
  acceptTiketByCompany(options: $options) {
    success
    msg
    data
  }
}
    `;
export type AcceptTiketByCompanyMutationFn = Apollo.MutationFunction<AcceptTiketByCompanyMutation, AcceptTiketByCompanyMutationVariables>;

/**
 * __useAcceptTiketByCompanyMutation__
 *
 * To run a mutation, you first call `useAcceptTiketByCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptTiketByCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptTiketByCompanyMutation, { data, loading, error }] = useAcceptTiketByCompanyMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAcceptTiketByCompanyMutation(baseOptions?: Apollo.MutationHookOptions<AcceptTiketByCompanyMutation, AcceptTiketByCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptTiketByCompanyMutation, AcceptTiketByCompanyMutationVariables>(AcceptTiketByCompanyDocument, options);
      }
export type AcceptTiketByCompanyMutationHookResult = ReturnType<typeof useAcceptTiketByCompanyMutation>;
export type AcceptTiketByCompanyMutationResult = Apollo.MutationResult<AcceptTiketByCompanyMutation>;
export type AcceptTiketByCompanyMutationOptions = Apollo.BaseMutationOptions<AcceptTiketByCompanyMutation, AcceptTiketByCompanyMutationVariables>;
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
export const CreateOrUpdateUserDocument = gql`
    mutation CreateOrUpdateUser($options: ICreateUser!) {
  createOrUpdateUser(options: $options) {
    success
    msg
    data
  }
}
    `;
export type CreateOrUpdateUserMutationFn = Apollo.MutationFunction<CreateOrUpdateUserMutation, CreateOrUpdateUserMutationVariables>;

/**
 * __useCreateOrUpdateUserMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateUserMutation, { data, loading, error }] = useCreateOrUpdateUserMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOrUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateUserMutation, CreateOrUpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateUserMutation, CreateOrUpdateUserMutationVariables>(CreateOrUpdateUserDocument, options);
      }
export type CreateOrUpdateUserMutationHookResult = ReturnType<typeof useCreateOrUpdateUserMutation>;
export type CreateOrUpdateUserMutationResult = Apollo.MutationResult<CreateOrUpdateUserMutation>;
export type CreateOrUpdateUserMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateUserMutation, CreateOrUpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($options: IGetByID!) {
  deleteUser(options: $options) {
    success
    msg
    data
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const DeleteTicketsDocument = gql`
    mutation DeleteTickets($options: IGetByID!) {
  deleteTickets(options: $options) {
    success
    msg
    data
  }
}
    `;
export type DeleteTicketsMutationFn = Apollo.MutationFunction<DeleteTicketsMutation, DeleteTicketsMutationVariables>;

/**
 * __useDeleteTicketsMutation__
 *
 * To run a mutation, you first call `useDeleteTicketsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTicketsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTicketsMutation, { data, loading, error }] = useDeleteTicketsMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useDeleteTicketsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTicketsMutation, DeleteTicketsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTicketsMutation, DeleteTicketsMutationVariables>(DeleteTicketsDocument, options);
      }
export type DeleteTicketsMutationHookResult = ReturnType<typeof useDeleteTicketsMutation>;
export type DeleteTicketsMutationResult = Apollo.MutationResult<DeleteTicketsMutation>;
export type DeleteTicketsMutationOptions = Apollo.BaseMutationOptions<DeleteTicketsMutation, DeleteTicketsMutationVariables>;
export const CreateOrUpdateTicketsDocument = gql`
    mutation CreateOrUpdateTickets($options: ICreateTickets!) {
  createOrUpdateTickets(options: $options) {
    success
    msg
    data
  }
}
    `;
export type CreateOrUpdateTicketsMutationFn = Apollo.MutationFunction<CreateOrUpdateTicketsMutation, CreateOrUpdateTicketsMutationVariables>;

/**
 * __useCreateOrUpdateTicketsMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateTicketsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateTicketsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateTicketsMutation, { data, loading, error }] = useCreateOrUpdateTicketsMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOrUpdateTicketsMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateTicketsMutation, CreateOrUpdateTicketsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateTicketsMutation, CreateOrUpdateTicketsMutationVariables>(CreateOrUpdateTicketsDocument, options);
      }
export type CreateOrUpdateTicketsMutationHookResult = ReturnType<typeof useCreateOrUpdateTicketsMutation>;
export type CreateOrUpdateTicketsMutationResult = Apollo.MutationResult<CreateOrUpdateTicketsMutation>;
export type CreateOrUpdateTicketsMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateTicketsMutation, CreateOrUpdateTicketsMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($options: IChangePassword!) {
  changePassword(options: $options) {
    success
    msg
    data
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const AddTicketBackAndForthDocument = gql`
    mutation AddTicketBackAndForth($options: IAddTicketBackAndForth!) {
  AddTicketBackAndForth(options: $options) {
    success
    msg
    data
  }
}
    `;
export type AddTicketBackAndForthMutationFn = Apollo.MutationFunction<AddTicketBackAndForthMutation, AddTicketBackAndForthMutationVariables>;

/**
 * __useAddTicketBackAndForthMutation__
 *
 * To run a mutation, you first call `useAddTicketBackAndForthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTicketBackAndForthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTicketBackAndForthMutation, { data, loading, error }] = useAddTicketBackAndForthMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAddTicketBackAndForthMutation(baseOptions?: Apollo.MutationHookOptions<AddTicketBackAndForthMutation, AddTicketBackAndForthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTicketBackAndForthMutation, AddTicketBackAndForthMutationVariables>(AddTicketBackAndForthDocument, options);
      }
export type AddTicketBackAndForthMutationHookResult = ReturnType<typeof useAddTicketBackAndForthMutation>;
export type AddTicketBackAndForthMutationResult = Apollo.MutationResult<AddTicketBackAndForthMutation>;
export type AddTicketBackAndForthMutationOptions = Apollo.BaseMutationOptions<AddTicketBackAndForthMutation, AddTicketBackAndForthMutationVariables>;
export const GetTickerClosedByIdDocument = gql`
    mutation GetTickerClosedById($options: IGetByID!) {
  getTickerClosedById(options: $options) {
    success
    msg
    data
  }
}
    `;
export type GetTickerClosedByIdMutationFn = Apollo.MutationFunction<GetTickerClosedByIdMutation, GetTickerClosedByIdMutationVariables>;

/**
 * __useGetTickerClosedByIdMutation__
 *
 * To run a mutation, you first call `useGetTickerClosedByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetTickerClosedByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getTickerClosedByIdMutation, { data, loading, error }] = useGetTickerClosedByIdMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetTickerClosedByIdMutation(baseOptions?: Apollo.MutationHookOptions<GetTickerClosedByIdMutation, GetTickerClosedByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetTickerClosedByIdMutation, GetTickerClosedByIdMutationVariables>(GetTickerClosedByIdDocument, options);
      }
export type GetTickerClosedByIdMutationHookResult = ReturnType<typeof useGetTickerClosedByIdMutation>;
export type GetTickerClosedByIdMutationResult = Apollo.MutationResult<GetTickerClosedByIdMutation>;
export type GetTickerClosedByIdMutationOptions = Apollo.BaseMutationOptions<GetTickerClosedByIdMutation, GetTickerClosedByIdMutationVariables>;
export const CreateOrUpdateEmailCredentialDocument = gql`
    mutation CreateOrUpdateEmailCredential($options: ICreateEmailCredential!) {
  createOrUpdateEmailCredential(options: $options) {
    success
    msg
    data
  }
}
    `;
export type CreateOrUpdateEmailCredentialMutationFn = Apollo.MutationFunction<CreateOrUpdateEmailCredentialMutation, CreateOrUpdateEmailCredentialMutationVariables>;

/**
 * __useCreateOrUpdateEmailCredentialMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateEmailCredentialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateEmailCredentialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateEmailCredentialMutation, { data, loading, error }] = useCreateOrUpdateEmailCredentialMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOrUpdateEmailCredentialMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateEmailCredentialMutation, CreateOrUpdateEmailCredentialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateEmailCredentialMutation, CreateOrUpdateEmailCredentialMutationVariables>(CreateOrUpdateEmailCredentialDocument, options);
      }
export type CreateOrUpdateEmailCredentialMutationHookResult = ReturnType<typeof useCreateOrUpdateEmailCredentialMutation>;
export type CreateOrUpdateEmailCredentialMutationResult = Apollo.MutationResult<CreateOrUpdateEmailCredentialMutation>;
export type CreateOrUpdateEmailCredentialMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateEmailCredentialMutation, CreateOrUpdateEmailCredentialMutationVariables>;
export const DeleteEmailCredentialDocument = gql`
    mutation DeleteEmailCredential($options: IGetByID!) {
  deleteEmailCredential(options: $options) {
    success
    msg
    data
  }
}
    `;
export type DeleteEmailCredentialMutationFn = Apollo.MutationFunction<DeleteEmailCredentialMutation, DeleteEmailCredentialMutationVariables>;

/**
 * __useDeleteEmailCredentialMutation__
 *
 * To run a mutation, you first call `useDeleteEmailCredentialMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmailCredentialMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmailCredentialMutation, { data, loading, error }] = useDeleteEmailCredentialMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useDeleteEmailCredentialMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEmailCredentialMutation, DeleteEmailCredentialMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEmailCredentialMutation, DeleteEmailCredentialMutationVariables>(DeleteEmailCredentialDocument, options);
      }
export type DeleteEmailCredentialMutationHookResult = ReturnType<typeof useDeleteEmailCredentialMutation>;
export type DeleteEmailCredentialMutationResult = Apollo.MutationResult<DeleteEmailCredentialMutation>;
export type DeleteEmailCredentialMutationOptions = Apollo.BaseMutationOptions<DeleteEmailCredentialMutation, DeleteEmailCredentialMutationVariables>;
export const CreateOrUpdateEmailTemplateDocument = gql`
    mutation CreateOrUpdateEmailTemplate($options: ICreateEmailTemplate!) {
  createOrUpdateEmailTemplate(options: $options) {
    success
    msg
    data
  }
}
    `;
export type CreateOrUpdateEmailTemplateMutationFn = Apollo.MutationFunction<CreateOrUpdateEmailTemplateMutation, CreateOrUpdateEmailTemplateMutationVariables>;

/**
 * __useCreateOrUpdateEmailTemplateMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateEmailTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateEmailTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateEmailTemplateMutation, { data, loading, error }] = useCreateOrUpdateEmailTemplateMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOrUpdateEmailTemplateMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateEmailTemplateMutation, CreateOrUpdateEmailTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateEmailTemplateMutation, CreateOrUpdateEmailTemplateMutationVariables>(CreateOrUpdateEmailTemplateDocument, options);
      }
export type CreateOrUpdateEmailTemplateMutationHookResult = ReturnType<typeof useCreateOrUpdateEmailTemplateMutation>;
export type CreateOrUpdateEmailTemplateMutationResult = Apollo.MutationResult<CreateOrUpdateEmailTemplateMutation>;
export type CreateOrUpdateEmailTemplateMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateEmailTemplateMutation, CreateOrUpdateEmailTemplateMutationVariables>;
export const DeleteEmailTemplateDocument = gql`
    mutation DeleteEmailTemplate($options: IGetByID!) {
  deleteEmailTemplate(options: $options) {
    success
    msg
    data
  }
}
    `;
export type DeleteEmailTemplateMutationFn = Apollo.MutationFunction<DeleteEmailTemplateMutation, DeleteEmailTemplateMutationVariables>;

/**
 * __useDeleteEmailTemplateMutation__
 *
 * To run a mutation, you first call `useDeleteEmailTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmailTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmailTemplateMutation, { data, loading, error }] = useDeleteEmailTemplateMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useDeleteEmailTemplateMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEmailTemplateMutation, DeleteEmailTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEmailTemplateMutation, DeleteEmailTemplateMutationVariables>(DeleteEmailTemplateDocument, options);
      }
export type DeleteEmailTemplateMutationHookResult = ReturnType<typeof useDeleteEmailTemplateMutation>;
export type DeleteEmailTemplateMutationResult = Apollo.MutationResult<DeleteEmailTemplateMutation>;
export type DeleteEmailTemplateMutationOptions = Apollo.BaseMutationOptions<DeleteEmailTemplateMutation, DeleteEmailTemplateMutationVariables>;
export const TransferTicketDocument = gql`
    mutation TransferTicket($options: ICreateTransfetHistory!) {
  transferTicket(options: $options) {
    success
    msg
    data
  }
}
    `;
export type TransferTicketMutationFn = Apollo.MutationFunction<TransferTicketMutation, TransferTicketMutationVariables>;

/**
 * __useTransferTicketMutation__
 *
 * To run a mutation, you first call `useTransferTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferTicketMutation, { data, loading, error }] = useTransferTicketMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useTransferTicketMutation(baseOptions?: Apollo.MutationHookOptions<TransferTicketMutation, TransferTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TransferTicketMutation, TransferTicketMutationVariables>(TransferTicketDocument, options);
      }
export type TransferTicketMutationHookResult = ReturnType<typeof useTransferTicketMutation>;
export type TransferTicketMutationResult = Apollo.MutationResult<TransferTicketMutation>;
export type TransferTicketMutationOptions = Apollo.BaseMutationOptions<TransferTicketMutation, TransferTicketMutationVariables>;
export const CreateOrUpdateClosedReasonDocument = gql`
    mutation CreateOrUpdateClosedReason($options: ICreateClosedReason!) {
  createOrUpdateClosedReason(options: $options) {
    success
    msg
    data
  }
}
    `;
export type CreateOrUpdateClosedReasonMutationFn = Apollo.MutationFunction<CreateOrUpdateClosedReasonMutation, CreateOrUpdateClosedReasonMutationVariables>;

/**
 * __useCreateOrUpdateClosedReasonMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateClosedReasonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateClosedReasonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateClosedReasonMutation, { data, loading, error }] = useCreateOrUpdateClosedReasonMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useCreateOrUpdateClosedReasonMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateClosedReasonMutation, CreateOrUpdateClosedReasonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrUpdateClosedReasonMutation, CreateOrUpdateClosedReasonMutationVariables>(CreateOrUpdateClosedReasonDocument, options);
      }
export type CreateOrUpdateClosedReasonMutationHookResult = ReturnType<typeof useCreateOrUpdateClosedReasonMutation>;
export type CreateOrUpdateClosedReasonMutationResult = Apollo.MutationResult<CreateOrUpdateClosedReasonMutation>;
export type CreateOrUpdateClosedReasonMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateClosedReasonMutation, CreateOrUpdateClosedReasonMutationVariables>;
export const DeleteClosedReasonDocument = gql`
    mutation DeleteClosedReason($options: IGetByID!) {
  deleteClosedReason(options: $options) {
    success
    msg
    data
  }
}
    `;
export type DeleteClosedReasonMutationFn = Apollo.MutationFunction<DeleteClosedReasonMutation, DeleteClosedReasonMutationVariables>;

/**
 * __useDeleteClosedReasonMutation__
 *
 * To run a mutation, you first call `useDeleteClosedReasonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClosedReasonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClosedReasonMutation, { data, loading, error }] = useDeleteClosedReasonMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useDeleteClosedReasonMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClosedReasonMutation, DeleteClosedReasonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClosedReasonMutation, DeleteClosedReasonMutationVariables>(DeleteClosedReasonDocument, options);
      }
export type DeleteClosedReasonMutationHookResult = ReturnType<typeof useDeleteClosedReasonMutation>;
export type DeleteClosedReasonMutationResult = Apollo.MutationResult<DeleteClosedReasonMutation>;
export type DeleteClosedReasonMutationOptions = Apollo.BaseMutationOptions<DeleteClosedReasonMutation, DeleteClosedReasonMutationVariables>;
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
export const GetAllAcceptAcceptByMiddleManDocument = gql`
    query GetAllAcceptAcceptByMiddleMan {
  getAllAcceptAcceptByMiddleMan {
    _id
    department {
      _id
      isActive
      name
    }
    departmentQuestion {
      _id
      isActive
      name
    }
    question
    description
    file
    isResolved
    assignedCustomer {
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
    assignedMiddleMan {
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
    assignedCompany {
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
    isActive
  }
}
    `;

/**
 * __useGetAllAcceptAcceptByMiddleManQuery__
 *
 * To run a query within a React component, call `useGetAllAcceptAcceptByMiddleManQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAcceptAcceptByMiddleManQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAcceptAcceptByMiddleManQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAcceptAcceptByMiddleManQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAcceptAcceptByMiddleManQuery, GetAllAcceptAcceptByMiddleManQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAcceptAcceptByMiddleManQuery, GetAllAcceptAcceptByMiddleManQueryVariables>(GetAllAcceptAcceptByMiddleManDocument, options);
      }
export function useGetAllAcceptAcceptByMiddleManLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAcceptAcceptByMiddleManQuery, GetAllAcceptAcceptByMiddleManQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAcceptAcceptByMiddleManQuery, GetAllAcceptAcceptByMiddleManQueryVariables>(GetAllAcceptAcceptByMiddleManDocument, options);
        }
export type GetAllAcceptAcceptByMiddleManQueryHookResult = ReturnType<typeof useGetAllAcceptAcceptByMiddleManQuery>;
export type GetAllAcceptAcceptByMiddleManLazyQueryHookResult = ReturnType<typeof useGetAllAcceptAcceptByMiddleManLazyQuery>;
export type GetAllAcceptAcceptByMiddleManQueryResult = Apollo.QueryResult<GetAllAcceptAcceptByMiddleManQuery, GetAllAcceptAcceptByMiddleManQueryVariables>;
export const GetAllAcceptAcceptByCompanyDocument = gql`
    query GetAllAcceptAcceptByCompany {
  getAllAcceptAcceptByCompany {
    _id
    department {
      _id
      isActive
      name
    }
    departmentQuestion {
      _id
      isActive
      name
    }
    question
    description
    file
    isResolved
    assignedCustomer {
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
    assignedMiddleMan {
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
    assignedCompany {
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
    isActive
  }
}
    `;

/**
 * __useGetAllAcceptAcceptByCompanyQuery__
 *
 * To run a query within a React component, call `useGetAllAcceptAcceptByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAcceptAcceptByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAcceptAcceptByCompanyQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAcceptAcceptByCompanyQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAcceptAcceptByCompanyQuery, GetAllAcceptAcceptByCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAcceptAcceptByCompanyQuery, GetAllAcceptAcceptByCompanyQueryVariables>(GetAllAcceptAcceptByCompanyDocument, options);
      }
export function useGetAllAcceptAcceptByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAcceptAcceptByCompanyQuery, GetAllAcceptAcceptByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAcceptAcceptByCompanyQuery, GetAllAcceptAcceptByCompanyQueryVariables>(GetAllAcceptAcceptByCompanyDocument, options);
        }
export type GetAllAcceptAcceptByCompanyQueryHookResult = ReturnType<typeof useGetAllAcceptAcceptByCompanyQuery>;
export type GetAllAcceptAcceptByCompanyLazyQueryHookResult = ReturnType<typeof useGetAllAcceptAcceptByCompanyLazyQuery>;
export type GetAllAcceptAcceptByCompanyQueryResult = Apollo.QueryResult<GetAllAcceptAcceptByCompanyQuery, GetAllAcceptAcceptByCompanyQueryVariables>;
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
export const GetAllUserDocument = gql`
    query GetAllUser {
  getAllUser {
    _id
    name
    email
    hash
    isCustomer
    isMiddleMan
    isCompany
    assignedDepartment {
      _id
      name
      isActive
    }
    isAdmin
    isSuperAdmin
    isActive
  }
}
    `;

/**
 * __useGetAllUserQuery__
 *
 * To run a query within a React component, call `useGetAllUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserQuery, GetAllUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUserQuery, GetAllUserQueryVariables>(GetAllUserDocument, options);
      }
export function useGetAllUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserQuery, GetAllUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUserQuery, GetAllUserQueryVariables>(GetAllUserDocument, options);
        }
export type GetAllUserQueryHookResult = ReturnType<typeof useGetAllUserQuery>;
export type GetAllUserLazyQueryHookResult = ReturnType<typeof useGetAllUserLazyQuery>;
export type GetAllUserQueryResult = Apollo.QueryResult<GetAllUserQuery, GetAllUserQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($options: IGetByID!) {
  getUserById(options: $options) {
    _id
    name
    email
    hash
    isCustomer
    isMiddleMan
    isCompany
    assignedDepartment {
      _id
      name
      isActive
    }
    isAdmin
    isSuperAdmin
    isActive
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetAllTicketsDocument = gql`
    query GetAllTickets {
  getAllTickets {
    _id
    department {
      _id
      name
      isActive
    }
    departmentQuestion {
      _id
      name
      isActive
    }
    question
    description
    file
    isResolved
    assignedCustomer {
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
    assignedMiddleMan {
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
    assignedCompany {
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
    isActive
  }
}
    `;

/**
 * __useGetAllTicketsQuery__
 *
 * To run a query within a React component, call `useGetAllTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTicketsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTicketsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTicketsQuery, GetAllTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTicketsQuery, GetAllTicketsQueryVariables>(GetAllTicketsDocument, options);
      }
export function useGetAllTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTicketsQuery, GetAllTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTicketsQuery, GetAllTicketsQueryVariables>(GetAllTicketsDocument, options);
        }
export type GetAllTicketsQueryHookResult = ReturnType<typeof useGetAllTicketsQuery>;
export type GetAllTicketsLazyQueryHookResult = ReturnType<typeof useGetAllTicketsLazyQuery>;
export type GetAllTicketsQueryResult = Apollo.QueryResult<GetAllTicketsQuery, GetAllTicketsQueryVariables>;
export const GetTicketsByIdDocument = gql`
    query GetTicketsById($options: IGetByID!) {
  getTicketsById(options: $options) {
    _id
    department {
      _id
      name
      isActive
    }
    departmentQuestion {
      _id
      name
      isActive
    }
    question
    description
    file
    isResolved
    assignedCustomer {
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
    assignedMiddleMan {
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
    assignedCompany {
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
    mobile
    isActive
  }
}
    `;

/**
 * __useGetTicketsByIdQuery__
 *
 * To run a query within a React component, call `useGetTicketsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketsByIdQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetTicketsByIdQuery(baseOptions: Apollo.QueryHookOptions<GetTicketsByIdQuery, GetTicketsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketsByIdQuery, GetTicketsByIdQueryVariables>(GetTicketsByIdDocument, options);
      }
export function useGetTicketsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketsByIdQuery, GetTicketsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketsByIdQuery, GetTicketsByIdQueryVariables>(GetTicketsByIdDocument, options);
        }
export type GetTicketsByIdQueryHookResult = ReturnType<typeof useGetTicketsByIdQuery>;
export type GetTicketsByIdLazyQueryHookResult = ReturnType<typeof useGetTicketsByIdLazyQuery>;
export type GetTicketsByIdQueryResult = Apollo.QueryResult<GetTicketsByIdQuery, GetTicketsByIdQueryVariables>;
export const GetMyTicketByUserDocument = gql`
    query GetMyTicketByUser {
  getMyTicketByUser {
    _id
    department {
      _id
      name
      isActive
    }
    departmentQuestion {
      _id
      name
      isActive
    }
    question
    description
    file
    isResolved
    assignedCustomer {
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
    assignedMiddleMan {
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
    assignedCompany {
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
    isActive
  }
}
    `;

/**
 * __useGetMyTicketByUserQuery__
 *
 * To run a query within a React component, call `useGetMyTicketByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTicketByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTicketByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTicketByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTicketByUserQuery, GetMyTicketByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTicketByUserQuery, GetMyTicketByUserQueryVariables>(GetMyTicketByUserDocument, options);
      }
export function useGetMyTicketByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTicketByUserQuery, GetMyTicketByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTicketByUserQuery, GetMyTicketByUserQueryVariables>(GetMyTicketByUserDocument, options);
        }
export type GetMyTicketByUserQueryHookResult = ReturnType<typeof useGetMyTicketByUserQuery>;
export type GetMyTicketByUserLazyQueryHookResult = ReturnType<typeof useGetMyTicketByUserLazyQuery>;
export type GetMyTicketByUserQueryResult = Apollo.QueryResult<GetMyTicketByUserQuery, GetMyTicketByUserQueryVariables>;
export const GetMyTicketByMiddleManDocument = gql`
    query GetMyTicketByMiddleMan {
  getMyTicketByMiddleMan {
    _id
    department {
      _id
      name
      isActive
    }
    departmentQuestion {
      _id
      name
      isActive
    }
    question
    description
    file
    isResolved
    assignedCustomer {
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
    assignedMiddleMan {
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
    assignedCompany {
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
    isActive
  }
}
    `;

/**
 * __useGetMyTicketByMiddleManQuery__
 *
 * To run a query within a React component, call `useGetMyTicketByMiddleManQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTicketByMiddleManQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTicketByMiddleManQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTicketByMiddleManQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTicketByMiddleManQuery, GetMyTicketByMiddleManQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTicketByMiddleManQuery, GetMyTicketByMiddleManQueryVariables>(GetMyTicketByMiddleManDocument, options);
      }
export function useGetMyTicketByMiddleManLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTicketByMiddleManQuery, GetMyTicketByMiddleManQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTicketByMiddleManQuery, GetMyTicketByMiddleManQueryVariables>(GetMyTicketByMiddleManDocument, options);
        }
export type GetMyTicketByMiddleManQueryHookResult = ReturnType<typeof useGetMyTicketByMiddleManQuery>;
export type GetMyTicketByMiddleManLazyQueryHookResult = ReturnType<typeof useGetMyTicketByMiddleManLazyQuery>;
export type GetMyTicketByMiddleManQueryResult = Apollo.QueryResult<GetMyTicketByMiddleManQuery, GetMyTicketByMiddleManQueryVariables>;
export const GetMyTicketByCompanyDocument = gql`
    query GetMyTicketByCompany {
  getMyTicketByCompany {
    _id
    department {
      _id
      name
      isActive
    }
    departmentQuestion {
      _id
      name
      isActive
    }
    question
    description
    file
    isResolved
    assignedCustomer {
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
    assignedMiddleMan {
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
    assignedCompany {
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
    isActive
  }
}
    `;

/**
 * __useGetMyTicketByCompanyQuery__
 *
 * To run a query within a React component, call `useGetMyTicketByCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTicketByCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTicketByCompanyQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTicketByCompanyQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTicketByCompanyQuery, GetMyTicketByCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTicketByCompanyQuery, GetMyTicketByCompanyQueryVariables>(GetMyTicketByCompanyDocument, options);
      }
export function useGetMyTicketByCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTicketByCompanyQuery, GetMyTicketByCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTicketByCompanyQuery, GetMyTicketByCompanyQueryVariables>(GetMyTicketByCompanyDocument, options);
        }
export type GetMyTicketByCompanyQueryHookResult = ReturnType<typeof useGetMyTicketByCompanyQuery>;
export type GetMyTicketByCompanyLazyQueryHookResult = ReturnType<typeof useGetMyTicketByCompanyLazyQuery>;
export type GetMyTicketByCompanyQueryResult = Apollo.QueryResult<GetMyTicketByCompanyQuery, GetMyTicketByCompanyQueryVariables>;
export const GetTicketBackAndForthByTiketIdDocument = gql`
    query GetTicketBackAndForthByTiketId($options: IGetByID!) {
  getTicketBackAndForthByTiketId(options: $options) {
    ticket {
      _id
      mobile
      department {
        _id
        name
        isActive
      }
      departmentQuestion {
        _id
        name
        isActive
      }
      question
      description
      file
      isResolved
      assignedCustomer {
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
      assignedMiddleMan {
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
      assignedCompany {
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
      isActive
    }
    ticketBackAndForth {
      _id
      questionReply
      file
      isRunningOnCustomer
      isRunningOnMiddleMan
      isRunnningOnCompany
      isNextOnCustomer
      isNextOnMiddleMan
      isNexonCompany
      isLastResolved
      isLastReopened
      isEdited
      isActive
      createdAt
      createdBy {
        name
        email
        isCustomer
        isMiddleMan
        isCompany
      }
    }
  }
}
    `;

/**
 * __useGetTicketBackAndForthByTiketIdQuery__
 *
 * To run a query within a React component, call `useGetTicketBackAndForthByTiketIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketBackAndForthByTiketIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketBackAndForthByTiketIdQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetTicketBackAndForthByTiketIdQuery(baseOptions: Apollo.QueryHookOptions<GetTicketBackAndForthByTiketIdQuery, GetTicketBackAndForthByTiketIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketBackAndForthByTiketIdQuery, GetTicketBackAndForthByTiketIdQueryVariables>(GetTicketBackAndForthByTiketIdDocument, options);
      }
export function useGetTicketBackAndForthByTiketIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketBackAndForthByTiketIdQuery, GetTicketBackAndForthByTiketIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketBackAndForthByTiketIdQuery, GetTicketBackAndForthByTiketIdQueryVariables>(GetTicketBackAndForthByTiketIdDocument, options);
        }
export type GetTicketBackAndForthByTiketIdQueryHookResult = ReturnType<typeof useGetTicketBackAndForthByTiketIdQuery>;
export type GetTicketBackAndForthByTiketIdLazyQueryHookResult = ReturnType<typeof useGetTicketBackAndForthByTiketIdLazyQuery>;
export type GetTicketBackAndForthByTiketIdQueryResult = Apollo.QueryResult<GetTicketBackAndForthByTiketIdQuery, GetTicketBackAndForthByTiketIdQueryVariables>;
export const GetAllTransferUserDocument = gql`
    query GetAllTransferUser {
  getAllTransferUser {
    _id
    name
    email
    hash
    isCustomer
    isMiddleMan
    isCompany
    assignedDepartment {
      _id
      isActive
      name
    }
    isAdmin
    isSuperAdmin
    isActive
  }
}
    `;

/**
 * __useGetAllTransferUserQuery__
 *
 * To run a query within a React component, call `useGetAllTransferUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTransferUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTransferUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTransferUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTransferUserQuery, GetAllTransferUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTransferUserQuery, GetAllTransferUserQueryVariables>(GetAllTransferUserDocument, options);
      }
export function useGetAllTransferUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTransferUserQuery, GetAllTransferUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTransferUserQuery, GetAllTransferUserQueryVariables>(GetAllTransferUserDocument, options);
        }
export type GetAllTransferUserQueryHookResult = ReturnType<typeof useGetAllTransferUserQuery>;
export type GetAllTransferUserLazyQueryHookResult = ReturnType<typeof useGetAllTransferUserLazyQuery>;
export type GetAllTransferUserQueryResult = Apollo.QueryResult<GetAllTransferUserQuery, GetAllTransferUserQueryVariables>;
export const GetTicketCountDocument = gql`
    query GetTicketCount {
  getTicketCount {
    totalTiketCount
    totalRunningCount
    totalClosedCount
  }
}
    `;

/**
 * __useGetTicketCountQuery__
 *
 * To run a query within a React component, call `useGetTicketCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTicketCountQuery(baseOptions?: Apollo.QueryHookOptions<GetTicketCountQuery, GetTicketCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketCountQuery, GetTicketCountQueryVariables>(GetTicketCountDocument, options);
      }
export function useGetTicketCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketCountQuery, GetTicketCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketCountQuery, GetTicketCountQueryVariables>(GetTicketCountDocument, options);
        }
export type GetTicketCountQueryHookResult = ReturnType<typeof useGetTicketCountQuery>;
export type GetTicketCountLazyQueryHookResult = ReturnType<typeof useGetTicketCountLazyQuery>;
export type GetTicketCountQueryResult = Apollo.QueryResult<GetTicketCountQuery, GetTicketCountQueryVariables>;
export const GetAllEmailCredentialsDocument = gql`
    query GetAllEmailCredentials {
  getAllEmailCredentials {
    _id
    name
    host
    port
    secure
    authUser
    authPassword
    isActive
  }
}
    `;

/**
 * __useGetAllEmailCredentialsQuery__
 *
 * To run a query within a React component, call `useGetAllEmailCredentialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEmailCredentialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEmailCredentialsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllEmailCredentialsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllEmailCredentialsQuery, GetAllEmailCredentialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllEmailCredentialsQuery, GetAllEmailCredentialsQueryVariables>(GetAllEmailCredentialsDocument, options);
      }
export function useGetAllEmailCredentialsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllEmailCredentialsQuery, GetAllEmailCredentialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllEmailCredentialsQuery, GetAllEmailCredentialsQueryVariables>(GetAllEmailCredentialsDocument, options);
        }
export type GetAllEmailCredentialsQueryHookResult = ReturnType<typeof useGetAllEmailCredentialsQuery>;
export type GetAllEmailCredentialsLazyQueryHookResult = ReturnType<typeof useGetAllEmailCredentialsLazyQuery>;
export type GetAllEmailCredentialsQueryResult = Apollo.QueryResult<GetAllEmailCredentialsQuery, GetAllEmailCredentialsQueryVariables>;
export const GetEmailCredentialsByIdDocument = gql`
    query GetEmailCredentialsById($options: IGetByID!) {
  getEmailCredentialsById(options: $options) {
    _id
    name
    host
    port
    secure
    authUser
    authPassword
    isActive
  }
}
    `;

/**
 * __useGetEmailCredentialsByIdQuery__
 *
 * To run a query within a React component, call `useGetEmailCredentialsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmailCredentialsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmailCredentialsByIdQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetEmailCredentialsByIdQuery(baseOptions: Apollo.QueryHookOptions<GetEmailCredentialsByIdQuery, GetEmailCredentialsByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmailCredentialsByIdQuery, GetEmailCredentialsByIdQueryVariables>(GetEmailCredentialsByIdDocument, options);
      }
export function useGetEmailCredentialsByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmailCredentialsByIdQuery, GetEmailCredentialsByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmailCredentialsByIdQuery, GetEmailCredentialsByIdQueryVariables>(GetEmailCredentialsByIdDocument, options);
        }
export type GetEmailCredentialsByIdQueryHookResult = ReturnType<typeof useGetEmailCredentialsByIdQuery>;
export type GetEmailCredentialsByIdLazyQueryHookResult = ReturnType<typeof useGetEmailCredentialsByIdLazyQuery>;
export type GetEmailCredentialsByIdQueryResult = Apollo.QueryResult<GetEmailCredentialsByIdQuery, GetEmailCredentialsByIdQueryVariables>;
export const GetEmailTemplateByIdDocument = gql`
    query GetEmailTemplateById($options: IGetByID!) {
  getEmailTemplateById(options: $options) {
    _id
    name
    html
    customId
    emailCredentials {
      _id
      name
      host
      port
      secure
      authUser
      authPassword
      isActive
    }
    isActive
  }
}
    `;

/**
 * __useGetEmailTemplateByIdQuery__
 *
 * To run a query within a React component, call `useGetEmailTemplateByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmailTemplateByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmailTemplateByIdQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetEmailTemplateByIdQuery(baseOptions: Apollo.QueryHookOptions<GetEmailTemplateByIdQuery, GetEmailTemplateByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmailTemplateByIdQuery, GetEmailTemplateByIdQueryVariables>(GetEmailTemplateByIdDocument, options);
      }
export function useGetEmailTemplateByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmailTemplateByIdQuery, GetEmailTemplateByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmailTemplateByIdQuery, GetEmailTemplateByIdQueryVariables>(GetEmailTemplateByIdDocument, options);
        }
export type GetEmailTemplateByIdQueryHookResult = ReturnType<typeof useGetEmailTemplateByIdQuery>;
export type GetEmailTemplateByIdLazyQueryHookResult = ReturnType<typeof useGetEmailTemplateByIdLazyQuery>;
export type GetEmailTemplateByIdQueryResult = Apollo.QueryResult<GetEmailTemplateByIdQuery, GetEmailTemplateByIdQueryVariables>;
export const GetAllEmailTemplateDocument = gql`
    query GetAllEmailTemplate {
  getAllEmailTemplate {
    _id
    name
    html
    customId
    emailCredentials {
      _id
      name
      host
      port
      secure
      authUser
      authPassword
      isActive
    }
    isActive
  }
}
    `;

/**
 * __useGetAllEmailTemplateQuery__
 *
 * To run a query within a React component, call `useGetAllEmailTemplateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEmailTemplateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEmailTemplateQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllEmailTemplateQuery(baseOptions?: Apollo.QueryHookOptions<GetAllEmailTemplateQuery, GetAllEmailTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllEmailTemplateQuery, GetAllEmailTemplateQueryVariables>(GetAllEmailTemplateDocument, options);
      }
export function useGetAllEmailTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllEmailTemplateQuery, GetAllEmailTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllEmailTemplateQuery, GetAllEmailTemplateQueryVariables>(GetAllEmailTemplateDocument, options);
        }
export type GetAllEmailTemplateQueryHookResult = ReturnType<typeof useGetAllEmailTemplateQuery>;
export type GetAllEmailTemplateLazyQueryHookResult = ReturnType<typeof useGetAllEmailTemplateLazyQuery>;
export type GetAllEmailTemplateQueryResult = Apollo.QueryResult<GetAllEmailTemplateQuery, GetAllEmailTemplateQueryVariables>;
export const GetAllClosedReasonDocument = gql`
    query GetAllClosedReason {
  getAllClosedReason {
    _id
    name
    isActive
  }
}
    `;

/**
 * __useGetAllClosedReasonQuery__
 *
 * To run a query within a React component, call `useGetAllClosedReasonQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllClosedReasonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllClosedReasonQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllClosedReasonQuery(baseOptions?: Apollo.QueryHookOptions<GetAllClosedReasonQuery, GetAllClosedReasonQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllClosedReasonQuery, GetAllClosedReasonQueryVariables>(GetAllClosedReasonDocument, options);
      }
export function useGetAllClosedReasonLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllClosedReasonQuery, GetAllClosedReasonQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllClosedReasonQuery, GetAllClosedReasonQueryVariables>(GetAllClosedReasonDocument, options);
        }
export type GetAllClosedReasonQueryHookResult = ReturnType<typeof useGetAllClosedReasonQuery>;
export type GetAllClosedReasonLazyQueryHookResult = ReturnType<typeof useGetAllClosedReasonLazyQuery>;
export type GetAllClosedReasonQueryResult = Apollo.QueryResult<GetAllClosedReasonQuery, GetAllClosedReasonQueryVariables>;
export const GetClosedReasonByIdDocument = gql`
    query GetClosedReasonById($options: IGetByID!) {
  getClosedReasonById(options: $options) {
    _id
    name
    isActive
  }
}
    `;

/**
 * __useGetClosedReasonByIdQuery__
 *
 * To run a query within a React component, call `useGetClosedReasonByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClosedReasonByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClosedReasonByIdQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetClosedReasonByIdQuery(baseOptions: Apollo.QueryHookOptions<GetClosedReasonByIdQuery, GetClosedReasonByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClosedReasonByIdQuery, GetClosedReasonByIdQueryVariables>(GetClosedReasonByIdDocument, options);
      }
export function useGetClosedReasonByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClosedReasonByIdQuery, GetClosedReasonByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClosedReasonByIdQuery, GetClosedReasonByIdQueryVariables>(GetClosedReasonByIdDocument, options);
        }
export type GetClosedReasonByIdQueryHookResult = ReturnType<typeof useGetClosedReasonByIdQuery>;
export type GetClosedReasonByIdLazyQueryHookResult = ReturnType<typeof useGetClosedReasonByIdLazyQuery>;
export type GetClosedReasonByIdQueryResult = Apollo.QueryResult<GetClosedReasonByIdQuery, GetClosedReasonByIdQueryVariables>;