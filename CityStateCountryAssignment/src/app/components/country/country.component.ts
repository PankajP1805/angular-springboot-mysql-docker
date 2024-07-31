import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCountryComponent } from '../add-country/add-country.component';
import { CountryService } from '../../services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries: any[] = [];

  constructor(
    private countryService: CountryService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countryService.getCountriesWithStateCount().subscribe(countries => {
      this.countries = countries;
      this.countries.forEach(country => country.editable = false);
    });
  }

  editCountry(index: number): void {
    this.countries[index].editable = true;
  }

  saveCountry(index: number): void {
    const country = this.countries[index];
    if(country.countryName !="" && country.countryPopulation !="")
    {
      this.countryService.updateCountry(country.id, country).subscribe(() => {
        country.editable = false;
        this.showSnackBar('Country updated successfully');
      });
    }
    else {
      this.showSnackBar('Error saving Country');
    }
    
  }

  deleteCountry(countryId: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this country?');

    if (confirmDelete) {
      this.countryService.deleteCountry(countryId).subscribe(() => {
        this.countries = this.countries.filter(country => country.id !== countryId);
        this.showSnackBar('Country deleted successfully');
      }, error => {
        this.showSnackBar(error.error);
      });
    }
  }

  openAddCountryModel(): void {
    const modalRef = this.modalService.open(AddCountryComponent, { centered: true });
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.fetchCountries();
      }
    }, (reason) => { });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', { 
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}

