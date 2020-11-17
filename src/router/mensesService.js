const MensesService = {
  getAllArticles(knex){
    return knex.select('*').from('wiki_items');
  },

  getRelatedArticles(knex,searchTerm){
    return knex('wiki_items').select('*').where('content','ILIKE',`%${searchTerm}%`).orWhere('wiki_title','ILIKE',`%${searchTerm}%`);
  }
};


module.exports = MensesService;