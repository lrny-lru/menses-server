const xss = require('xss');


const MensesService = {
  getAllArticles(knex){
    return knex.select('*').from('wiki_items');
  },

  getRelatedArticles(knex,searchTerm){
    return knex('wiki_items').select('*').where('content','ILIKE',`%${searchTerm}%`).orWhere('wiki_title','ILIKE',`%${searchTerm}%`);
  },

  insertNote(knex, newNote) {
    return knex.insert(newNote).into('notes').returning('*').then(rows => {
      return rows[0];
    });
  },

  serializeNote(note) {
    return {
      note_id: note.note_id,
      subject: xss(note.subject),
      content: xss(note.content),
      date_created: new Date(note.date_created)
    };
  }


};


module.exports = MensesService;