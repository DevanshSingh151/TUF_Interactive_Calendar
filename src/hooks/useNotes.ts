import { useState, useEffect, useCallback, useRef } from 'react';

export function useNotes(monthYearKey: string) {
  const [note, setNote] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedNote = localStorage.getItem(`calendar_note_${monthYearKey}`);
    if (savedNote) {
      setNote(savedNote);
    } else {
      setNote('');
    }
  }, [monthYearKey]);

  const saveNote = useCallback((value: string) => {
    setIsSaving(true);
    setIsSaved(false);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      localStorage.setItem(`calendar_note_${monthYearKey}`, value);
      setIsSaving(false);
      setIsSaved(true);
      
      setTimeout(() => setIsSaved(false), 1500);
    }, 500);
  }, [monthYearKey]);

  const updateNote = (newNote: string) => {
    setNote(newNote);
    saveNote(newNote);
  };

  const clearNote = () => {
    setNote('');
    localStorage.removeItem(`calendar_note_${monthYearKey}`);
  };

  return { note, updateNote, clearNote, isSaving, isSaved };
}
