import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/Order/order.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  orders: any[] = [];
  loading: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(pageNumber: number = 1, pageSize: number = 10) {
    this.loading = true;
    this.orderService.getUserOrders(pageNumber, pageSize).subscribe(
      (response) => {
        this.orders = response.orders; 
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar las órdenes:', error);
        this.loading = false;
      }
    );
  }
}
