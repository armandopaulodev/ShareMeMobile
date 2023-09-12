import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../auth/AuthService';

const AUTH_TOKEN_KEY = 'auth_token';
const base_url = 'http://192.168.6.187:8001/';

class RoomsService {

  static async creteRoom(name) {

    // this is just example i will not auth routes
    let token = AuthService.getAuthToken();

 

    try {
      const response = await fetch(base_url + 'api/room/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         name: name,
        }),
      }).then(res => res.json());

      console.log(response);

      return response;
    } catch (error) {
      console.error('Error storing token:', error);
    }


  }


}

export default RoomsService;
