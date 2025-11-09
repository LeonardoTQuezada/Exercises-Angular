import { Routes } from "@angular/router";
import { Component } from '@angular/core';
import { RegisterPageComponent } from "./pages/register-page/register-page.component";

export  const authRoutes: Routes = [
  {
    path:'',
    children:[
      {
        path: 'sing-up',
        component: RegisterPageComponent,
      },
      {
        path: '**',
        redirectTo: 'sing-up',
      }
    ]
  }
];

export default authRoutes;
