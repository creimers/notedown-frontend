import PouchDB from 'pouchdb'

export const getDB = () => {
  return new PouchDB('notes_db')
}
