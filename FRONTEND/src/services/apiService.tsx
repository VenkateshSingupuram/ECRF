import Cookies from "js-cookie";

async function fetchAPI(endpoint: string, method: string, body?: Body, header?: Headers) {
    const url = `${endpoint}`;
    header && (header['xsrf-token'] = Cookies.get(`eCRF_xsrf_token`));
    const options: RequestInit = {
        method,
        headers: header || {
            'Content-Type': 'application/json',
            'xsrf-token': Cookies.get(`eCRF_xsrf_token`)
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }
    let response:any;
    try {
        response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
    }
    catch (error: any) {
        // console.log("error:::",error)
    }

    return response.json();
}

export const apiService = {
    get: (endpoint: string, headers?: Headers) => fetchAPI(endpoint, 'GET', undefined, headers),
    post: (endpoint: string, body: Body, headers?: Headers) => fetchAPI(endpoint, 'POST', body, headers),
    put: (endpoint: string, body: Body, headers?: Headers) => fetchAPI(endpoint, 'PUT', body, headers),
    delete: (endpoint: string, headers?: Headers) => fetchAPI(endpoint, 'DELETE', undefined, headers),
};