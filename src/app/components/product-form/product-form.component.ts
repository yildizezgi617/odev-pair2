// src/app/components/product-form/product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  productId!: number;
  product!: Product;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe(product => {
        this.product = product;
        this.productForm.patchValue({
          name: product.name,
          description: product.description,
          price: product.price
        });
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;
      if (this.productId) {
        this.productService.updateProduct(this.productId, productData).subscribe(() => {
          console.log('Product updated successfully');
          this.router.navigate(['/products']);
        });
      }
    }
  }
}
