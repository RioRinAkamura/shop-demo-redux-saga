import { Category, ListResponse } from "models"
import axiosClient from "./axiosClient"

const categoryApi={
    getAll():Promise<ListResponse<Category>> {
        const url='/categories'
        return axiosClient.get(url, {
            params: {
            _page: 1,
            _limit: 10,
        }})
    },
    getById(id: string):Promise<any> {
        const url=`/categories/${id}`
        return axiosClient.get(url);
    },

    add(data: Category):Promise<Category> {
        const url='/categories'
        return axiosClient.post(url, data);
    },

    update(data: Category):Promise<Category> {
        const url=`/categories/${data.id}`
        return axiosClient.patch(url, data);
    },

    remove(id: string):Promise<any> {
        const url=`/categories/${id}`
        return axiosClient.delete(url);
    },
}


export default categoryApi