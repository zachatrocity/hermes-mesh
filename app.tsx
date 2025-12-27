import { createRoot } from 'react-dom/client';
import { HermesMap } from './HermesMap';

function Root() {
  return <HermesMap />;
}

/* global document */
const container = document.body.appendChild(document.createElement('div'));
createRoot(container).render(<Root />);
