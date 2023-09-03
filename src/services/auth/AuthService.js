import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';

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
}

export default AuthService;
