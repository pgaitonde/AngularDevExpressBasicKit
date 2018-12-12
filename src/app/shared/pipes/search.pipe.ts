import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchPipe'
})

export class SearchPipe implements PipeTransform {
    
    public transform(value, keys: string, term: string,searchAcross:boolean) {
 
        if(searchAcross)
        {
            if (!term) return value;
                return (value || []).filter((item) => 
                       keys.split(',').some(key => item.hasOwnProperty(key) &&
                       new RegExp(term, 'gi').test(item[key]))
                       );
        }
        else
        {
            if (term === undefined) {
                return value;
            }
            return  value.filter(item => 
                    Object.keys(item).some(k => item[k] != null && 
                    item[k].toString().toLowerCase()
                    .includes(term.toLowerCase()))
                    );
        }
      }
}