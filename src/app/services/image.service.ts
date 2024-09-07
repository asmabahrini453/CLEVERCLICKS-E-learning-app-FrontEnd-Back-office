import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:8081/api/pfa/image'; 

  constructor(private http: HttpClient) { }

  // Upload an image
  uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post<string>(this.apiUrl, formData);
  }
  

  // Download an image and handle it as a Blob
  downloadImage(fileName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${fileName}`, { responseType: 'blob' });
  }

}