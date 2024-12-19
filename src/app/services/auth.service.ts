import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable(); // Suscribirse al usuario actual

  private apiUrl = 'https://backend-rcxf.onrender.com'; // Tu API base

  constructor(private http: HttpClient) {}
  // Método para iniciar sesión
  login(usuario: { nombre: string, contrasena: string, tipousuario: string }): Observable<any> {
    return this.http.post('https://backend-rcxf.onrender.com/usuario/login',usuario);
  }
  
  // Método para registrar un nuevo usuario
  registrarusuario(usuario: { nombre: string; contrasena: string; email: string; numcontacto: number; tipousuario: string }): Observable<any> 
  {
    return this.http.post('https://backend-rcxf.onrender.com/usuario',usuario);
  }
  //Metodo para registrar un nuevo evento
  registrarevento(evento: { nombre: string; tipo_evento: string; descripcion: string; id_usuario: string; id_espacio:string; fecha_evento: string; capacidad_personas: number; hora_inicio:number; hora_fin:number; tipo_pago:string; img_evento:string }):Observable<any>
  {
    return this.http.post('https://backend-rcxf.onrender.com/evento',evento);
  }
  
  //Metodo para registrar un nuevo espacio
  registrarespacio(espacio: { nombre: string; ubicacion:string; costo: number }):Observable<any>
  {
    return this.http.post('https://backend-rcxf.onrender.com/espacio',espacio);
  }

  actualizaevento(evento: { nombre:string; descripcion:string; capacidad_personas:number; url_permisos:string; img_evento:string }):Observable<any>
  {
    return this.http.put('http://localhost:300/actualizar-evento',evento);
  }

  eliminarEvento(id_evento: string) {
    return this.http.delete('https://backend-rcxf.onrender.com/eliminar-evento', {
      body: { id_evento }
    });
  }

  // Método para enviar el comentario y la puntuación
  enviarComentario(comentarios: {eventoId: string, comentario: string, calificacion: number}): Observable<any> {
    console.log('Enviando al servidor:', comentarios);
    return this.http.post('https://backend-rcxf.onrender.com/calificacion', comentarios);
  }
  
}
