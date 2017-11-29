import Store from 'react-observable-store';

export const loginEmail = (value) => {
    Store.update('login', { email: value });
};

export const loginPwd = (value) => {
    Store.update('login', { pwd: value });
};

export const loginError = (value) => {
    Store.update('login', { error: value });
};

export const logout = () => {
    Store.update('profile', { user: false });
};

export const loginSubmit = (cb) => {
    var auth_token = btoa(Store.get('login.email')+':'+Store.get('login.pwd'));
    var endpoint = Store.get('server.endpoint');
    fetch(endpoint + '/login', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + auth_token
        }
    })
    .then(res => res.json())
    .then((data) => {
        if (data.success) {
            cb(auth_token);
            profileGetUser(auth_token);
        } else {
            Store.set('login.error', true);
        }
    });
}

export const profileUser = (value) => {
    Store.update('profile', { user: value });
};

export const profileGetUser = (auth_token) => {
    var endpoint = Store.get('server.endpoint');
    fetch(endpoint + '/user', {
        headers: {
            'Accept': 'application/json, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + auth_token
        }
    })
    .then(res => res.json())
    .then((data) => {
        if (data.success) {
            Store.set('profile.user', data.user);
        }
    });
};
