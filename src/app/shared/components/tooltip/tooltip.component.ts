import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {

  @Input()
  public position!: 'top' | 'left' | 'right' | 'bottom';

  @Input()
  public hoverText: string = "Hover me!";

  @Input()
  public tooltipMessage: string = "I'm a tooltip!";

}
