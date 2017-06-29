import PouchDB from 'pouchdb'
import pouchdbFind from 'pouchdb-find'

PouchDB.plugin(pouchdbFind)

export const db = new PouchDB('notes_db')

db.createIndex({
  index: {
    fields: ['created']
  }
}).then(result => {
  return db.find({
    selector: {
      created: {$gt: null}
    },
    sort: [{created: 'desc'}]
  })
})
