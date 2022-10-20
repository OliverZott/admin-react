# Run/DEBUG

## JetBrains IDE

- Run start-script
- Run debug-script (from "Edit Configurations")

## VS Code

- Create launch.json file
- start app: `npm start`
- in debug view: `run edge against localhost`

--------------------------------------------------------------------------

# Setup

- `npx create-react-app admin-react --template typescript`
- bootstrap
  - *css link* from *get started*
  - dashboard example:
    - copy *html* to App.tsx
    - copy *css* to App.css

# Remarks

- useEffect BUG - <https://stackoverflow.com/questions/63457699/useeffect-continuously-fires-get-requests>

- **useEffect**
  - <https://daveceddia.com/useeffect-hook-examples/>
  - <https://reactjs.org/docs/hooks-effect.html>

--------------------------------------------------------------------------

# Steps

## Router in application

- `npm i react-router-dom @types/react-router-dom`

## API requests

### axios

- `npm i axios @types/axios`
- use `axios.post().then()`
