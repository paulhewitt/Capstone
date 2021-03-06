import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FullCalendarModule } from '@fullcalendar/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { CalendarComponent } from './calendar/calendar.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule, MatButtonModule, MatCardModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OwnerComponent } from './owner/owner.component';
import { OwnerCalendarComponent } from './owner-calendar/owner-calendar.component';
import { GraphQLModule } from './graphql.module';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ChartsModule } from 'ng2-charts';



const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('493711971522202')
  }
]);

export function provideConfig() {
  return config;
}


export function momentAdapterFactory() {
  return adapterFactory(moment);
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    CalendarComponent,
    OwnerComponent,
    OwnerCalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
    SocialLoginModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    GraphQLModule,
    ApolloModule,
    HttpLinkModule,
    ChartsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }, {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://o5x5jzoo7z.sse.codesandbox.io/graphql'
          })
        };
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
