
const resolvers = {
    Query: {
        profiles: async () => {
          return Profile.find();
        },
    }
};

export default resolvers;