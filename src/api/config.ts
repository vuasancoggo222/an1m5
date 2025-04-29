import axios from 'axios'
import router from '@/router';
const config = axios.create({
    baseURL: 'https://an1m52.vercel.app/meta/', 
  });

export default config ;


config.interceptors.response.use(function (response) {
  
  return response;
}, function (error) {
  console.log(error);
  // if(error.response.status == 500){
  //   router.push('/bad-request-500')
  // }
  return Promise.reject(error);
});