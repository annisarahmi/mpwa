let BASE_URL = "https://api.football-data.org/v2/";
let API_TOKEN = "16d85bf702974259b17e4dff4faeade4";
const LEAGUE_ID = "2002/";

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}


function getAllStandings() {

    if ("caches" in window) {
        caches.match(BASE_URL + "competitions/" + LEAGUE_ID +"/standings", {
            method: "GET",
            headers: {
                "X-Auth-Token" : API_TOKEN,
            },
        }) .then(function(response) {
            if (response){
                response.json().then(function(data) {
                    let standings = "";
                    let standingElement =  document.getElementById("homeStandings");
                    data.standings[0].table.forEach(function (standing) {
                        standings += 
                        `<tr>
                            <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                            <td><a href="./team.html?id=${standing.team.id}">${standing.team.name}</a></td>
                            <td>${standing.won}</td>
                            <td>${standing.draw}</td>
                            <td>${standing.lost}</td>
                            <td>${standing.points}</td>
                            <td>${standing.goalsFor}</td>
                            <td>${standing.goalsAgainst}</td>
                            <td>${standing.goalDifference}</td>
                        </tr>`;
                    });

                    standingElement.innerHTML = `
                        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                        <table class="striped responsive-table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Team Name</th>
                                    <th>W</th>
                                    <th>D</th>
                                    <th>L</th>
                                    <th>P</th>
                                    <th>GF</th>
                                    <th>GA</th>
                                    <th>GD</th>
                                </tr>
                            </thead>
                            <tbody id="standings">
                                ${standings}
                            </tbody>
                        </table>
                        
                        </div>`;
                })

            }
        })
    }

    fetch(BASE_URL +"competitions/" + LEAGUE_ID +"standings", {
        method: "GET",
        headers: {
            "X-Auth-Token": API_TOKEN,
        },
    })
    .then(status)
    .then(json)
    .then(function(data) {
        let standings = "";
        let standingElement =  document.getElementById("homeStandings");

        data.standings[0].table.forEach(function (standing) {
            standings += `
                    <tr>
                        <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                        <td><a href="./info-team.html?id=${standing.team.id}">${standing.team.name}</a></td>
                        <td>${standing.won}</td>
                        <td>${standing.draw}</td>
                        <td>${standing.lost}</td>
                        <td>${standing.points}</td>
                        <td>${standing.goalsFor}</td>
                        <td>${standing.goalsAgainst}</td>
                        <td>${standing.goalDifference}</td>
                    </tr>
            `;
        });

        standingElement.innerHTML = `
                    <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                    <table class="striped responsive-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Team Name</th>
                                <th>W</th>
                                <th>D</th>
                                <th>L</th>
                                <th>P</th>
                                <th>GF</th>
                                <th>GA</th>
                                <th>GD</th>
                            </tr>
                        </thead>
                        <tbody id="standings">
                            ${standings}
                        </tbody>
                    </table>
                    
                    </div>
        `;
    })
    .catch(error);
}


// Menampilkan data tim berdasarkan id
function getTeamsById() {
    return new Promise(function(resolve, reject) {
        var urlParams = new URLSearchParams(window.location.search);
        var idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(BASE_URL + "teams/" + idParam, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': API_TOKEN,
                },
            }).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        let tableHTML = ``
                        data.squad.forEach(function(squad) {
                   
                            tableHTML += `
                            <tr>
                                <td>${squad.name}</td>
                                <td>${squad.position}</td>
                                <td>${squad.dateOfBirth}</td>
                                <td>${squad.nationality}</td>
                            </tr>`;
                        })

                        let teamHTML = `
                        <div class="row">
                            <div class="col s12">
                                <div class="card horizontal">
                                    <div class="card-image">
                                        <img class="responsive-img" src="${data.crestUrl}">
                                    </div>
                                    <div class="card-stacked">
                                        <div class="card-content">
                                            <h2 class="header">${data.name}</h2>
                                            <h6>${data.shortName}</h6>
                                            <p><i class="material-icons">email</i>${data.email}</p>
                                            <p><i class="material-icons">language</i>Website: ${data.website}</p>
                                            <p><i class="material-icons">call</i>${data.phone}</p>
                                            <p><i class="material-icons">place</i>${data.address}</p>
                                        </div>
                                        <div class="card-action">
                                            <a class="btn halfway-fab waves-effect waves-light hoverable deep-orange darken-4" id="saved"><i class="large material-icons">bookmark_border</i>save</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                        </div> 
        
                        <div class="row">
                            <div class="col s12">                       
                                <div class="card-content">
                                    <table class="striped responsive-table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Position</th>
                                                <th>Date Of Birth</th>
                                                <th>Nationality</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${tableHTML}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        `;

                        document.getElementById("info-team").innerHTML = teamHTML;
                        resolve(data);
                    });
                }
            });
        }
        fetch(BASE_URL + "teams/" + idParam, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': API_TOKEN,
                },
            })
            .then(status)
            .then(json)
            .then(function(data) {
                let tableHTML = ``
                data.squad.forEach(function(squad) {
                   
                    tableHTML += `
                    <tr>
                        <td>${squad.name}</td>
                        <td>${squad.position}</td>
                        <td>${squad.dateOfBirth}</td>
                        <td>${squad.nationality}</td>
                    </tr>`;
                })

                let teamHTML = `
                <div class="row">
                    <div class="col s12">
                        <div class="card horizontal">
                            <div class="card-image">
                                <img class="responsive-img" src="${data.crestUrl}">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content">
                                    <h2 class="header">${data.name}</h2>
                                    <h6>${data.shortName}</h6>
                                    <p><i class="material-icons">email</i>${data.email}</p>
                                    <p><i class="material-icons">language</i>Website: ${data.website}</p>
                                    <p><i class="material-icons">call</i>${data.phone}</p>
                                    <p><i class="material-icons">place</i>${data.address}</p>
                                </div>
                                <div class="card-action">
                                    <a class="btn halfway-fab waves-effect waves-light hoverable deep-orange darken-4" id="saved"><i class="large material-icons">bookmark_border</i>save</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col s12">                       
                        <div class="card-content">
                            <table class="striped responsive-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Date Of Birth</th>
                                        <th>Nationality</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${tableHTML}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                `;

                document.getElementById("info-team").innerHTML = teamHTML;
                resolve(data);
            });
    });

}




function getSavedTeam() {

    
    getAll().then(function(data) {
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      let standings = "";
      let standingElement =  document.getElementById("homeStandings");

      data.standings[0].table.forEach(function (standing) {
          standings += `
                  <tr>
                      <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                      <td><a href="./info-team.html?id=${standing.team.id}">${standing.team.name}</a></td>
                      <td>${standing.won}</td>
                      <td>${standing.draw}</td>
                      <td>${standing.lost}</td>
                      <td>${standing.points}</td>
                      <td>${standing.goalsFor}</td>
                      <td>${standing.goalsAgainst}</td>
                      <td>${standing.goalDifference}</td>
                  </tr>
          `;
      });

      standingElement.innerHTML = `
                  <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">

                  <table class="striped responsive-table">
                      <thead>
                          <tr>
                              <th></th>
                              <th>Team Name</th>
                              <th>W</th>
                              <th>D</th>
                              <th>L</th>
                              <th>P</th>
                              <th>GF</th>
                              <th>GA</th>
                              <th>GD</th>
                          </tr>
                      </thead>
                      <tbody id="standings">
                          ${standings}
                      </tbody>
                  </table>
                  
                  </div>
      `;
  })
}