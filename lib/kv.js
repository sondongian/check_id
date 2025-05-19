// lib/kv.js
const DB = {
  whitelist: ["123456", "999888"],
  blacklist: ["000000", "666666"]
};

module.exports = {
  getData: async () => DB,

  addToList: async (list, ids) => {
    ids.forEach(id => {
      if (!DB[list].includes(id)) DB[list].push(id);
    });
  }
}; 
