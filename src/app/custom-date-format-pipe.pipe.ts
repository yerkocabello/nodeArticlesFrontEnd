import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
    name: 'niceDateFormatPipe',
})
export class CustomDateFormatPipePipe implements PipeTransform {
    transform(value: string) {

        const valueNumber = Number(new Date(value));

        const dif = Math.floor( ( (Date.now() - valueNumber) / 1000 ) / 86400 );

        if ( dif < 2 ) {
            return convertToNiceDate(value);
        } else {
            const datePipe = new DatePipe('en-US');
            value = datePipe.transform(value, 'MMM d');
            return value;
        }
    }
}

function convertToNiceDate(time: string) {
    const date = new Date(time),
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        daydiff = Math.floor(diff / 86400);

    if (isNaN(daydiff) || daydiff < 0 || daydiff >= 31) {
        return '';
    }
    if (daydiff === 0) {
        const datePipe = new DatePipe('en-US');
        return datePipe.transform(time,  'h:mm a');
    }
    console.log(daydiff);

    return (daydiff === 0 && date) || (daydiff === 1 && 'Yesterday');
}
