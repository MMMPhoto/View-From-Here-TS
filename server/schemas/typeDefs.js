import gpl from 'graphql-tag';

const typeDefs = gpl`
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