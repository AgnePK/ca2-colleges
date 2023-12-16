import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from "./contexts/AuthContext";
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	{/* The AuthProvider is basically protecting and using login (to the api)*/}
	{/* This enables the users to be able to log in and see the pages in App.js */}
	{/* we set up all the authentication in the context folder then wrap it around the App itself. Its easier to manage and cleaner */}
		<AuthProvider>
			<App/>
		</AuthProvider>
  </React.StrictMode>
);
