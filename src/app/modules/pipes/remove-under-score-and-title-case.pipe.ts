import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderScoreAndTitleCase',
})
export class RemoveUnderScoreAndTitleCasePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Replace underscores with spaces and convert to title case
    return value
      .replace(/_/g, ' ') // Replace underscores
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  }
}
