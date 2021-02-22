import axios from 'axios';
import {Base64} from 'js-base64';
const instance = axios.create({
    baseURL: 'https://skillstepacademy.com:5000/client/api',
    timeout: 60000,
     headers: {"Authorization":"Basic "+Base64.encode("Grej@lFyiBFWMXD:2z2B2dlkdK2pXp7")}
  });
export default instance;