import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * @title Application Configuration
 *
 * @description This configuration object sets up the core providers for the Angular application.
 * It includes zone change detection, routing, HTTP client, and asynchronous animations.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * @description Configures Angular's zone change detection with event coalescing to optimize change detection.
     *
     * @param {Object} config - Configuration object for zone change detection.
     * @property {boolean} eventCoalescing - If true, event coalescing is enabled to reduce the number of change detection cycles.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * @description Provides the application's routing configuration.
     *
     * @param {Array} routes - The array of route definitions for the application.
     */
    provideRouter(routes),

    /**
     * @description Provides the HTTP client service for making HTTP requests.
     */
    provideHttpClient(),

    /**
     * @description Provides asynchronous animations support for the application.
     */
    provideAnimationsAsync(),
  ],
};