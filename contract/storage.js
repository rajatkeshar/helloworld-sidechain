module.exports = {
    set: async function(set) {
        console.log("calling contract");
        app.sdb.lock('storage.set@' + this.trs.senderId)
        let exists = await app.model.Storage.exists({owner: this.trs.senderId})
        if (exists) {
            app.sdb.update('Storage', {set: set}, {owner: this.trs.senderId});
        } else {
            app.sdb.create('Storage', {set: set, owner: this.trs.senderId})
        }
    }
  }
  
