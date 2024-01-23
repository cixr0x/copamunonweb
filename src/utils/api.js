
//const host = "http://copamunon.com:8080";
const host = "http://localhost:8080";

export const get = async (endPoint, params) => {
    try {
        let paramsString = "";
        console.log("params")
        console.log(params)
        if (params) {
            let paramStringList = Object.keys(params).map(k => {
                return `${k}=${params[k]}`;

            });
            console.log("paramStringList")
            console.log(paramStringList)
            paramsString = paramStringList.join("&");
            paramsString = "?" + paramsString;
        }

        const response = await fetch(`${host}/api/${endPoint}${paramsString}`, { 
            
             });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
    }
}

export const post = async (endPoint, body) => {
    try {
        const response = await fetch(`${host}/api/${endPoint}`, {
            method: "POST",
            headers: {
                user: "test",
                sessionid: "96f1995b-e6f6-4bf6-b474-a7e4ea6d174e",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
    }
}

export const put = async (endPoint, body) => {
    try {
        const response = await fetch(`${host}/api/${endPoint}`, {
            method: "PUT",
            headers: {
                user: "test",
                sessionid: "96f1995b-e6f6-4bf6-b474-a7e4ea6d174e",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
    }
}

export const deletee = async (endPoint, id) => {
    try {
        const response = await fetch(`${host}/api/${endPoint}/${id}`, {
            method: "DELETE",
            headers: {
                user: "test",
                sessionid: "96f1995b-e6f6-4bf6-b474-a7e4ea6d174e",
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
    }
}