import axios from "axios";
import _ from "lodash";

export default class Response {
    constructor() {
        this._isError = false;
        this._data = null;
    }

    static of(data,isError){
        const respond = new Response()

        respond.data = data
        respond.isError =isError

        return respond
    }

    get isError() {
        return this._isError;
    }

    set isError(value) {
        this._isError = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    handleError(err){
        this.isError = true
        this._data = err?.response?.data
    }

    handleResult(result){
        if(!this.isError){
            this.data = result.data
        }
    }

    ifNotError(callBack){
        if(!this.isError){
            callBack(this.data)
        }
    }
}

const DEFAULT_GET_CONFIG = {
    token: null
}

export async function fetchGet(url, query= {}, token ) {
    const response = new Response();

    const head = !config.token ? {} : {
        Authorization: `Token ${token}`
    }

    const config = {
        Authorization: `Bearer ${token}`
    }

    const params = new URLSearchParams(_.omitBy(query, _.isUndefined))

    response.handleResult(
        await axios.get(url, {
            headers: config
        }).catch(error => {
            response.handleError(error)
        })
    )

    return response;
}

const DEFAULT_CONFIG =  {
    method: 'POST',
    headers: {},
    body: null
}

const middleWear = (config,token) =>{

    if(config?.headers?.Authorization){
        return
    }
    if(config.headers && token ){
        config.headers.Authorization = `Bearer ${token}`
    }else {
        config.headers =  !token ? '' : {
            Authorization: `Bearer ${token}`
        }
    }
}

const toConfig = (c) =>{
    return {
        headers: c.headers,
    }
}

export async function fetchPost(url,token = null, config = DEFAULT_CONFIG) {
    const response = new Response();

    middleWear(config,token)

    response.handleResult(
        await axios.post(url,config.body, toConfig(config)).catch(error => {
            response.handleError(error)
        })
    )
    return response;
}

export async function fetchPostFilter(axiosMethod,url,token = null, config = DEFAULT_CONFIG){
    const response = new Response();

    middleWear(config,token)

    response.handleResult(
        await axiosMethod(url,config.body, toConfig(config)).catch(error => {
            response.handleError(error)
        })
    )

    return response;
}

export async function fetchPut(url,token = null, config = DEFAULT_CONFIG) {
    return await fetchPostFilter(axios.put,url,token,config);
}