export const getRouteAPIAdapter = (api: Function, req: any, res: any) => {
    try {
        const data = api({ ...req.params, ...req.query });
        res.status(200).send(data);
    }
    catch(error) {
        res.status(500).send('unable to fetch');
    }
}
