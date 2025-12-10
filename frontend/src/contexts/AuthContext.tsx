import LoadingPage from '@/components/common/LoadingPage';
import { checkSession } from '@/services/auth';
import type {
	AuthContextType,
	AuthProviderProps,
	IUser,
} from '@/types/auth.types';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<IUser>({
		firstName: '',
		lastName: '',
		email: '',
		username: '',
		permissions: []
	});

	useEffect(() => {
        const checkAuth = async () => {
            try {
                setLoading(true)
                console.log(loading)
                const sessionActive = await checkSession()
                if(sessionActive.success) {
                    setIsAuthenticated(true)
                    setUser(sessionActive.data)
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
