import {
  Component,
  AfterViewInit,
  Renderer2,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule, NgFor, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../auth/service/product.service';
import { CategoryService } from '../../core/services/category.service';
import { Category } from '../../shared/models/category.model'; // ✅ à adapter aussi

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgFor, AsyncPipe, RouterModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  products$ = this.productService.getAll();
  productCategories: Category[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((data) => {
      this.productCategories = data;
    });
  }

  ngAfterViewInit(): void {
    let currentSlide = 0;
    const slides = document.querySelectorAll<HTMLElement>('.slide');

    const moveSlide = (direction: number) => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + direction + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
    };

    const prevBtn = document.querySelector('.nav.prev');
    const nextBtn = document.querySelector('.nav.next');

    this.renderer.listen(prevBtn, 'click', () => moveSlide(-1));
    this.renderer.listen(nextBtn, 'click', () => moveSlide(1));
  }
}
