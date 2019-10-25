import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgPipesModule } from 'ngx-pipes';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListModule } from './app-shell/list/list.module';
import { MasterDetailModule } from './app-shell/master-detail/master-detail.module';
import { GridModule } from './app-shell/grid/grid.module';
import { Blank3Module } from './app-shell/blank-3/blank-3.module';
import { Blank2Module } from './app-shell/blank-2/blank-2.module';
import { BlankModule } from './app-shell/blank/blank.module';
import { LoginModule } from './shared/login/login.module';
import { FooterComponent } from './app-shell/footer/footer.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from './shared/login/_helpers';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AdminModule } from './app-shell/admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ListModule,
    MasterDetailModule,
    GridModule,
    Blank3Module,
    Blank2Module,
    BlankModule,
    LoginModule,
    AdminModule,
    BrowserAnimationsModule,
    NgPipesModule
    ,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
