export const getRouteAPIAdapter = async (api: Function, req: any, res: any) => {
    try {
        const data = await api({ ...req.params, ...req.query });
        res.status(200).send(data);
    }
    catch(error) {
        res.status(500).send('unable to fetch');
    }
}

export const newId = () => {
    return Math.random()
        .toString(36)
        .substring(7);
}