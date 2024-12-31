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
  error: string = '';  
  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders(pageNumber: number = 1, pageSize: number = 10) {
    this.loading = true;
    this.error = '';  
    this.orderService.getUserOrders(pageNumber, pageSize).subscribe(
      (response) => {
        if (response && response.orders) {
          this.orders = response.orders; 
        } else {
          this.error = 'No se encontraron órdenes';
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error al cargar las órdenes:', error);
        this.error = 'Error al cargar las órdenes. Intenta de nuevo más tarde.';
        this.loading = false;
      }
    );
  }
}
