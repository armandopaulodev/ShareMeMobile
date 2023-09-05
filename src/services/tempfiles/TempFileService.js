import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../auth/AuthService';

const AUTH_TOKEN_KEY = 'auth_token';
const base_url = 'http://192.168.20.187:8001/';

class TempFileService {

  static async getTempFile() {

    // this is just example i will not auth routes
    let token = AuthService.getAuthToken();

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
    });

    try {
      const response = await fetch(base_url + 'api/get/temp/file', {
        method: 'GET',
      }).then(res => res.json());

      console.log(response);

      return response;
    } catch (error) {
      console.error('Error storing token:', error);
    }


  }


}

export default ConvertionService;
