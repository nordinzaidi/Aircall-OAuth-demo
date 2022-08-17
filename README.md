# Weather App
## Testing app for Aircall Partners

The Weather App is an **Aircall Creative Lab** app, sending weather information to Aircall users during calls. The App is available to our customers in production. Official documentation can be found in our [Developer Portal]( https://developer.aircall.io/labs/weather/).

**Notes about this App**
This testing version was created by the App Ecosystems team to facilitate the implementation and testing of the OAuth process and the Public API. 

This first version contains some of the code of the original version but not all features are available. We will work in the future in new versions to implement more features to showcase how to use our API to crete awesome apps. 

**Right now only the OAuth process routes work.** 


## Installation

1. Clone repository
2. Install [Node.js](https://nodejs.org/en/)
3. run `npm install`
4. Update `.env` file (make sure to rename it too!)

4.1 For developement environments...
```sh
DEBUG=true
LOCAL=true
```

4.2 Add your base URL*
```sh
APP_BASE_URL="https://myawesomeapp.dev"
```

4.3 Add your Aircall OAuth crednetials:
```sh
AIRCALL_OAUTH_AUTHORIZE_URL="https://dashboard.aircall.io/oauth/authorize"
AIRCALL_OAUTH_SUCCESS_URL="https://dashboard.aircall.io/oauth/success"
AIRCALL_OAUTH_ID="abc123"
AIRCALL_OAUTH_SECRET="123abc"
```

4.4 other Env variables. 
The env file has other variables for API and DB use but right now we are not going to use it so until we enable more features in future releases of this App those won't work well. Of course, you are free to explore and play with the code if you want and then those should work just fine. :) 

5 . You can serve it with `npm start`

***IMPORTANT Note about the redirect URL!** 
Our Oauth process only works with `https` and doesn't work in localhost. You will need a tunnel service such as Ngrok.com. If you have a staging server even better. Once you have the URL you can provide it to us and we will update it in our backend. 

As of this writting, we need to manually add your `redirect_url` to our backend (Yeah I know...). This means that it can take up to a day or two for us to reply based on our workload. This also makes working with Ngrok difficult as you need a paid plan to generate a static URL. Otherwise everytime you listen With Ngrok it will create a new URL and you need to provide it to us so we update it in the backend. 

We are working on a better process, meanwhile you can also upload the App to something like https://replit.com/ which should generate a static URL. 


## Usage

1. Once the app properly set and is running go to `yoururl.com/oauth/install`
2. That will trigger the OAuth flow, and redirect to Aircall.io. You will need to be logged in in Aircall with the test account you've been given. 
3. Authorize access. 
4. Once you the token is granted, the app is configured to make an example call to `/company` and output the JSON. 

[Here's a video tutorial explaining what and how.](https://www.loom.com/share/97cffddad77944369b4cb460e45e993a). Excuse my spanish accent :) 

## Files for reference

The main logic for the OAuth flow in the example is in 3 files: 

* src/routes.js
* src/controllers/oauth_controller.js
* src/modules.aircall_api_requester.js
