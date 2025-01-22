const userTypeDef = `#graphql
    type User {
        _id: ID!
        username: String!
        name: String!
        password: String!
        avatar: String
        gender: String!
    }

    type Query {
        users: [User!]                       # array of users required
        authUser: User                       # return user if authentificated, if not - null    ---- so user is not reqired
        user(userId: ID!): User              # return user by id
    }


    type Mutation {
        register(input: RegisterInput!): User
        login(input: LoginInput!): User
        logout: LogoutResponse
    }

    input RegisterInput {
        username: String!
        name: String!
        password: String!
        gender: String!
    }

    input LoginInput {
        username: String!
        password: String!
    }

    type LogoutResponse {
        message: String!
    }
`;

export default userTypeDef;
