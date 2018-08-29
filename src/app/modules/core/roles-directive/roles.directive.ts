import {Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {CanActivateAuth} from '../../../guard/can-activate-auth';

@Directive({
  selector: '[appRoles]'

})
export class RolesDirective   implements OnInit {

  @Input() roles: string[];

  constructor( private elementRef: ElementRef,
              private canActivateAuth: CanActivateAuth,
              private viewContainer: ViewContainerRef) {

  }

  ngOnInit() {
    const  contains = this.canActivateAuth.containsRoles(this.roles);
    if (!contains) {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }


}
