export interface Product{
    id?: string;
    categoryId: string;
    name: string;
    color:string;
    price:number;
    thumnailUrl:string;
    
    createdAt?: number;
    updatedAt?: number;
    
}