import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-evento-presi',
  standalone: true,
  imports: [],
  templateUrl: './ver-evento-presi.component.html',
  styleUrl: './ver-evento-presi.component.css'
})
export class VerEventoPresiComponent {
  espacio: any =
  {
    nombre: null
  }
  eventoSeleccionado: any = 
  {
    nombreEvento: null,
  }

  usuario: any = {
    nombre: null
  }

  
  nombre: string = '';
  tipo_evento: string = '';
  descripcion: string = '';
  id_usuario: string = '';
  id_espacio: string = '';
  fecha_evento: string = '';
  capacidad_personas: number = 0;
  url_permisos:string='';
  hora_inicio: number = 0;
  hora_fin: number = 0;
  tipo_pago: string = '';
  img_evento: string = '';
  urlmapa: string = '';
  mensajeError = '';

  constructor(private authservice: AuthService, private route: ActivatedRoute, private router: Router) {}
  
    ngOnInit(): void {
      this.usuario.nombre = this.route.snapshot.paramMap.get('User'); // Obtén el nombre desde la URL
      console.log('Nombre del usuario:', this.usuario.nombre);
    }

    editarEvento()
    {
      const evento = {
        nombre: this.nombre,
        descripcion: this.descripcion,  
        capacidad_personas: this.capacidad_personas,
        url_permisos: this.url_permisos,
        img_evento: this.img_evento
      };

      this.authservice.actualizaevento(evento).subscribe
      (
        (respuesta) => {
          console.log('Evento editado correctamente:', respuesta);
        },
        (error) => {
          console.error('Error al editar evento:', error);
          this.mensajeError = 'Verifica los datos.';
          alert(this.mensajeError);
        }
      );
    }

    eliminarEvento() {
      const id_evento = this.eventoSeleccionado.id_evento;
      this.authservice.eliminarEvento(id_evento).subscribe(
        (respuesta) => {
          console.log('Evento eliminado correctamente:', respuesta);
        },
        (error) => {
          console.error('Error al eliminar evento:', error);
          this.mensajeError = 'Verifica los datos.';
          alert(this.mensajeError);
        }
      );
    }
    
}
