import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-bienvenidopersona',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bienvenidopersona.component.html',
  styleUrls: ['./bienvenidopersona.component.css'],
})
export class BienvenidopersonaComponent implements OnInit {
  usuario: any = {
    nombre: null,
    contrasena: null,
    tipousuario: null,
  };
  evento: any = {
    nombre_evento: null
  };
  eventos: any[] = [];
  error: boolean = false;

  nombre_evento: string = '';

  // Variables para el modal de comentario
  modalAbierto: boolean = false;
  comentario: string = '';
  calificacion: number = 0;
  eventoSeleccionado: any = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEventos();
    this.usuario.nombre = this.route.snapshot.paramMap.get('User');
    console.log('nombre del user:', this.usuario.nombre);
  }

  // Método para cargar los eventos desde el servicio
  async loadEventos() {
    try {
      this.eventos = await this.apiService.getEventosusuarionormal();
      if (this.eventos.length === 0) {
        console.warn('No hay eventos disponibles.');
      } else {
        console.log('Eventos cargados:', this.eventos);
      }
      this.error = false;
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      this.error = true;
      this.eventos = [];
    }
  }

  // Método para redirigir a la página de registro de evento
  goToRegistrar() {
    this.router.navigate(['/registroevento1', this.usuario.nombre]);
  }

  // Método para cerrar el modal
  cerrarModal() {
    this.modalAbierto = false;
    this.comentario = '';
    this.calificacion = 0;
  }

  abrirModal(evento: any): void {
  this.modalAbierto = true;
  this.eventoSeleccionado = evento.nombre; // Asigna el nombre del evento seleccionado
  this.nombre_evento = this.eventoSeleccionado; // Actualiza la propiedad 'nombre_evento'
}

  
  enviarComentario(): void {
    const comentarios = {
      eventoId: this.nombre_evento, // Cambia 'nombre_evento' por 'eventoId'
      comentario: this.comentario,
      calificacion: this.calificacion
    };

    this.authservice.enviarComentario(comentarios).subscribe(
      (respuesta) => {
        console.log('Comentario enviado exitosamente:', respuesta);
        this.cerrarModal();
      },
      (error) => {
        console.error('Error al enviar el comentario:', error);
        alert('Hubo un error al enviar el comentario. Intenta de nuevo.');
      }
    );
  }

} 
