import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';
const base_url = 'http://192.168.20.187:8001/';

class AuthService {
    // Function to set the user's JWT token in storage
    static async setAuthToken(token) {
        try {
            await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
        } catch (error) {
            console.error('Error storing token:', error);
        }
    }

    // Function to get the user's JWT token from storage
    static async getAuthToken() {
        try {
            const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
            return token;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }

    // Function to clear the user's JWT token from storage (logout)
    static async clearAuthToken() {
        try {
            await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
        } catch (error) {
            console.error('Error clearing token:', error);
        }
    }

    // Function to check if the user is authenticated
    static async isAuthenticated() {
        const token = await AuthService.getAuthToken();
        return !!token; // Return true if token exists, false otherwise
    }

    static async login(user) {
        try {
          const response = await fetch(base_url + 'api/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              password: user.password,
            }),
          });
    
          if (response.status === 200) {
            const data = await response.json();
            this.setAuthToken(data.token);
            return true;
          }
    
          // If login fails, return false
          return false;
        } catch (error) {
          console.error('Error logging in:', error);
          return false;
        }
      }
}

export default AuthService;
