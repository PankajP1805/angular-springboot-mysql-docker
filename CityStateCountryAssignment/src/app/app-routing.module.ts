import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { StateComponent } from './components/state/state.component';
import { CityComponent } from './components/city/city.component';

const routes: Routes = [
  { path: 'country', component: CountryComponent },
  { path: 'state', component: StateComponent },
  { path: 'city', component: CityComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
