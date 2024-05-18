import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  data: any;

  pendingOrders = [
    {
      thumbnailSrc: 'assets/imgs/package.png',
      title: 'send Packages',
      date: 'Jan 7, 2022',
      pickupAddress: '12/24, Karol Bagh, Delhi',
      dropAddress: '13/12, Vasantkunj, Delhi',
      amount: 250.00
    },
    {
      thumbnailSrc: 'assets/imgs/package.png',
      title: 'Pick up Packages',
      date: 'Jan 7, 2022',
      pickupAddress: '12/24, Karol Bagh, Delhi',
      dropAddress: '13/12, Vasantkunj, Delhi',
      amount: 250.00
    },

    // Add more orders as needed
  ];
  orders: any;
  constructor(private apiService: ApiService) {
  }
  ngOnInit() {
    this.getOrderHistory();
  }
  getOrderHistory() {
    this.apiService.historyItem().then(res => {
      this.data = res;
      console.log('this.data==>', this.data)
    }).catch(err => {
      console.log('err new err', err)
    })
  }
  processOrderData(ordersData) {
    this.orders = ordersData.map(order => {
      const items = order.Order_Items
        .filter(item => item.Service_Category_Item !== null)
        .map(item => `${item.Service_Category_Item.name} (${item.quantity})`);

      const location = `${order.Address.house_no}, ${order.Address.address_line}, ${order.Address.city}, ${order.Address.state}, ${order.Address.pincode}`;

      // Assuming the order date is available under the `order_date` property
      const orderDate = new Date(order.order_date).toLocaleDateString();

      return {
        amount: order.total_amount,
        status: order.status,
        id: order.id,
        location,
        items: items.join(', '),
        orderDate // Add the orderDate property
      };
    });
  }
}
