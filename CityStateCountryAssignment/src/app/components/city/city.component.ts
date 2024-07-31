import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCityComponent } from '../add-city/add-city.component';
import { CityService } from '../../services/city.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  cities: any[] = [];

  constructor(
    private cityService: CityService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchCities();
  }

  fetchCities(): void {
    this.cityService.getCities().subscribe(cities => {
      this.cities = cities;
      this.cities.forEach(city => city.editable = false);
    }, error => {
      this.openSnackBar('Error fetching cities', 'Close');
    });
  }

  editCity(index: number): void {
    this.cities[index].editable = true;
  }

  saveCity(index: number): void {
    const city = this.cities[index];
    if (city.cityName != "" && city.cityPopulation != "") {
      this.cityService.updateCity(city.id, city).subscribe(() => {
        city.editable = false;
        this.openSnackBar('City saved successfully', 'Close');
      }, error => {
        this.openSnackBar('Error saving city', 'Close');
      });
    }
    else {
      this.openSnackBar('Error saving city', 'Close');
    }

  }

  deleteCity(cityId: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this city?');

    if (confirmDelete) {
      this.cityService.deleteCity(cityId).subscribe(() => {
        this.cities = this.cities.filter(city => city.id !== cityId);
        this.openSnackBar('City deleted successfully', 'Close');
      }, error => {
        this.openSnackBar('Error deleting city', 'Close');
        console.error('Error deleting city:', error);
      });
    }
  }

  openAddCityModal(): void {
    const modalRef = this.modalService.open(AddCityComponent, { centered: true });
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.fetchCities();
        this.openSnackBar('City added successfully', 'Close');
      }
    }, (reason) => { });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
