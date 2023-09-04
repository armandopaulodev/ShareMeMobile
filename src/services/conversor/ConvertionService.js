import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../auth/AuthService';

const AUTH_TOKEN_KEY = 'auth_token';
const base_url = 'http://192.168.20.187:8001/';

class ConvertionService {

  static async wordToPdf(file) {

    // this is just example i will not auth routes
    let token = AuthService.getAuthToken();
    
    // const formData = new FormData();
    // formData.append('file', {
    //   uri: pickedDocument.uri,
    //   name: pickedDocument.name,
    //   type: pickedDocument.mimeType,
    // });

    try {
      const response = await fetch(base_url + 'api/convert/file', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": "multipart/form-data",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'file': file
        }),
      }).then(res => res.json());

      console.log(response)
    } catch (error) {
      console.error('Error storing token:', error);
    }


  }


}

export default ConvertionService;
