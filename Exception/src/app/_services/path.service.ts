import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {
  path: string = 'https://demo-exception.space:5000/'
  constructor() { }
}
