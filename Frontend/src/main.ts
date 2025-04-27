import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// 📊 Import des composants nécessaires à Chart.js
import {
  Chart,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarController, // 👈 Enregistrement du contrôleur "bar"
  BarElement // 👈 Enregistrement de l'élément "bar"
} from 'chart.js';

// ✅ Enregistrement global des composants utilisés
Chart.register(
  LinearScale,
  CategoryScale,
  BarController, // 👈 Enregistre le contrôleur "bar"
  BarElement, // 👈 Enregistre l'élément "bar"
  PointElement,
  Tooltip,
  Legend
);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
