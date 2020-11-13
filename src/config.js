module.exports = {
  //keep track of values and set sensible  defaults if neccessary
  PORT: process.env.PORT || 8000,
  //API_TOKEN: process.env.API_TOKEN || 'nonebleedsforsevendaysanddoesntdie',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://Larue@localhost/menses',
};