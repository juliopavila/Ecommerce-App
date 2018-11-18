import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './header-menu/header-menu';
import { AccordionComponent } from './accordion/accordion';
@NgModule({
	declarations: [HeaderMenuComponent,
    AccordionComponent],
	imports: [],
	exports: [HeaderMenuComponent,
    AccordionComponent]
})
export class ComponentsModule {}
