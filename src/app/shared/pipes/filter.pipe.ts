import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPipe'
})

export class FilterPipe implements PipeTransform {

    public transform(value, filterAcross: any,isFilterRequrired) {
        var count =0;
        var columns= Object.keys(filterAcross)
        var len=columns.length;
        var tempFilterAcross=Object.assign({},filterAcross)
        for(var i=0;i<columns.length;i++){
            if(tempFilterAcross[columns[i]].length==0){
                count++;
                delete tempFilterAcross[columns[i]];
            }
        }
        if(len==count)
            return value;
        if (tempFilterAcross == undefined || !isFilterRequrired)
            return value;
        let result = value.filter(o => Object.keys(tempFilterAcross).every(k => tempFilterAcross[k].some(f => o[k] === f)));
        return result;
    }
}