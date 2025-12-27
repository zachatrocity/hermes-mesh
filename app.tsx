import { createRoot } from 'react-dom/client';
import { HermesMap } from './HermesMap';
import { Nav } from './components/Nav';

function Root() {
  return <>
    <Nav />
    <HermesMap />
  </>;
}

/* global document */
const container = document.body.appendChild(document.createElement('div'));
createRoot(container).render(<Root />);
