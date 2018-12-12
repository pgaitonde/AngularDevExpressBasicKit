import { NgModule } from '@angular/core';

// Animation module required for material design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//  Material Design modules
import {
  // Form Controls
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  // Navigation
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  // Layout
  MatListModule,
  MatGridListModule,
  MatCardModule,
  MatTabsModule,
  MatTableModule,
  MatExpansionModule,
  MatStepperModule,
  // Buttons, Indicators & Icons
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatBadgeModule,
  // Popoups & Modals
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSortModule,
  MatRippleModule,
  MatPaginatorModule,
} from '@angular/material';


@NgModule({
  exports: [
    BrowserAnimationsModule,
    // Form Controls
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatFormFieldModule,

    // Navigation
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,

    // Layout
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatStepperModule,

    // Buttons, Indicators & Icons
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatBadgeModule,

    // Popoups & Modals
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatPaginatorModule,
    // Miscellaneous
    MatSortModule,
    MatRippleModule
  ],
  declarations: []
})
export class MaterialDesignModule { }