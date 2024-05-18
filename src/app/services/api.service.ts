import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: string;
  userData: any;
  fcmToken: any;

  constructor(private loader: LoaderService, private http: HttpClient) {
    this.getLocalStorageData();
  }

  getLocalStorageData() {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    console.log('hello abhi', this.userData);
    return this.userData;
  }

  getAddress(pincode: string): Promise<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${pincode}&key=AIzaSyCaeagxg2VtncAK2J42akvewEUbMwT8vkg`;
    return this.http.get(url).toPromise();
  }

  async login(data: any): Promise<any> {
    this.loader.show();
    try {
      const response = await this.http.post(`${environment.baseUrl}/api/delivery/user/login`, data).toPromise();
      this.getLocalStorageData();
      this.loader.hide();
      return response;
    } catch (error) {
      this.loader.hide();
      throw error;
    }
  }

  async signup(data: any): Promise<any> {
    try {
      const response = await this.http.post(`${environment.baseUrl}/api/auth/signup`, data).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllUserData(): Promise<any> {
    try {
      const response = await this.getApi('/getAllUserData').toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async addAddress(data): Promise<any> {
    try {
      this.loader.show();
      const response = await this.http.post('/api/address/user', data).toPromise();
      this.loader.hide();
      return response;
    } catch (error) {
      this.loader.hide();
      throw error;
    }
  }

  async getUserAddress(): Promise<any> {
    try {
      console.log('you got your address or not')
      const response = await this.getApi('/api/address/user').toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getServices(): Promise<any> {
    try {
      const response = await this.getApi('/api/service/list').toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getBanners(): Promise<any> {
    try {
      const response = await this.getApi('/api/banner/list').toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getpickUpOrderItem(): Promise<any> {
    try {
      const response = await this.getApi('/api/delivery/boy/assign/order/list').toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getDeliverOrderItem(): Promise<any> {
    try {
      const response = await this.getApi('/api/delivery/boy/delivery/order/list').toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async support(data): Promise<any> {
    try {
      this.loader.show();
      const response = await this.postApi('/api/support/ticket/create', data).toPromise();
      this.loader.hide();
      return response;
    } catch (error) {
      this.loader.hide();
      throw error;
    }
  }

  async historyItem(): Promise<any> {
    try {
      const response = await this.getApi('/api/delivery/boy/completed/order/list').toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getuserinfo(): Promise<any> {
    try {
      const response = await this.getApi('/api/delivery/user/detail').toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(data): Promise<any> {
    try {
      this.loader.show();
      const response = await this.postApi('/api/delivery/user/profile/update', data).toPromise();
      this.loader.hide();
      return response;
    } catch (error) {
      this.loader.hide();
      throw error;
    }
  }
  
  async updateAddress(data): Promise<any> {
    try {
      this.loader.show();
      const response = await this.postApi(`/api/address/update/${data.id}`, data).toPromise();
      this.loader.hide();
      return response;
    } catch (error) {
      this.loader.hide();
      throw error;
    }
  }
  async forgotePassword(data): Promise<any> {
    try {
      this.loader.show();
      const response = await this.postApi('/api/delivery/user/password/update', data).toPromise();
      this.loader.hide();
      return response;
    } catch (error) {
      this.loader.hide();
      throw error;
    }
  }

  async createOrders(data: any): Promise<any> {
    try {
      const response = await this.postApi('/api/order/create', data).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addCart(data: any): Promise<any> {
    try {
      const response = await this.postApi('/api/cart/create', data).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllOrders(): Promise<any> {
    try {
      const response = await this.getApi('/api/order/history').toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getOrderItemDetails(id):Promise<any>{
    try {
      const response = await this.getApi(`/api/order/detail/${id}`).toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  getHttpHeaders() {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    console.log('this.userData===>', this.userData.token);
    this.token = this.userData.token;
  
    console.log('mytoken', this.token);
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }

  getApi(url: any) {
    return this.http.get(`${environment.baseUrl}${url}`, this.getHttpHeaders());
  }

  postApi(url: any, formData: any) {
    return this.http.post(`${environment.baseUrl}${url}`, formData, this.getHttpHeaders());
  }
}




// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { LoaderService } from './loader.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   userInfo: any;
//   businessData: any;
//   token: string;

//   httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'multipart/form-data',
//     }),
//   };

//   constructor(private Loader: LoaderService, private http: HttpClient) {
//     this.getLocalStorageData();
//   }

//   getLocalStorageData() {
//     this.token = localStorage.getItem('token');
//     console.log('token====>', this.token)
//     return this.token;
//   }

//   async login(data: any): Promise<any> {
//     this.Loader.show();
//     console.log('dataaaaa==', data);

//     try {
//       const response = await this.http.post(`${environment.baseUrl}/login`, data).toPromise();
//       this.Loader.hide();
//       return response;
//     } catch (error) {
//       this.Loader.hide();
//       throw error;
//     }
//   }

//   async getuserinfo(): Promise<any> {
//     try {
//       const response = await this.getApi('/getUserData').toPromise();
//       this.Loader.hide();
//       return response;
//     } catch (error) {
//       this.Loader.hide();
//       throw error;
//     }
//   }
//  async getChatMessage(data): Promise<any> {
//     try {
//       const response = await this.getApi('/getMessage',data).toPromise();
//       this.Loader.hide();
//       return response;
//     } catch (error) {
//       this.Loader.hide();
//       throw error;
//     }
//   }
//   async getAllUserData():Promise<any>{
//     try{
//        const response=await this.getApi('/getAllUserData').toPromise()
//        this.Loader.hide();
//        console.log('resresponse',response)
//        return response
//     }catch(err){
//       this.Loader.hide();
//       throw err;
//     }
//   }

//   async signup(data: any): Promise<any> {
//     try {
//       const response = await this.http.post(`${environment.baseUrl}/signup`, data).toPromise();
//       this.Loader.hide();
//       return response;
//     } catch (error) {
//       this.Loader.hide();
//       throw error;
//     }
//   }
//   getHttpHedders() {
//     this.token = localStorage.getItem('Token');
//     console.log(' this.token', this.token )
//     return {
//       headers: new HttpHeaders({
//         Authorization: `Bearer ${this.token}`,
//       }),
//     };
//   }
//   getApi(url: any) {
//     const data= this.http.get(`${environment.baseUrl}${url}`, this.getHttpHedders());
//     return data;
//   }
// }