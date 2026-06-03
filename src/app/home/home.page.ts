import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
// TODO TA06 - Importamos los componentes Ionic utilizados.
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
  IonList, IonItem, IonLabel, IonButton, IonInput,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  ToastController
} from '@ionic/angular/standalone';
// TODO TA06 – Formularios reactivos
// FormBuilder simplifica la creación de FormGroup con su método group().
// ReactiveFormsModule habilita las directivas [formGroup] y formControlName en el HTML.
import { ReactiveFormsModule, Validators } from '@angular/forms';
// TODO TA06 - Importar TitleCasePipe y SlicePipe

import { Elemento } from '../models/elemento.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonFooter,
    IonList, IonItem, IonLabel, IonButton, IonInput,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    // TODO TA06 - Añadir IonNote: componente para mostrar mensajes de error bajo los campos del formulario

    ReactiveFormsModule,
    // Pipes: TitleCasePipe capitaliza la primera letra de cada palabra; 
    // SlicePipe recorta cadenas

  ],
})
export class HomePage {

  busqueda = signal<string>('');

  elementos = signal<Elemento[]>([
    { id: 1, nombre: 'Angular', descripcion: 'Framework SPA de Google', categoria: 'Frontend' },
    { id: 2, nombre: 'Ionic', descripcion: 'Framework para apps híbridas', categoria: 'Mobile' },
    { id: 3, nombre: 'TypeScript', descripcion: 'Superset tipado de JavaScript', categoria: 'Lenguaje' },
    { id: 4, nombre: 'Node.js', descripcion: 'Entorno de ejecución de JS en servidor', categoria: 'Backend' },
    { id: 5, nombre: 'Capacitor', descripcion: 'Puente nativo para apps Ionic', categoria: 'Mobile' },
  ]);

  hayElementos = computed<boolean>(() => this.elementos().length > 0);

  elementosFiltrados = computed<Elemento[]>(() => {
    const texto = this.busqueda().trim().toLowerCase();
    if (!texto) {
      return this.elementos();
    }

    return this.elementos().filter(e =>
      e.nombre.toLowerCase().includes(texto)
    );
  });

  private router = inject(Router);
  private toastController = inject(ToastController);
  // TODO TA06 – FormBuilder: forma moderna de crear FormGroups con sintaxis abreviada.
  // inject() inyecta el servicio sin necesidad de declararlo en el constructor.

  // ── FORMULARIO DINÁMICO ──────────────────────────────────────────────────────
  // TODO TA06 – Los campos se generan desde este array.
  // Al añadir un objeto aquí, el formulario y el HTML se actualizan solos.
  campos = [
    { name: 'nombre', label: 'Nombre', type: 'text', validators: [Validators.required, Validators.minLength(3)] },
    { name: 'descripcion', label: 'Descripción', type: 'text', validators: [Validators.required, Validators.minLength(5)] },
    { name: 'categoria', label: 'Categoría', type: 'text', validators: [] },
    //Añadir más campos para comprobar la funcionalidad del formulario dinámico.
  ];

  //TODO TA06: Creamos el FormGroup mediante el FormBuild
  formularioDinamico: any;

  //TODO TA06: Inicializamos el formulario dinámico
  constructor() {
    
  }

  verDetalle(elementoHome: Elemento): void {
    this.router.navigate(['/detalle'], { state: { elementoHome } });
  }

  async mostrarToast(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'Lista de tecnologías cargada correctamente',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  // TODO TA06 – Construye el FormGroup dinámico recorriendo el array "campos".
  // Cada entrada del array genera un FormControl con sus validadores.
  // Revisar la teoría Formularios reactivos, apartado: "Alternativa: validators directos y Record<string, unknown>"
  inicializarFormDinamico(): void {
    // Inicializamos group mediante Record
    
    // Recorremos campos para rellenar el objeto group
    
    // Asignamos el nuevo valor a formularioDinamico

  }

  // TODO TA06 – Envío del formulario dinámico: añade el elemento al signal igual que el estático.
  // Más adelante analizaremos async y Promise. Quedaros con el concepto de asincronía.
  async agregarElemento(): Promise<void> {
    // Si el formularioDinamico es invalido ponemos todos los controles de FormGroup (y sus controles hijos) como touched.
    // Revisar la teoría Mostrar errores de validación, apartado: "Forzar la visualización de errores: markAllAsTouched()"
    
    // Asignamos los valores de nombre, descripcion y categoria con los valores que vienen desde formularioDinamico
    
    // Creamos el Elemento nuevo con los valores nombre, descripcion y categoria.
    // Necesitaremos añadir también el campo id, para ello -> id: Date.now(),
    
    // Actualizaremos elementos con los valores que vienen en nuevoElemento.
    // Importante: hacer spread para crear una copia nueva añadiendo el nuevo elemento.
    
    // Reseteamos formularioDinamico

  }
}
