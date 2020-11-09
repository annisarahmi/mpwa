let dbPromised = idb.open("Football Team", 1, function(upgradeDb) {
    let infoTeamObjectStore = upgradeDb.createObjectStore("infoTeam", {
      keyPath: "id"
    });
    infoTeamObjectStore.createIndex("id_team", "id", { unique: false });
  });


  function saveForLater(team) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("infoTeam", "readwrite");
        let store = tx.objectStore("infoTeam");
        console.log(team);
        // store.add(team.result);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("infoTeam", "readonly");
          var store = tx.objectStore("infoTeam");
          return store.getAll();
        })
        .then(function(infoTeam) {
          resolve(infoTeam);
        });
    });
  }