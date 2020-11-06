
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosRequestInterface {
    baseURL?: string;
    url: string;
    data?: any;
    params?: any;
    method?: Method;
    headers?: any;
    timeout?: number;
    responseType?: ResponseType;
}
export interface AxiosResponseInterface {
    data: any;
    headers: any;
    request?: any;
    status: number;
    statusText: string;
    config: AxiosRequestInterface;
}

export interface CustomResponseInterface {
    readonly status: boolean;
    readonly message: string;
    data: any;
    origin?: any;
}
