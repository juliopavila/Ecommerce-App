import { Component, ViewChild, OnInit, Renderer, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'accordion',
  templateUrl: 'accordion.html',
  animations: [
    trigger('collapse', [
      state('0', style({
        height: 0,
        opacity: 0,
        display: 'none'
      })),
      state('1', style({
        height: '*',
        opacity: 1,
        display: 'block'
      })),

      transition('1 => 0', animate('200ms ease-out')),
      transition('0 => 1', animate('200ms ease-in'))
    ])
  ]
})
export class AccordionComponent {
  //Los decoradores @Input y @ViewChild, nos permiten la interaccion entre componentes
  //@Input Nos permite recibir datos desde otro componente
  //@ViewChild Nos permite manejar elementos que estan en el Hijo
  @Input('expanded') expanded = false;
  @Input () accs: Object = <any> {};
  @ViewChild("ic") ionCard : any;
  @Input('title') title: String;
  icon: string = "ios-arrow-down-outline";

  constructor(public renderer: Renderer) {
  }

  /**
   * Meteodo para que cuando cargue el componente aplique estilos
   */
  ngOnInit(){
    this.renderer.setElementStyle(this.ionCard.nativeElement, "margin-bottom", "0px");
  }

  /**
   * Metodo del componente para aplicar la animacion y
   * cambios de estados de iconos
   */
  toggleAccordion(){
    if(this.expanded){
      //Cerramos el toggle
      this.renderer.setElementStyle(this.ionCard.nativeElement, "margin-bottom", "0px");
    } else {
      //Abrimos el toggle
      this.renderer.setElementStyle(this.ionCard.nativeElement, "margin-bottom", "15px");
    }
    //Cambiamos de estados
    this.expanded = !this.expanded;
    this.icon = this.icon == "ios-arrow-down-outline" ? "ios-arrow-up-outline" : "ios-arrow-down-outline";
  }

  /**
   * Manejamos los estilos del componente
   * @returns Objeto JSON
   */
  headerStyles(): Object {
    return {
      'color': '#707070',
      'background-color': 'white'
    }
  }

}
