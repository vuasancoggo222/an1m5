import axios from 'axios'
const config = axios.create({
    baseURL: 'https://mangahook-api-lemon.vercel.app/', 
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