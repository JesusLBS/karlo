import { Root } from "../interfaces/user.interface";
import httpRequestService from "../../../../shared/services/api/httpRequestService";

export default class UserService {
    private url: string;
    private resource: string = 'admin/user/';

    constructor() {
        this.url = `${import.meta.env.VITE_APP_API_URL}${this.resource}`;
    }
    async index(params: any) {
        const { limit, page, sort, direction, withTrashed, search } = params;
        const scope = `${this.url}${limit}/${page}/${sort}/${direction}/${null}/${null}`;

        return httpRequestService.get<Root>(scope, null);
    }
};