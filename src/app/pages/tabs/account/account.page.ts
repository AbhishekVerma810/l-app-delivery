import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  options: any[] = [];
  userData: any;
  constructor(private router: Router, private apiService: ApiService) { }
  ngOnInit() {
    this.getUserData();
    this.options = [
      { id: 1, name: 'Saved Addresses', img: 'address.png' },
      { id: 2, name: 'Jokar Pass', img: 'pass.png' },
      { id: 3, name: 'Refer a friend', icon: 'share-social', color: 'primary' },
      { id: 4, name: 'Support', img: 'life-guard.png' },
      { id: 5, name: 'About', icon: 'information' },
      { id: 6, name: 'Logout', icon: 'power', color: 'danger' },
    ];
  }
  navigate(id) {
    if (id == '6') {
      this.router.navigate(['/login']);
    }
    else if(id=='1'){
      this.router.navigate(['/login']);
    }else if(id=='2'){
      this.router.navigate(['/login']);
    }else if(id=='3'){
      this.router.navigate(['/login']);
    }else if(id=='4'){
      this.router.navigate(['/login']);
    }else if(id=='5'){
      this.router.navigate(['/login']);
    }
  }
  getUserData() {
    this.apiService.getuserinfo().then(res => {
      console.log('resss=>', res);
      this.userData = res.user;
    }).catch(err => {
      console.log('err+>', err)
    })
  }
}
