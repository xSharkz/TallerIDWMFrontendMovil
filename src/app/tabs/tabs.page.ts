import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth/auth.service';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit {

  showTabs: boolean = false;  

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    const isAuthenticated = await this.authService.isAuthenticated(); 
    this.showTabs = isAuthenticated;  
  }

}
