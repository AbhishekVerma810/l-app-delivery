import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-delivery-item-details',
  templateUrl: './delivery-item-details.page.html',
  styleUrls: ['./delivery-item-details.page.scss'],
})
export class DeliveryItemDetailsPage implements OnInit {
  orderId: string = '';
  customerName: string = '';
  customerContact: string = '';
  pickupAddress: string = '';
  deliveryAddress: string = '';
  totalAmount: number = 0;
  progressValue: number = 0;
  progressLabel: string = 'En Route to Pickup Location';
  laundryItems: any[] = [];
  id: any;
  orderData:any;

  @ViewChild('map', { static: true }) mapElementRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getItemDetails(this.id);
    });
  }

  getItemDetails(id) {
    this.apiService.getOrderItemDetails(id).then((res: any) => {
       console.log('this.totalAmount==>',res)
       this.orderData=res.data;
      this.orderId = res.id.toString();
      this.customerName = 'John Doe';

      this.customerContact = res.Address.phone_number;
      this.pickupAddress = `${res.Address.house_no}, ${res.Address.address_line}, ${res.Address.city}, ${res.Address.state}, ${res.Address.pincode}`;
      this.deliveryAddress = 'Delivery Address';
      this.laundryItems = res.Order_Items.filter(item => item.Service_Category_Item !== null);
      this.totalAmount = parseFloat(res.total_amount);
     
    }).catch(err => {
      console.error('Error fetching item details:', err);
    });
  }
  formatAddress(address: any): string {
    if (address) {
      return `${address.house_no}, ${address.address_line}, ${address.city}, ${address.state}, ${address.pincode}, ${address.country}`;
    }
    return '';
  }
  markAsDelivered() {
    // Implement logic to mark the order as delivered
  }
}
