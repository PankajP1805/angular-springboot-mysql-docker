import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from '../../services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent {

  countryName: string = '';
  countryPopulation: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private countryService: CountryService,
    private snackBar: MatSnackBar
  ) { }

  save() {
    const formData = {
      countryName: this.countryName,
      countryPopulation: this.countryPopulation
    };
    if (this.countryName != "" && this.countryPopulation != "") {
      this.countryService.addCountry(formData).subscribe(
        response => {
          console.log('Data saved successfully');
          this.showSnackBar('Country added successfully');
          this.activeModal.close('saved');
        },
        error => {
          console.error('Error saving data', error);
          this.showSnackBar('Error saving country');
        }
      );
    }
    else {
      this.showSnackBar('Error saving country');
    }

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
