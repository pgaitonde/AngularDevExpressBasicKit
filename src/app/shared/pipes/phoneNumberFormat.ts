import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'phoneNumberFormat'
})

export class PhoneNumberFormatPipe implements PipeTransform {
    
    public transform(value) {
     var formatedPhoneNumber= value.replace(/\s+/g, '-').toLowerCase();
     return '+'+formatedPhoneNumber;
    }
}

