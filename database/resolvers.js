const user = require('../models/user');

/*
  Aqui esta difinida la lgogica y las consultas a la base de datos
*/

const resolvers = {
  Query: {
    getUsers: async () => {
      // Esta funcion retorna todas las usuarias
      try {
        const users = await User.find();

        return users;

      } catch (error) {
        throw new Error('Usuarios no encontrados')
      }
    },
    getMatchesNetworking: async (_, { id }) => {
      // Esta funcion retorna: Match networking solo entre guiadas
      try {
        const user = await User.findById(id);

        if(user.roles === 'GUIADA'){
          const matchesNetworking = await User.aggregate([
            {
              $match: {
                _id: {$ne : user._id},
                roles: user.roles,
                enterprises: { $not: { $eq: user.enterprises } }
              }
            }
          ])
          return matchesNetworking;
        }
      } catch (error) {
        console.log(error)
      }
    },
    getMatchesGuidesSameCompany: async (_, { id }) => {
      // Esta funcion retorna: Match solo entre guiadas de la misma empresa
      try {
        const user = await User.findById(id);

        if(user.roles === 'GUIADA'){
          const matchesGuidesSameCompany = await User.aggregate([
            {
              $match: {
                _id: {$ne : user._id},
                roles: user.roles,
                enterprises: user.enterprises
              }
            }
          ])
          return matchesGuidesSameCompany;
        }
      } catch (error) {
        console.log(error)
      }
    },
    getMatchesMentoring: async (_, { id }) => {
      // Esta funcion retorna: Match etre mentora-guiada de diferentes empresas o que no tengan empresa
      try {
        const user = await User.findById(id);

          const matchesMentoring = await User.aggregate([
            {
              $match: {
                _id: {$ne : user._id},
                enterprises: { $not: { $eq: user.enterprises } }
              }
            }
          ])
          return matchesMentoring;

      } catch (error) {
        console.log(error)
      }
    },
    getInternalCompanyMentoring: async (_, { id }) => {
      // Esta funcion retorna: Match entre mentora-guiada de la isma empresa
      try {
        const user = await User.findById(id);

          const InternalCompanyMentoring = await User.aggregate([
            {
              $match: {
                _id: {$ne : user._id},
                enterprises: user.enterprises
              }
            }
          ]);
          return InternalCompanyMentoring;

      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    createUser: async (_, { input }) => {
      // Funcion para crear usuarios, utilizada para poblar la base de datos
      try {
        const user = new User(input);
        await user.save();

        return user;

      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = {
  resolvers
}
