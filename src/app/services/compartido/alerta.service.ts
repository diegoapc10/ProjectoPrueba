import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

  async mostrarMensajeConfirmacion(titulo: string, mensaje?: string){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-secondary',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    return swalWithBootstrapButtons.fire({
      title: titulo,
      text: mensaje,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Si',
      reverseButtons: false
    });
  }

  mostrarMensajeSuccess(mensaje: string) {
    Swal.mixin({
      customClass: {
        confirmButton:'btn btn-secondary'
      },
      buttonsStyling: false
    })
    .fire({
      icon: 'success',
      title: 'Éxito',
      text: mensaje
    })
  }

  mostrarMensajeInformacion(mensaje: string) {
    Swal.mixin({
      customClass: {
        confirmButton:'btn btn-secondary'
      },
      buttonsStyling: false
    }).fire({
      icon: 'info',
      title: 'Atención',
      text: mensaje
    })
  }

  mostrarMensajeAlarma(mensaje: string) {
    Swal.mixin({
      customClass: {
        confirmButton:'btn btn-secondary'
      },
      buttonsStyling: false
    }).fire({
      icon: 'warning',
      title: 'Cuidado...',
      text: mensaje,
    })
  }

  mostrarMensajeError(mensaje: string) {
    Swal.mixin({
      customClass: {
        confirmButton:'btn btn-secondary'
      },
      buttonsStyling: false
    }).fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
    })
  }

  mostrarMensajeHTML(title?: string, mensaje?: string) {
    Swal.mixin({
      customClass: {
        confirmButton:'btn btn-secondary'
      },
      buttonsStyling: false
    }).fire({
      icon: 'info',
      title: title,
      html: mensaje
    })
  }
}
