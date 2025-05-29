import { HeroComponent } from './components/hero/hero.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegionalCuisinesComponent } from './components/regional-cuisines/regional-cuisines.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ContactComponent } from './components/contact/contact.component';
import { CityListComponent } from "./components/city-list/city-list.component";
import { FoodCardComponent } from './components/food-card/food-card.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
 import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SuperAdminloginComponent } from './components/super-adminlogin/super-adminlogin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ProfileDashboardComponent } from './components/profile-dashboard/profile-dashboard.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { CartComponent } from './components/cart/cart.component';
import { SuperDashboardComponent } from './components/super-dashboard/super-dashboard.component';
import { MembershipComponent } from './components/membership/membership.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';
import { MenuComponent } from './components/menu/menu.component';
import { CheckoutComponent } from './components/checkout/checkout.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    RegionalCuisinesComponent,
    SubscriptionComponent,
    LoginComponent,
    SignUpComponent,
    ContactComponent,
    CommonModule,
    CityListComponent,
    FoodCardComponent,
    ProfileComponent,
    AdminDashboardComponent,
    HttpClientModule,
    RestaurantsComponent,
    SuperAdminloginComponent,
    AdminLoginComponent,
    ProfileDashboardComponent,
    SuperDashboardComponent,
    CartComponent,
    MembershipComponent,
    WishlistComponent,
    CustomerSupportComponent,
    MenuComponent,
    CheckoutComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrected here to styleUrls
})
export class AppComponent implements OnInit {
  isHomePage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Now `event` is guaranteed to be of type `NavigationEnd`
          this.isHomePage = event.urlAfterRedirects === '/';
        }
      });
  }
}
