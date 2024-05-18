let caracCC = 0;
let caracCT = 0;
let caracF = 0;
let caracE = 0;
let caracI = 0;
let caracAg = 0;
let caracDex = 0;
let caracInt = 0;
let caracFM = 0;
let caracSoc = 0;

function ficheIdentite(fiche) {
    const careerActu = fiche.items.filter(function (itemActu) {
        if(itemActu.type === "career") {
            return itemActu.system.current.value === true;  
        }
    }); 
    console.log("careerActu 1 :" + careerActu[0])

    const sectionIdentite = document.querySelector(".identite");
    const tableIdentite = document.createElement("table");
    tableIdentite.classList.add("hidden");
    const tr1Identite = document.createElement("tr");
    const tr2Identite = document.createElement("tr");
    const tr3Identite = document.createElement("tr");
    const tr4Identite = document.createElement("tr");
    const td11Identite = document.createElement("td");
    const td12Identite = document.createElement("td");
    const td21Identite = document.createElement("td");
    const td22Identite = document.createElement("td");
    const td31Identite = document.createElement("td");
    const td32Identite = document.createElement("td");
    const td41Identite = document.createElement("td");
    const td42Identite = document.createElement("td");
    const td43Identite = document.createElement("td");
    const td44Identite = document.createElement("td");
    
    td11Identite.innerHTML = `<span class="tdInterne"><strong>Nom</strong> <span>${fiche.name}</span></span>`;
    td11Identite.colSpan = 2;
    td12Identite.innerHTML = `<span class="tdInterne"><strong>Race</strong> <span>${fiche.system.details.species.value}</span></span>`;
    td12Identite.colSpan = 2;
    td21Identite.innerHTML = `<span class="tdInterne"><strong>Classe</strong> <span>${careerActu[0].system.class.value}</span></span>`;
    td21Identite.colSpan = 2;
    td22Identite.innerHTML = `<span class="tdInterne"><strong>Carrière</strong> <span>${careerActu[0].system.careergroup.value}</span></span>`;
    td22Identite.colSpan = 2;
    td31Identite.innerHTML = `<span class="tdInterne"><strong>Niveau</strong> <span>${careerActu[0].name}</span></span>`;
    td31Identite.colSpan = 2;
    let valeurStatut = "";
    switch(careerActu[0].system.status.tier) {
        case "b":
            valeurStatut = "Bronze";
            break;
        case "s":
            valeurStatut = "Argent";
            break;
        case "g":
            valeurStatut = "Or";
            break;
        default:
            valeurStatut = "Bronze";
    };
    td32Identite.innerHTML = `<span class="tdInterne"><strong>Statut</strong> <span>${valeurStatut} ${careerActu[0].system.status.standing}</span></span>`;
    td32Identite.colSpan = 2;
    td41Identite.innerHTML = `<span class="tdInterne"><strong>Âge</strong> <span>${fiche.system.details.age.value}</span></span>`;
    td42Identite.innerHTML = `<span class="tdInterne"><strong>Taille</strong> <span>${fiche.system.details.height.value}</span></span>`;
    td43Identite.innerHTML = `<span class="tdInterne"><strong>Cheveux</strong> <span>${fiche.system.details.haircolour.value}</span></span>`;
    td44Identite.innerHTML = `<span class="tdInterne"><strong>Yeux</strong> <span>${fiche.system.details.eyecolour.value}</span></span>`;
    
    tr1Identite.appendChild(td11Identite);
    tr1Identite.appendChild(td12Identite);
    tr2Identite.appendChild(td21Identite);
    tr2Identite.appendChild(td22Identite);
    tr3Identite.appendChild(td31Identite);
    tr3Identite.appendChild(td32Identite);
    tr4Identite.appendChild(td41Identite);
    tr4Identite.appendChild(td42Identite);
    tr4Identite.appendChild(td43Identite);
    tr4Identite.appendChild(td44Identite);
    tableIdentite.appendChild(tr1Identite);
    tableIdentite.appendChild(tr2Identite);
    tableIdentite.appendChild(tr3Identite);
    tableIdentite.appendChild(tr4Identite);
    sectionIdentite.appendChild(tableIdentite);
    
    console.log(fiche);
};

function tableauCaracs(caracFiche, index, caracGlob, fiche, caracTest) {
    let caracSpe = document.querySelectorAll(".caracSpe");
    const initial = document.querySelectorAll(".initial");
    const advances = document.querySelectorAll(".advances");
    let modifier = document.querySelectorAll(".modifier");
    let actuelle = document.querySelectorAll(".actuelle");

    const careerActu = fiche.items.filter(function (itemActu) {
        if(itemActu.type === "career") {
            return itemActu.system.current.value === true;  
        }
    });
    for(i = 0; i < careerActu[0].system.characteristics.length; i++) {
        if(careerActu[0].system.characteristics[i] === caracTest) {
            if(caracFiche.advances >= (careerActu[0].system.level.value * 5)) {
                caracSpe[index].innerHTML = ` <i class="fa-solid fa-star fa-2xs"></i>`;
            }else{
                caracSpe[index].innerHTML = ` <i class="fa-regular fa-star fa-2xs"></i>`;
            };
        };
    };

    initial[index].innerHTML = `${caracFiche.initial}`;
    advances[index].innerHTML = `${caracFiche.advances}`;
    caracGlob = `${caracFiche.initial + caracFiche.advances + parseInt(modifier[index].value)}`;
    actuelle[index].innerHTML = caracGlob;
    modifier[index].addEventListener("change", function () {
        caracGlob = `${caracFiche.initial + caracFiche.advances + parseInt(modifier[index].value)}`;
        actuelle[index].innerHTML = caracGlob;
    });
    return caracGlob;
};

function secondaires(fiche) {
    let inputFortune = document.getElementById("fortune");
    let inputFate = document.getElementById("fate");
    let inputResolve = document.getElementById("resolve");
    let inputResilience = document.getElementById("resilience");
    let inputXPspent = document.getElementById("spent");
    let inputXPtotal = document.getElementById("xpTotal");
    let inputXPactuel = document.getElementById("xpActuelle");
    let inputMove = document.getElementById("move");
    let inputMarche = document.getElementById("marche");
    let inputRun = document.getElementById("run");
    let inputCorruptionActu = document.getElementById("corruptionActuelle");
    let inputCorruption = document.getElementById("corruption");

    inputFortune.value = fiche.system.status.fortune.value;
    inputFate.value = fiche.system.status.fate.value;
    inputResolve.value = fiche.system.status.resolve.value;
    inputResilience.value = fiche.system.status.resilience.value;
    inputXPspent.value = fiche.system.details.experience.spent;
    inputXPtotal.value = fiche.system.details.experience.total;
    inputXPactuel.value = inputXPtotal.value - inputXPspent.value;
    inputMove.value = fiche.system.details.move.value;
    inputMarche.value = `${inputMove.value * 2} m.`
    inputRun.value = `${inputMove.value * 4} m.`
    inputCorruptionActu.value = fiche.system.status.corruption.value;
    // Bonus FM + Bonus Endu
    inputCorruption.value = Math.floor((fiche.system.characteristics.t.initial + fiche.system.characteristics.t.modifier + fiche.system.characteristics.t.advances + fiche.system.characteristics.t.bonusMod + fiche.system.characteristics.wp.initial + fiche.system.characteristics.wp.modifier + fiche.system.characteristics.wp.advances + fiche.system.characteristics.wp.bonusMod)/10);

}

function afficherCompetences(fiche) {
    const careerActu = fiche.items.filter(function (itemActu) {
        if(itemActu.type === "career") {
            return itemActu.system.current.value === true;  
        }
    });
    const competences = fiche.items.filter(function (item) {
        return item.type === "skill";  
    }); 
    competences.sort(function (a, b) {
        if (a.name < b.name)
            return -1;
         if (a.name > b.name)
            return 1;
         // a doit être égal à b
         return 0;
    });
    const tableComps = document.querySelector(".tableComps");
    let caracUtile = 0;
    for(i = 0; i < competences.length; i++) {  
        let compSpe = "";
        switch(competences[i].system.characteristic.value) {
            case "cc":
                caracUtile = caracCC;
                break;
            case "ws":
                caracUtile = caracCC;
                break;
            case "ct":
                caracUtile = caracCT;
                break;
            case "f":
                caracUtile = caracF;
                break;
            case "s":
                caracUtile = caracF;
                break;
            case "e":
                caracUtile = caracE;
                break;
            case "t":
                caracUtile = caracE;
                break;
            case "i":
                caracUtile = caracI;
                break;
            case "ag":
                caracUtile = caracAg;
                break;
            case "dex":
                caracUtile = caracDex;
                break;
            case "int":
                caracUtile = caracInt;
                break;
            case "fm":
                caracUtile = caracFM;
                break;
            case "wp":
                caracUtile = caracFM;
                break;
            case "soc":
                caracUtile = caracSoc;
                break;
            case "fel":
                caracUtile = caracSoc;
                break;
            default:
                caracUtile = 0;
        };
        for(y = 0; y < careerActu[0].system.skills.length; y++) {
            if(careerActu[0].system.skills[y] === competences[i].name) {
                if(competences[i].system.advances.value >= (careerActu[0].system.level.value * 5)) {
                    compSpe = `<i class="fa-solid fa-star fa-2xs"></i> `;
                }else{
                    compSpe = `<i class="fa-regular fa-star fa-2xs"></i> `;
                };
            };
        };
        tableComps.innerHTML += `
        <tr>
            <td class="compName">${compSpe}${competences[i].name}</td>
            <td class="compCaracName">${competences[i].system.characteristic.value}</td>
            <td class="compCaracValue">${caracUtile}</td>
            <td class="compAug">${competences[i].system.advances.value}</td>
            <td class="compActu">${parseInt(caracUtile) + competences[i].system.advances.value}</td>
        </tr>`;
    };

};

function affichageCarriere(fiche) {
    const career = fiche.items.filter(function (item) {
        return item.type === "career";  
    });
    const sectionCareer = document.querySelector(".career");
    console.log(career)

    for(i = 0; i < career.length; i++) {

        let caracsPrincipalesCareer = "<ul>";
        for(y = 0; y < career[i].system.characteristics.length; y++) {
            switch(career[i].system.characteristics[y]) {
                case "ws":
                    caracsPrincipalesCareer += `<li>CC (Capacité de Combat)</li>`;
                    break;
                case "bs":
                    caracsPrincipalesCareer += `<li>CT (Capacité de Tir)</li>`;
                    break;
                case "s":
                    caracsPrincipalesCareer += `<li>Force</li>`;
                    break;
                case "t":
                    caracsPrincipalesCareer += `<li>Endurance</li>`;
                    break;
                case "i":
                    caracsPrincipalesCareer += `<li>Initiative</li>`;
                    break;
                case "ag":
                    caracsPrincipalesCareer += `<li>Agilité</li>`;
                    break;
                case "dex":
                    caracsPrincipalesCareer += `<li>Dextérité</li>`;
                    break;
                case "int":
                    caracsPrincipalesCareer += `<li>Intelligence</li>`;
                    break;
                case "wp":
                    caracsPrincipalesCareer += `<li>FM (Force Mentale)</li>`;
                    break;
                case "fel":
                    caracsPrincipalesCareer += `<li>Sociabilité</li>`;
                    break;
                default:
            };
        };
        caracsPrincipalesCareer += "</ul>";
        let compsPrincipalesCareer = "<ul>";
        for(y = 0; y < career[i].system.skills.length; y++) {
            compsPrincipalesCareer += `<li>${career[i].system.skills[y]}</li>`;
        }
        compsPrincipalesCareer += "</ul>";
        let talentsPrincipalesCareer = "<ul>";
        for(y = 0; y < career[i].system.talents.length; y++) {
            talentsPrincipalesCareer += `<li>${career[i].system.talents[y]}</li>`;
        }
        talentsPrincipalesCareer += "</ul>";
        let valeurStatut = "";
        switch(career[i].system.status.tier) {
            case "b":
                valeurStatut = "Bronze";
                break;
            case "s":
                valeurStatut = "Argent";
                break;
            case "g":
                valeurStatut = "Or";
                break;
            default:
                valeurStatut = "Bronze";
        };
        let careerCurrent = "";
        if(career[i].system.current.value === true) {
            careerCurrent = `<i class="fa-solid fa-check"></i>`;
        }else{
            careerCurrent = `<i class="fa-solid fa-xmark"></i>`;
        }
        let careerComplete = "";
        if(career[i].system.complete.value === true) {
            careerComplete = `<i class="fa-solid fa-check"></i>`;
        }else{
            careerComplete = `<i class="fa-solid fa-xmark"></i>`;
        }
        sectionCareer.innerHTML += `
            <h3><label for="check-${career[i].name}">${career[i].name} ${careerCurrent} ${careerComplete}</label></h3>
            <input type="checkbox" name="check-${career[i].name}" id="check-${career[i].name}">
            <ul class="hidden">
                <li><strong>Actuelle</strong> : ${careerCurrent}</li>
                <li><strong>Terminée</strong> : ${careerComplete}</li>
                <li><strong>Classe</strong> : ${career[i].system.class.value}</li>
                <li><strong>Groupe de carrière</strong> : ${career[i].system.careergroup.value}</li>
                <li><strong>Caractéristiques principales</strong> : ${caracsPrincipalesCareer}</li>
                <li><strong>Compétences principales</strong> : ${compsPrincipalesCareer}</li>
                <li><strong>Talents de carrière</strong> : ${talentsPrincipalesCareer}</li>
                <li><strong>Statut</strong> : ${valeurStatut} ${career[i].system.status.standing}</li>
            </ul>`;
    };
};

async function generationFiche() {
    const namePage = document.querySelector("Title");
    let reponse = null;
    switch(namePage.text) {
        case "Mordiail":
            reponse = await fetch("bdd/fvtt-Actor-mordiail-SJvJdweyMgOJfjOr.json");
            break;
        case "Ferdinand":
            reponse = await fetch("bdd/fvtt-Actor-ferdinand-gruber-VdDotfA5zyWYdtwc.json");
            break;
        default:
            reponse = await fetch("bdd/fvtt-Actor-vierge-HZWbkksL7j1xrxar.json");
    }
    
    const bdd = await reponse.json();

    ficheIdentite(bdd);
    caracCC = tableauCaracs(bdd.system.characteristics.ws, 0, caracCC, bdd, "ws");
    caracCT = tableauCaracs(bdd.system.characteristics.bs, 1, caracCT, bdd, "bs");
    caracF = tableauCaracs(bdd.system.characteristics.s, 2, caracF, bdd, "s");
    caracE = tableauCaracs(bdd.system.characteristics.t, 3, caracE, bdd, "t");
    caracI = tableauCaracs(bdd.system.characteristics.i, 4, caracI, bdd, "i");
    caracAg = tableauCaracs(bdd.system.characteristics.ag, 5, caracAg, bdd, "ag");
    caracDex = tableauCaracs(bdd.system.characteristics.dex, 6, caracDex, bdd, "dex");
    caracInt = tableauCaracs(bdd.system.characteristics.int, 7, caracInt, bdd, "int");
    caracFM = tableauCaracs(bdd.system.characteristics.wp, 8, caracFM, bdd, "wp");
    caracSoc = tableauCaracs(bdd.system.characteristics.fel, 9, caracSoc, bdd, "fel");
    secondaires(bdd);
    afficherCompetences(bdd);

    affichageCarriere(bdd);
};

generationFiche();