// src/main.ts
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CategoryListComponent } from './app/components/category-list/category-list.component';
import { CategoryFormComponent } from './app/components/category-form/category-form.component';
import { ProductListComponent } from './app/components/product-list/product-list.component';
import { ProductFormComponent } from './app/components/product-form/product-form.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Check if in production mode
if (process.env['NODE_ENV'] === 'production') {
  // Üretim ortamı işlemleri
}


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, HttpClientModule, ReactiveFormsModule),
    provideRouter([
      { path: 'categories', component: CategoryListComponent },
      { path: 'categories/edit/:id', component: CategoryFormComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'products/edit/:id', component: ProductFormComponent },
      { path: '', redirectTo: '/categories', pathMatch: 'full' }
    ], withComponentInputBinding())
  ]
}).catch(err => console.error(err));
