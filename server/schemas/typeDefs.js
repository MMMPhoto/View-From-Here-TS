import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Profile {
        _id: ID
        name: String
        email: String
        password: String
        skills: [String]!
    }

    type Query {
        profiles: [Profile]!
        profile(profileId: ID!): Profile
    }
`;

export default typeDefs;