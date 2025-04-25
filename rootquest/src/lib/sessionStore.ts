import { promises as fs } from 'fs';
import path from 'path';
import type { Session } from '../types/gameSessionTypes';

const SESSION_FILE = path.join(process.cwd(), 'tmp_sessions.json');

// Initialise le fichier si pas présent
export async function initStore() {
  try {
    await fs.access(SESSION_FILE);
  } catch {
    await fs.writeFile(SESSION_FILE, JSON.stringify({}));
  }
}

export async function clearStore() {
  try {
    await fs.access(SESSION_FILE);
    await fs.writeFile(SESSION_FILE, JSON.stringify({}));
  } catch (error) {
    console.error('Error clearing session store:', error);
  }
}


export async function getAllSessions(): Promise<Record<string, Session>> {
  await initStore();
  const data = await fs.readFile(SESSION_FILE, 'utf-8');
  return JSON.parse(data);
}

export async function getSession(id: string): Promise<Session | undefined> {
  const sessions = await getAllSessions();
  return sessions[id];
}

export async function setSession(id: string, session: Session) {
  const sessions = await getAllSessions();
  sessions[id] = session;
  await fs.writeFile(SESSION_FILE, JSON.stringify(sessions, null, 2));
}

export async function addPlayerToSession(id: string, username: string)  : Promise<boolean>{
  const sessions = await getAllSessions();
  if (sessions[id] && sessions[id].players.length < 2) {
    if (!sessions[id].players.includes(username)) {
      sessions[id].players.push(username);
      sessions[id].team2.push(username);
      await fs.writeFile(SESSION_FILE, JSON.stringify(sessions, null, 2));
      return true;
      
    }
    return false;
  }
  return false;
}