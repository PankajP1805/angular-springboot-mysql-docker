import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from '../../services/state.service';
import { CountryService } from '../../services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-state',
  templateUrl: './add-state.component.html',
  styleUrls: ['./add-state.component.css']
})
export class AddStateComponent implements OnInit {
  stateName: string = '';
  statePopulation: string = '';
  countryId: number | null = null;
  countries: any[] = [];
  
  constructor(
    public activeModal: NgbActiveModal, 
    private stateService: StateService, 
    private countryService: CountryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  save() {
    const formData = {
      stateName: this.stateName,
      statePopulation: this.statePopulation,
      country: this.countryId ? { id: this.countryId } : null
    };

    this.stateService.addState(formData).subscribe(
      response => {
        console.log('Data saved successfully');
        this.showSnackBar('State added successfully');
        this.activeModal.close('saved');
      },
      error => {
        console.error('Error saving data', error);
        this.showSnackBar('Error saving state');
      }
    );
  }

  close() {
    this.activeModal.close();
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
