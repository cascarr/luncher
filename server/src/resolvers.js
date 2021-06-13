const { paginateResults } = require('./utils');

module.exports = {
    Query: {
        launches: async (_, { pageSize = 20, after }, { dataSources }) => {
            const allLaunches = await dataSources.launchAPI.getAllLaunches();
            // we want these in reverse chronological order
            allLaunches.reverse();

            const launches = paginateResults({
                after,
                pageSize,
                results: allLaunches
            });
            return {
                launches,
                cursor: launches.length ? launches[launches.length - 1].cursor : null,
                // if the cursor at the end of the paginated results is the same as the 
                // last item in _all_ results, then there are no mjore results after this
                hasMore: launches.length
                 ? launches[launches.length - 1].cursor !==
                  allLaunches[allLaunches.length - 1].cursor
                 : false
            };
        },

        /*launches: (_, __, { dataSources }) =>
         dataSources.launchAPI.getAllLaunches(),*/
         launch: (_, { dateUtc }, { dataSources }) =>
         dataSources.launchAPI.getLaunchById({ dateUtc }),
         me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    },
    Link: {
        // the default size is large if not provided
        imgPatch: (link, { size } = { size: 'LARGE' }) => {
            return size === 'SMALL'
             ? link.imgPatchSmall
             : link.imgPatchLarge;
        },
    },
};