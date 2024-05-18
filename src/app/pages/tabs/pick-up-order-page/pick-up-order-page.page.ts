import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pick-up-order-page',
  templateUrl: './pick-up-order-page.page.html',
  styleUrls: ['./pick-up-order-page.page.scss'],
})
export class PickUpOrderPagePage implements OnInit {
  pendingOrders: any;
  orders: any;
  itemData: any;

  constructor(private router:Router,private apiService: ApiService) {}

  ngOnInit() {
    this.getPickUpItem();
    this.getDeliveredItem();
  }

  getDeliveredItem() {
    this.apiService.getDeliverOrderItem().then(
      (res) => {
        if (res && res.data) {
          this.itemData = JSON.stringify(res);
          console.log('data==>', this.itemData);
          this.pendingOrders = res.data.map((order) => {
            if (order.Order) {
              return {
                id: order.Order.id,
                title: `Order #${order.Order.id}`,
                date: new Date(order.Order.order_date).toLocaleDateString(),
                pickupAddress: order.Order.Address?.address_line || '',
                dropAddress: order.Order.Address?.address_line || '',
                amount: order.Order.total_amount,
                thumbnailSrc: 'https://via.placeholder.com/150',
              };
            } else {
              return null;
            }
          }).filter(Boolean);
        } else {
          console.log('Error: Invalid response from API');
        }
      }
    ).catch((err) => {
      console.log('err===>', err);
    });
  }
  
navigateOrderDetailsPage(id){
  this.router.navigate([`/tabs/delivery-item-details/${id}`])
}
  getPickUpItem() {
    this.apiService.getpickUpOrderItem().then(
      (res) => {
        const data = res;
        this.processOrderData(res.data);
        console.log('data==>', this.orders);
      }
    ).catch((err) => {
      console.log('err===>', err);
    });
  }

  processOrderData(ordersData) {
    this.orders = ordersData.map((order) => {
      const items = order.Order_Items
        .filter((item) => item.Service_Category_Item !== null)
        .map((item) => `${item.Service_Category_Item.name} (${item.quantity})`);

      const location = `${order.Address.house_no}, ${order.Address.address_line}, ${order.Address.city}, ${order.Address.state}, ${order.Address.pincode}`;

      // Assuming the order date is available under the `order_date` property
      const orderDate = new Date(order.order_date).toLocaleDateString();

      return {
        amount: order.total_amount,
        status: order.status,
        id: order.id,
        location,
        items: items.join(', '),
        orderDate, // Add the orderDate property
      };
    });
  }
}