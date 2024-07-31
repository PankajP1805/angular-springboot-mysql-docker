import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CityService } from '../../services/city.service';
import { StateService } from '../../services/state.service';
import { CountryService } from '../../services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {
  cityName: string = '';
  cityPopulation: string = '';
  stateId: number = 0;
  countryId: number = 0;

  countries: any[] = [];
  states: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private cityService: CityService,
    private stateService: StateService,
    private countryService: CountryService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchStates();
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    }, error => {
      this.openSnackBar('Error fetching countries', 'Close');
    });
  }

  fetchStates(): void {
    this.stateService.getStates().subscribe(states => {
      this.states = states;
    }, error => {
      this.openSnackBar('Error fetching states', 'Close');
    });
  }

  fetchAssociatedStates(): void {
    this.stateService.loadStates(this.countryId).subscribe(states => {
      this.states = states;
    }, error => {
      this.openSnackBar('Error fetching associated states', 'Close');
    });
  }

  fetchAssociatedCountry(): void {
    this.stateService.loadCountry(this.stateId).subscribe(country => {
      if (country) {
        this.countryId = country.id;
      }
    }, error => {
      this.openSnackBar('Error fetching associated country', 'Close');
    });
  }

  save(): void {
    const formData = {
      cityName: this.cityName,
      cityPopulation: this.cityPopulation,
      state: this.stateId ? { id: this.stateId } : null,
      country: this.countryId ? { id: this.countryId } : null
    };
    if (this.cityName != "" && this.cityPopulation != "") {
      this.cityService.addCity(formData).subscribe(
        response => {
          console.log('Data saved successfully');
          this.openSnackBar('City added successfully', 'Close');
          this.activeModal.close('saved');
        },
        error => {
          console.error('Error saving data', error);
          this.openSnackBar('Error saving data', 'Close');
        }
      );

    } else {
      this.openSnackBar('Error saving data', 'Close');
    }

  }

  close(): void {
    this.activeModal.close();
  }

  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
