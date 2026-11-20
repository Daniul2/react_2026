// App entry point: this file is included in index.html via <script type="module" src="/src/main.tsx">.

// Import createRoot from React DOM — it creates the "root" React renders the whole app into.
import {createRoot} from 'react-dom/client'
// Import global styles (Tailwind directives). Vite injects this CSS into the page itself.
import './index.css'
// RouterProvider — a component that "turns on" routing: listens to the address bar and shows the right page.
import {RouterProvider} from "react-router-dom";
// Import our router object (description of all routes) from routes.tsx.
import {routes} from "./routes/routes.tsx";

// 1) document.getElementById('root') — find <div id="root"></div> in index.html.
//    "!" (non-null assertion) tells TypeScript: "the element definitely exists, not null".
// 2) createRoot(...) — turn this div into the React root.
// 3) .render(<RouterProvider router={routes}/>) — render the router; it then decides what to show for the current url.
createRoot(document.getElementById('root')!).render(<RouterProvider router={routes}/>);
