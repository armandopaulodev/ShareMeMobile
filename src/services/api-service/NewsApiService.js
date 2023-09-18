 
 const AUTH_TOKEN_KEY = 'auth_token';
//  const base_url = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&country=pt&apiKey=59ec0098886845ed8a1225a3f2794345';
 const base_url = 'https://newsapi.org/v2/everything?q=apple&language=pt&sortBy=popularity&apiKey=59ec0098886845ed8a1225a3f2794345'; //everything
 export default class NewsApiService {

    static async getNews(){
        try {
            const response = await fetch(base_url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }).then(res => res.json());
      
            return response;
          } catch (error) {
            console.error('Error storing token:', error);
          }
    }
 }