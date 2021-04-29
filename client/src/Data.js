import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    async getUser(username, password) {
        const response = await this.api(`/users`, 'GET', null, true, { username, password });
        const jsonRes = await response.json();

        if (response.status === 200) {
            return {
                username,
                password,
                userId: jsonRes.userId
            };
        }
        else if (response.status === 401) {
            return null;
        }
        else {
            throw new Error();
        }
    }

    // Create new user:
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    // Create new course:
    async createCourse(course, username, password) {
        const response = await this.api(`/courses`, 'POST', course, true, {username, password});
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }
        else {
            console.log(response);
            throw new Error();
        }
    }

    // Update  course:
    async updateCourse(course, username, password, id) {
        const path = `/courses/${id}`;
        const response = await this.api(path, 'PUT', course, true, {username, password});
        if (response.status === 204) {
            return [];
        } else if (response.status === 403) {
            console.log("Not authorized operation.")
        } else {
            console.log(response);
            throw new Error();
        }
    }

    // Delete  course:
    async deleteCourse(username, password, id) {
        const path = `/courses/${id}`;
        const response = await this.api(path, 'DELETE', null, true, {username, password});
        if (response.status === 204) {
            return [];
        } else if (response.status === 403) {
            console.log("Not authorized operation.")
        } else {
            console.log(response);
            throw new Error();
        }
    }
}
