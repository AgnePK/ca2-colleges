import { useContext, createContext } from "react";
import { useState } from "react";

//creating a context to authenticate a user. doing this will make the whole project file system much neater. We only have to import this into a few other files to be able to authenticate a user.
const AuthContext = createContext(null);

export function useAuth(){
    const value = useContext(AuthContext)
    return value;
}

// in this function, we are using props where we want to authenticate the user, let them log in. if there is a valid token, we set the auth to true so that lets the user access the api. if the token is then set to false, it will log the user out. 
export function AuthProvider(props) {
	const [authenticated, setAuthenticated] = useState(false);

	return (
		<AuthContext.Provider
			value={{
				authenticated,
				onAuthenticated: (auth, token) => {
					setAuthenticated(auth);
					if (auth && token) {
						localStorage.setItem("token", token);
					}else if(!auth){
                        localStorage.removeItem("token");
                    }
				},
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
}
