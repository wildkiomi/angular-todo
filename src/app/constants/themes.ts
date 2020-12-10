import { Theme } from '../models/theme';

export const lightTheme: Theme = {
  name: "light",
  properties: {
    "--primary": "#112c52",
    "--secondary": "white",
    "--text": "black",
    "--todo-hover": "#f6faff",
    "--logout-hover": "#0d223f",
  }
}

export const darkTheme: Theme = {
  name: "dark",
  properties: {
    "--primary": "black",
    "--secondary": "#252525",
    "--text": "white",
    "--todo-hover": "#292929",
    "--logout-hover": "#100f0f",
  }
}