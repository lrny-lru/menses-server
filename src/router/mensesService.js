const MensesService = {
    getAllArticles(knex){
        return knex.select('*').from('wiki_items');
    }
};
module.exports = MensesService;