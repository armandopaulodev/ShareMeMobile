import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../auth/AuthService';

const AUTH_TOKEN_KEY = 'auth_token';
const base_url = 'http://192.168.205.187:8001/';

class ConvertionService {

  static async wordToPdf(file) {

    // this is just example i will not auth routes
    let token = AuthService.getAuthToken();

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
    });

    try {
      const response = await fetch(base_url + 'api/convert/file', {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }).then(res => res.json());

      return response;
    } catch (error) {
      console.error('Error storing token:', error);
    }


  }


}

export default ConvertionService;
