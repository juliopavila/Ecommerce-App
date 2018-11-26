import { NgModule } from '@angular/core';
import { HeaderMenuComponent } from './header-menu/header-menu';
import { AccordionComponent } from './accordion/accordion';
import { ShoppingModalComponent } from './shopping-modal/shopping-modal';
@NgModule({
	declarations: [HeaderMenuComponent,
    AccordionComponent,
    ShoppingModalComponent],
	imports: [],
	exports: [HeaderMenuComponent,
    AccordionComponent,
    ShoppingModalComponent]
})
export class ComponentsModule {}
