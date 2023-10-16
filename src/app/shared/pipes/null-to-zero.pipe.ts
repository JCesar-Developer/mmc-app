import { Pipe, PipeTransform } from '@angular/core';

/**
 * A custom Angular pipe that transforms a value into a number,
 * treating null, undefined, and empty strings as zero (0).
 */
@Pipe({
  name: 'nullToZero'
})
export class NullToZeroPipe implements PipeTransform {

  /**
   * Transforms the input value into a number.
   *
   * @param value - The input value to be transformed. It can be a number, null, undefined, or a string.
   * @returns A number representation of the input value, or 0 if the input is null, undefined, or an empty string.
   */
  transform(value: number | null | undefined | string): number {
    if (value === null || value === undefined || value === '') return 0;
    return +value;
  }

}
