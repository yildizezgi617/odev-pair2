// src/app/components/category-form/category-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService, Category } from '../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];
    if (this.categoryId) {
      this.categoryService.getCategory(this.categoryId).subscribe(category => {
        this.categoryForm.patchValue(category);
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const category: Category = this.categoryForm.value;
      if (this.categoryId) {
        this.categoryService.updateCategory(this.categoryId, category).subscribe(() => {
          this.router.navigate(['/categories']);
        });
      }
    }
  }
}
