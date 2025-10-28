import { createContext } from 'react';
import type { JournalContextType } from '../types/journal';

const JournalContext = createContext<JournalContextType | null>(null);

export default JournalContext;