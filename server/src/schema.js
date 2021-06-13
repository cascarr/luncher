const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        launches(
            pageSize: Int

            after: String
        ): LaunchConnection!
        launch(dateUtc: String!): Launch
        me: User
    }

    type LaunchConnection { # Query conn
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!
    }

    type Mutation {
        login(email: String): User
    }

#schema follows#
    type Launch {
        id: ID!
        name: String!
        flightNum: Int
        link: Link
        details: String
        dateUtc: String
    }

    type User {
        id: ID!
        email: String
    }

    type Link {
        name: String
        imgPatch(size: Size): String
    }


    enum Size {
        SMALL
        LARGE
    }
`;

module.exports = typeDefs;
