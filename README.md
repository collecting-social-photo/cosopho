# cosopho

## Environment variables
Create `.env` file in the project root with the following values:
``` bash
API_KEY=123456
SIGNATURE=4567
API_ENDPOINT=https://my_api.com/graphql
AUTH0_DOMAIN=domain.auth0.com
AUTH0_CLIENT_ID=abc123
```

## Set up local hosts DNS
The app relies on the subdomain to establish the instance ID. So you have to create a fake local hostname for this.
Edit your local hosts file `/etc/hosts` on Mac/Linux as root (Windows most likey at `c:\Windows\System32\Drivers\etc\hosts` but please Google it for your OS) and add the following records:

``` bash
127.0.0.1 www.cosopho.com
127.0.0.1 micah-walter-674bb737a19d3046.cosopho.com
127.0.0.1 nordic-museu-76ba77f9ebd5d275.cosopho.com
```

To access the app you must use one of these hosts on port 3000. e.g. http://micah-walter-674bb737a19d3046.cosopho.com:3000

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at http://<INSTANCE-ID>.cosopho.com:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
