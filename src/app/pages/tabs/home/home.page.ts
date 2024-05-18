import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterContentChecked {
  bannerConfig: SwiperOptions;
  banners: any[] = [];
  coordinates: any;
  center: { lat: any; lng: any; };
  formattedAddress: any;
  
  constructor(private router:Router,private apiService:ApiService) {
    this.printCurrentPosition();
    this.getUserData();
  }
getUserData(){
   this.apiService.getuserinfo().then(res=>{
       console.log('resss=>',res);

   }).catch(err=>{
      console.log('err+>',err)
   })
}
  async printCurrentPosition() {
    try {
      const position = await Geolocation.getCurrentPosition();
      console.log('Current position:', position);
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.loadGoogleMaps(() => {
        this.fetchFormattedAddress();
      });
    } catch (error) {
      console.error('Error getting current position:', error);
    }
  }

  ngOnInit() {
    this.banners = [
      { banner: 'assets/imgs/1.jpg' },
      { banner: 'assets/imgs/2.jpg' },
      { banner: 'assets/imgs/3.jpg' },
      { banner: 'assets/imgs/4.jpg' },
    ];
  }

  ngAfterContentChecked() {
    this.bannerConfig = {
      slidesPerView: 1.2,
      spaceBetween: 10,
      loop:true,
      centeredSlides: true,
    };
  }

  loadGoogleMaps(callback: () => void) {
    const apiKey = 'AIzaSyCaeagxg2VtncAK2J42akvewEUbMwT8vkg'; // Replace with your actual API key
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.onload = callback;
    document.head.appendChild(script);
  }

  async fetchFormattedAddress() {
    try {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(this.center.lat, this.center.lng);
      geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results && results.length > 0) {
            this.formattedAddress = results[0].formatted_address;
            console.log('Formatted Address:', this.formattedAddress);
          } else {
            console.log('No results found');
          }
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
    } catch (error) {
      console.error('Error fetching formatted address:', error);
    }
  }
}