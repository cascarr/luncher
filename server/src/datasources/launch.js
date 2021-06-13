const { RESTDataSource } = require('apollo-datasource-rest');

class LauncherAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'https://api.spacexdata.com/v4/';
    }

    async getAllLaunches() {
        const response = await this.get('launches');
        return Array.isArray(response)
         ? response.map(launch => this.launchReducer(launch))
         : [];
    }

    launchReducer(launch) { // model data in shape
        return {
            id: launch.flight_number || 0,
            cursor: `${launch.date_utc}`,
            name: launch.name,
            flightNum: launch.flight_number,
            link: {
                    name: launch.name,
                    imgPatchSmall: launch.links.patch.small,
                    imgPatchLarge: launch.links.patch.large,
            },
            details: launch.details,
            dateUtc: launch.date_utc,           
        };
    }

    async getLaunchById({ dateUtc }) {
        const response = await this.get('launches', { flight_number: dateUtc });
        return this.launchReducer(response[0]);
    }

    //getLaunchesByIds({  })
}

module.exports = LauncherAPI;