import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddStateComponent } from '../add-state/add-state.component';
import { StateService } from '../../services/state.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  states: any[] = [];

  constructor(
    private stateService: StateService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchStateWithCityCount();
  }

  fetchStateWithCityCount(): void {
    this.stateService.getStatesWithCityCount().subscribe(data => {
      this.states = data;
    });
  }

  editState(index: number): void {
    this.states[index].editable = true;
  }

  saveState(index: number): void {
    const state = this.states[index];
    if (state.stateName != "" && state.statePopulation != "") {
      this.stateService.updateState(state.id, state).subscribe(() => {
        this.snackBar.open('State updated successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        state.editable = false;
      }, error => {
        this.snackBar.open('Error updating state', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        console.error('Error updating state:', error);
      });

    }
    else {
      this.snackBar.open('Error updating state', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }

  }

  deleteState(stateId: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this state?');

    if (confirmDelete) {
      this.stateService.deleteState(stateId).subscribe(() => {
        this.states = this.states.filter(state => state.id !== stateId);
        this.showSnackBar('Country deleted successfully');
      }, error => {
        this.showSnackBar(error.error);
      });
    }
  }

  openAddStateModel(): void {
    const modalRef = this.modalService.open(AddStateComponent, { centered: true });
    modalRef.result.then((result) => {
      if (result === 'saved') {
        this.fetchStateWithCityCount();
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
