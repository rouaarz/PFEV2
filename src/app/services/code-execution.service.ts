import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeExecutionService {

  private apiUrl = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
  private rapidApiKey = '00563e010dmsh39898a19330041fp1f3278jsn83a4280d0535';  // Remplacez par votre clé API

  constructor(private http: HttpClient) {}

  executeCode(sourceCode: string, languageId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': this.rapidApiKey,
    });

    const body = {
      source_code: sourceCode,
      language_id: languageId
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
