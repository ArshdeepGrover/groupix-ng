import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveUnderScoreAndTitleCasePipe } from './remove-under-score-and-title-case.pipe';

@NgModule({
  declarations: [
    RemoveUnderScoreAndTitleCasePipe
  ],
  imports: [CommonModule],
  exports: [RemoveUnderScoreAndTitleCasePipe],
})
export class PipesModule {}
