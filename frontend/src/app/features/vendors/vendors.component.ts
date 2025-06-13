import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VendorService, Vendor } from '../../core/services/vendors.service';

@Component({
  standalone: true,
  selector: 'app-vendors',
  imports: [CommonModule, RouterModule],
  templateUrl: './vendors.component.html',
})
export class VendorsComponent implements OnInit {
  vendors: Vendor[] = [];

  constructor(private vendorService: VendorService) {}

  ngOnInit(): void {
    this.vendorService.getAll().subscribe((data) => {
      this.vendors = data;
    });
  }
}
