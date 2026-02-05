import LoadingPage from '@/components/common/LoadingPage';
import { checkSession } from '@/services/user';
import {
	ROLES,
	type AuthContextType,
	type AuthProviderProps,
	type IUser,
} from '@/types/user.types';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<IUser>({
		firstName: '',
		lastName: '',
		username: '',
		permissions: [],
		role: ROLES.USER,
		_id: ""
	});

	useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true)
                const sessionActive = await checkSession()
                if(sessionActive.success && sessionActive.data) {
                    setIsAuthenticated(true)
                    setUser(sessionActive.data.user)
                }
                else {
					setIsAuthenticated(false);
				}
            } catch (error) {
                console.log(error)
				setIsAuthenticated(false);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, []);

    if(loading) {
        return  <LoadingPage />
    }

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				loading,
				setLoading,
				user,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be within an authProvider');
	}
	return context;
};
