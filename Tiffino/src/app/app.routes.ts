import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeroComponent } from './components/hero/hero.component';
import { RegionalCuisinesComponent } from './components/regional-cuisines/regional-cuisines.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ContactComponent } from './components/contact/contact.component';
import { CityListComponent } from './components/city-list/city-list.component';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { SuperAdminloginComponent } from './components/super-adminlogin/super-adminlogin.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ProfileDashboardComponent } from './components/profile-dashboard/profile-dashboard.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { CartComponent } from './components/cart/cart.component';
import { SuperDashboardComponent } from './components/super-dashboard/super-dashboard.component';
import { MembershipComponent } from './components/membership/membership.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CustomerSupportComponent } from './components/customer-support/customer-support.component';
import { MenuComponent } from './components/menu/menu.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MealPlanComponent } from './components/meal-plan/meal-plan.component';
import { MealAvailabilityComponent } from './components/meal-availability/meal-availability.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
 
export const routes: Routes = [
    { path: 'header', component: HeaderComponent },
    { path: 'footer', component: FooterComponent },
    { path: '', component: HeroComponent },
    { path: 'regional-cuisines', component: RegionalCuisinesComponent },
    { path: 'subscription', component: SubscriptionComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'cityList', component: CityListComponent },
    { path: 'food-card/:location', component: FoodCardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'admindashboard', component: AdminDashboardComponent, children: [
        { path: 'menu', component: MenuComponent }, // Menu inside Admin Dashboard
        { path: 'menuList', component: MenuListComponent }, // Menu List inside Admin Dashboard
        { path: 'meal-plans', component: MealPlanComponent },
        {path:'meal-availability',component:MealAvailabilityComponent}
    ]},
    { path: 'restaurant', component: RestaurantsComponent },
    { path: 'super-admin-login', component: SuperAdminloginComponent },
    { path: 'admin-login', component: AdminLoginComponent },
    { path: 'profile-dashboard', component: ProfileDashboardComponent },
    { path: 'cart', component: CartComponent },
    { path: 'superdashboard', component: SuperDashboardComponent },
    { path: 'membership', component: MembershipComponent },
    { path: 'wishlist', component: WishlistComponent },
    { path: 'customerSupport', component: CustomerSupportComponent },
    {path:'checkout',component:CheckoutComponent},
 
    // Default route
    { path: '', redirectTo: 'login', pathMatch: 'full' },
 
    // Catch-all wildcard route
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule],
    exports: [RouterModule]
})
export class AppRoutingModule { }
 
 