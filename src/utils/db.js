import PouchDB from 'pouchdb'
import pouchdbFind from 'pouchdb-find'

PouchDB.plugin(pouchdbFind)

export const db = new PouchDB('notes_db')

const remoteDb = new PouchDB('http://localhost:5984/notes_db')

const syncEvent = new Event('sync')

db.sync(remoteDb, {live: true, retry: true})
.on('change', () => {
  window.dispatchEvent(syncEvent)
})

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

// create tags array index
db.createIndex({
  index: {
    fields: [{name: "tags.[]", type: "text"}]
  }
}).then(result => {
  // return db.find({
    // selector: {
      // created: {$gt: null}
    // },
    // sort: [{created: 'desc'}]
  // })
})
