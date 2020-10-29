import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns/fp';
@Pipe({
  name: 'day',
})
export class DayPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return format('dd/MM/yyyy')(new Date(value));
  }
}
