import { Pipe, PipeTransform, Injector } from '@angular/core';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { PesoPipe } from './pipeLibr.pipe';

@Pipe({
  name: 'dynamicPipe',
  standalone: true
})

export class DynamicPipe implements PipeTransform {

  constructor(private injector: Injector) { }

  transform(value: any, pipeToken: string, ...pipeArgs: any[]): any {
    let pipe: PipeTransform;

    switch (pipeToken) {
      case 'currency':
        pipe = this.injector.get(CurrencyPipe);
        break;
      case 'date':
        pipe = this.injector.get(DatePipe);
        break;
      case 'decimal':
        pipe = this.injector.get(DecimalPipe);
        break;
      case 'kg':
        pipe = this.injector.get(PesoPipe);
        break;
      default:
        return value;
    }

    return pipe.transform(value, ...pipeArgs);
  }
}
