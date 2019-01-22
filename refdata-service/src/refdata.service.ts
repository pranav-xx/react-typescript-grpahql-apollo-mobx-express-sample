const commodities = [
    {
        "id": "AL",
        "name": "Aluminium",
        "unit": "MT"
    },
    {
        "id": "ZN",
        "name": "Zinc",
        "unit": "MT"
    },
    {
        "id": "AU",
        "name": "Copper",
        "unit": "MT"
    }
];

const parties = [
    {
        "id": "PK",
        "firstName": "Pranav",
        "lastName": "Kaushik"
    },
    {
        "id": "AK",
        "firstName": "Ankit",
        "lastName": "Khandelwal"
    },
    {
        "id": "AS",
        "firstName": "Akshay",
        "lastName": "Sharma"
    },
    {
        "id": "PP",
        "firstName": "Pavan",
        "lastName": "Podila"
    }
];

const locations = [
    {
        "id": "DEL",
        "name": "Delhi"
    },
    {
        "id": "GJ",
        "name": "Gujrat"
    },
    {
        "id": "WB",
        "name": "West Bengal"
    },
    {
        "id": "MH",
        "name": "Maharashtra"
    }
];

const users = [
    {
        "id": "1",
        "username": "pranav",
        "password": "pranav"
    },
    {
        "id": "2",
        "username": "ankit",
        "password": "ankit"
    },
    {
        "id": "3",
        "username": "akshay",
        "password": "akshay"
    }
];

class RefDataService {
    getAllCommodities() {
        return commodities;
    }
    getCommodityById({id}: {id: string}) {
        const results = commodities.filter(commodity => commodity.id === id);
        return results.length > 0 ? results[0] : null;
    }
    getAllLocations() {
        return locations;
    }
    getLocationById({id}: {id: String}) {
        const results = locations.filter(location => location.id === id);
        return results.length > 0 ? results[0] : null;
    }
    getAllParties() {
        return parties;
    }
    getPartyById({id}: {id: String}) {
        const results = parties.filter(party => party.id === id);
        return results.length > 0 ? results[0] : null;
    }
    login({username, password}: {username: string, password: string}) {
        return users.find(user => user.username === username && user.password === password);
    }
}

export const refDataService =  new RefDataService();