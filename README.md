# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Follow the below steps to make the app run locally in your system.

After cloning the repository we must install all the dependencies using `npm install` and run the app using `npm start`.

Inorder to make the search functionality work we must first generate Personal Access Token from github.

To generate the personal access token follow the following steps: 

Go to Settings, then click on Developer Settings, then click on Personal Access Token and finally click on Generate new Token to generate a Personal Access Token. Make sure you copy the token into your notepad.

After generating the token, open your cloned react project and create a `.env` and make sure this file is created as a sister file to `package.json`.

Inside the `.env` file copy the following text `REACT_APP_GITHUB_API_TOKEN=token` and replce the `token` with the token you have copied.

Now the serch functionality will work just as you like it.
