import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './auth/login/login/login.component';
import { TokenInterceptor } from './auth/token.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate: [AuthGuard]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
