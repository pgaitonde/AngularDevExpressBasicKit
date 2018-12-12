import { Pipe, PipeTransform } from '@angular/core';
import {CurrencyPipe} from '@angular/common'

@Pipe({
    name: 'currencyGenerator'
})

export class CurrencyGeneratorPipe implements PipeTransform {
    constructor(private cp: CurrencyPipe){}
    public transform(value,currencySymbol,decimalPlace,symbolRequired){
        var currencyValue;
        var finalValue='';
        if((Math.abs(+value/1000.0))>1)
        {
            currencyValue=((+value/1000.0))
            finalValue=this.cp.transform(currencyValue,currencySymbol,symbolRequired,decimalPlace).toString()+'b';
        }
        else{
            if((Math.abs(+value))<1)
            {
                currencyValue=((+value*1000.0))
                finalValue=this.cp.transform(currencyValue,currencySymbol,symbolRequired,decimalPlace).toString()+'k';
            }
            else
                finalValue=this.cp.transform(+value,currencySymbol,symbolRequired,decimalPlace).toString()+'m';
        }
        return finalValue;
   }
}
