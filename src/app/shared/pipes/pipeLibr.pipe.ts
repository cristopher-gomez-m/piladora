import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kg',
  standalone: true
})
export class PesoPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';
    return `${(value / 2.2).toFixed(2)} kg`; // Convierte de libras a kilogramos
  }
}
