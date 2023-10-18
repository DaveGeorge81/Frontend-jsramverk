const production = {
    url: 'https://jsramverk-trains-meda23.azurewebsites.net'
};
const development = {
    url: 'http://localhost:1337'
};

export const config = process.env.NODE_ENV === 'development' ? development : production;