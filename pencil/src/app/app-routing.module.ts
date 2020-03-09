import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnerCalendarComponent } from './owner-calendar/owner-calendar.component';

const routes: Routes = [

{
  path: '', component: HomeComponent,
},
{
  path: 'signup', component: SignupComponent,
},
{
  path: 'login', component: LoginComponent,
},
{
  path: 'calendar', component: CalendarComponent,
},
{
  path: 'owner', component: OwnerComponent,
},
{
  path: 'owner-calendar', component: OwnerCalendarComponent,
},
{
  path: '**',
  redirectTo: '',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
