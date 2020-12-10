import { Injectable } from '@angular/core';
import { darkTheme, lightTheme } from 'src/app/constants/themes';
import { Theme } from 'src/app/models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public active: Theme;

  constructor() { }

  setLightTheme():void {
    this.setActiveTheme(lightTheme);
  }

  setDarkTheme():void {
    this.setActiveTheme(darkTheme);
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }

}
