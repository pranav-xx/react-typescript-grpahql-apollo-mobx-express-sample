export class Commodity {
    id: string;
    name: string;
    unit: string;
    constructor(id: string = '', name: string = '', unit: string = 'Metric Ton' ) {
        this.id = id;
        this.name = name;
        this.unit = unit;
    }
}
