# Readme

React exmaple using a nodejs backend with express and user authentication

# Run/DEBUG

## Prerequisites

- Node.js
- npm
- `npm install`

## JetBrains IDE

- Run start-script
- Run debug-script (from "Edit Configurations")

## VS Code

1. (Create launch.json file)
1. start app: `npm start` (no debugger attached!!)
1. in debug view: `Launch Edge against localhost` (from launch.json)

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

## Dashboard C3

- `npm i c3 @types/c3`

## Redux

- `npm i react-redux @types/react-redux`
- for simpler out-of-the-box convention-over-config ...`npm install @reduxjs/toolkit`
- actions ...are events, that redux sends
- reducers ...get all events and handle them (e.g. adding to state)

### New project

- Redux + TypeScript template ...`npx create-react-app my-app --template redux-typescript`
