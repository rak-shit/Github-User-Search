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

## Follow the below steps to make the app run locally in your system.

The structure of the project is pretty simple, inside the `src` folder we have a `Components`, `api` and `styles` folders which are for Components which we create, the Github user search API and the styles for components respectively.

There is a `AutoComplete` component which is the main parent component, inside this component we have the `UserList` component which takes the name of the user as a prop. Inside `UserList` we have a `User` component which takes the user details object as a prop and show the name, location and display picture in the auto complete dropdown.

The challenges which I had to face in this task were

1.  Excessive API calls made at each key entry.
2.  Infinite scroll loading because Github API sends a maximum of 100 items in response.

The first challenge was tackled using the `debounce` strategy. I have used a `setTimeout` method inorder to delay the API for call for one second after we enter each letter of the name of the user. I am also making sure that I clear the timeout instance whenever we enter a new letter to the input which will stop from making the previous API calls. The only API call which will be made will be the one which has a `1 second` pause interval. This excessively reduces the maount of API calls being made. Even the google search works this way for it's auto suggestions.

The second challenge was a bit tricky one. For that I used the Interseciton Observer API which helps us to detect the visibility of one element in relaiton to other. To do an infinite scroll, we need to increment page number count when last element of the list is visible to user. This will be done by intersection observer.

Our intersection observer will observe if the last element is visible or not, if it is, we will increment the page number by 1. As our useEffect inside the `UserList` component will run on change in page number, the API will get called and hence we will get list of more users.

To understand the code in depth:

We have defined the Intersection Observer and stored it to `const observer`. The intersection observer have a callback function which accept array of all the intersecting objects. But since, we will be passing only last element to it, we are always checking the 0th entry of this array. If that element intersects means become visible, we will increment the page number.

We have added one more state `lastElement` and initialised it to `null`. Inside the page, we will be passing last element of the array to this state.

Hence, when the value of `lastElement` state will be changed calling another `useEffect` (with lastElement in dependency-array) in `UserList` component. In this `useEffect`, if we get value of lastElement we will pass that element to our intersection observer to observe. Our observer will then check the intersection of this element and increment the page count once this happens.

As the page number changes, the API will be called and more users will be fetched. This will also avoid duplicates.

We also did not use any kind of state management tools. We just used the normal react `useState` to manage the state of the app. We did not need the use of `Redux` because the data in this app is flowing in just single direction i.e from `AutoComplete` to `User` components. 

Just in case if I had to use Redux then I would have just one reducer to maintain the state. I would use `thunk` to make the API call. 

I would also like to add TypeScript to this to make the code much readable and error free. Since this is a very small single page app I did not choose to do that. Also, there aren't many state variables and props to maintain.

This pretty much sums up the architecture of the app :)
