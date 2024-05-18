let caracsGlob = [
    {
        "name" : "CC",
        "value" : 0,
        "english" : "ws"
    },
    {
        "name" : "CT",
        "value" : 0,
        "english" : "bs"
    },
    {
        "name" : "F",
        "value" : 0,
        "english" : "s"
    },
    {
        "name" : "E",
        "value" : 0,
        "english" : "t"
    },
    {
        "name" : "I",
        "value" : 0,
        "english" : "i"
    },
    {
        "name" : "Ag",
        "value" : 0,
        "english" : "ag"
    },
    {
        "name" : "Dex",
        "value" : 0,
        "english" : "dex"
    },
    {
        "name" : "Int",
        "value" : 0,
        "english" : "int"
    },
    {
        "name" : "FM",
        "value" : 0,
        "english" : "wp"
    },
    {
        "name" : "Soc",
        "value" : 0,
        "english" : "fel"
    },
];

function ficheIdentite(main, fiche) {
    console.log(main);
    const careerActu = fiche.items.filter(function (itemActu) {
        if(itemActu.type === "career") {
            return itemActu.system.current.value === true;  
        }
    }); 
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
    main.innerHTML += `
        <section class="identite hidden">
            <h3><label for="check-identite"><i class="fa-solid fa-address-card"></i> Identité</label></h3>
            <input type="checkbox" id="check-identite" checked>
            <table class="hidden bg-1">
                <tr>
                    <td colspan="2" class="identityDouble"><span class="tdInterne"><strong>Nom</strong> <span>${fiche.name}</span></span></td>
                    <td colspan="2" class="identityDouble"><span class="tdInterne"><strong>Race</strong> <span>${fiche.system.details.species.value}</span></span></td>
                </tr>
                <tr>
                    <td colspan="2" class="identityDouble"><span class="tdInterne"><strong>Classe</strong> <span>${careerActu[0].system.class.value}</span></span></td>
                    <td colspan="2" class="identityDouble"><span class="tdInterne"><strong>Carrière</strong> <span>${careerActu[0].system.careergroup.value}</span></span></td>
                </tr>
                <tr>
                    <td colspan="2" class="identityDouble"><span class="tdInterne"><strong>Niveau</strong> <span>${careerActu[0].name}</span></span></td>
                    <td colspan="2" class="identityDouble"><span class="tdInterne"><strong>Statut</strong> <span>${valeurStatut} ${careerActu[0].system.status.standing}</span></span></td>
                </tr>
                <tr>
                    <td class="identitySingle"><span class="tdInterne"><strong>Âge</strong> <span>${fiche.system.details.age.value}</span></span></td>
                    <td class="identitySingle"><span class="tdInterne"><strong>Taille</strong> <span>${fiche.system.details.height.value}</span></span></td>
                    <td class="identitySingle"><span class="tdInterne"><strong>Cheveux</strong> <span>${fiche.system.details.haircolour.value}</span></span></td>
                    <td class="identitySingle"><span class="tdInterne"><strong>Yeux</strong> <span>${fiche.system.details.eyecolour.value}</span></span></td>
                </tr>
                <tr>
                    <td colspan="4" class="identityAll"><strong>Biographie</strong> : ${fiche.system.details.biography.value}</td>
                </tr>
            </table>
        </section>`;
};

function ficheNavigation(main) {
    main.innerHTML += `
    <section>
        <nav>
            <h2 class="check-section-caracs"><label for="check-section-caracs">Général</label></h2>
            <h2 class="check-section-comps"><label for="check-section-comps">Compétences</label></h2>
            <h2 class="check-section-talents"><label for="check-section-talents">Talents</label></h2>
            <h2 class="check-section-combat"><label for="check-section-combat">Combat</label></h2>
            <h2 class="check-section-inventory"><label for="check-section-inventory">Inventaire</label></h2>
            <h2 class="spells check-section-sorts"><label for="check-section-sorts">Sorts</label></h2>
            <h2 class="check-section-career"><label for="check-section-career">Carrière</label></h2>
        </nav>
    </section>`;
};

function majCaracGlob(fiche) {
    const chemins = [
        fiche.system.characteristics.ws,
        fiche.system.characteristics.bs,
        fiche.system.characteristics.s,
        fiche.system.characteristics.t,
        fiche.system.characteristics.i,
        fiche.system.characteristics.ag,
        fiche.system.characteristics.dex,
        fiche.system.characteristics.int,
        fiche.system.characteristics.wp,
        fiche.system.characteristics.fel
    ];
    let modifier = 0;
    
    for (let i = 0; i < chemins.length; i++) {
        if(localStorage.getItem(caracsGlob[i].name) !== null) {
            modifier = localStorage.getItem(caracsGlob[i].name);
        }else{
            modifier = 0;
        };
        caracsGlob[i].value = chemins[i].initial + chemins[i].advances + parseInt(modifier);
    };
};

function genereTRcarac(caracFR, caracBDD, fiche, caracEN, index, indexBG) {
    let caracSpe = "";
    let modifier = 0;
    if(localStorage.getItem(caracFR) !== null) {
        modifier = localStorage.getItem(caracFR);
    };
    const careerActu = fiche.items.filter(function (itemActu) {
        if(itemActu.type === "career") {
            return itemActu.system.current.value === true;  
        }
    });
    for(i = 0; i < careerActu[0].system.characteristics.length; i++) {
        if(careerActu[0].system.characteristics[i] === caracEN) {
            if(caracBDD.advances >= (careerActu[0].system.level.value * 5)) {
                caracSpe = ` <i class="fa-solid fa-star fa-2xs"></i>`;
            }else{
                caracSpe = ` <i class="fa-regular fa-star fa-2xs"></i>`;
            };
        };
    };
    let html = `
        <tr class="bg-${indexBG}">
            <th>${caracFR}${caracSpe}</th>
            <td>${caracBDD.initial}</td>
            <td>${caracBDD.advances}</td>
            <td><input type="number" name="${caracFR}" class="caracModifier" value="${modifier}"></td>
            <td><input type="number" name="${caracFR}" class="caracActuelle" value="${caracsGlob[index].value}" disabled></td>
        </tr>`;
    return html;
};

function genereAutreCaracs(fiche) {
    html = `
        <table>
            <caption>Destin et Résilience</caption>
            <tr>
                <td>Chance</td>
                <td><input type="number" name="fortune" id="fortune" class="fortune" value="${fiche.system.status.fortune.value}"></td>
                <td>Détermination</td>
                <td><input type="number" name="resolve" id="resolve" class="resolve" value="${fiche.system.status.resolve.value}"></td>
            </tr>
            <tr>
                <td>Destin</td>
                <td><input type="number" name="fate" id="fate" class="fate" value="${fiche.system.status.fate.value}"></td>
                <td>Résilience</td>
                <td><input type="number" name="resilience" id="resilience" class="resilience" value="${fiche.system.status.resilience.value}"></td>
            </tr>
        </table>
        <table class="XPandMouv">
            <caption>Expérience</caption>
            <tr>
                <td>Actuelle</td>
                <td>Dépensée</td>
                <td>Totale</td>
            </tr>
            <tr>
                <td><input type="number" name="xpActuelle" id="xpActuelle" class="xpActuelle" value="${fiche.system.details.experience.total - fiche.system.details.experience.spent}" disabled></td>
                <td><input type="number" name="spent" id="spent" class="spent" value="${fiche.system.details.experience.spent}" disabled></td>
                <td><input type="number" name="xpTotal" id="xpTotal" class="xpTotal" value="${fiche.system.details.experience.total}"></td>
            </tr>
        </table>
        <table class="XPandMouv">
            <caption>Mouvement</caption>
            <tr>
                <td><input type="number" name="move" id="move" class="move" value="${fiche.system.details.move.value}"></td>
                <td><input type="text" name="marche" id="marche" class="marche" value="${fiche.system.details.move.value * 2 + " m."}" disabled></td>
                <td><input type="text" name="run" id="run" class="run" value="${fiche.system.details.move.value * 4 + " m."}" disabled></td>
            </tr>
            <tr>
                <td>Mouvement</td>
                <td>Marche</td>
                <td>Course</td>
            </tr>
        </table>
        <table>
            <caption>Corruption</caption>
            <tr>
                <td>Corruption</td>
            </tr>
            <tr>
                <td><input type="number" name="corruptionActuelle" id="corruptionActuelle" class="corruptionActuelle" value="${fiche.system.status.corruption.value}"> / <input type="number" name="corruption" id="corruption" class="corruption" value="${Math.floor((fiche.system.characteristics.t.initial + fiche.system.characteristics.t.modifier + fiche.system.characteristics.t.advances + fiche.system.characteristics.t.bonusMod + fiche.system.characteristics.wp.initial + fiche.system.characteristics.wp.modifier + fiche.system.characteristics.wp.advances + fiche.system.characteristics.wp.bonusMod)/10)}" disabled></td>
            </tr>
            <tr>
                <td>Mutations</td>
            </tr>
            <tr>
                <td><textarea name="mutations" id="mutations"></textarea></td>
            </tr>
        </table>`;
        return html;
};

function ficheGeneral(main, fiche) {
    majCaracGlob(fiche);
    const chemins = [
        fiche.system.characteristics.ws,
        fiche.system.characteristics.bs,
        fiche.system.characteristics.s,
        fiche.system.characteristics.t,
        fiche.system.characteristics.i,
        fiche.system.characteristics.ag,
        fiche.system.characteristics.dex,
        fiche.system.characteristics.int,
        fiche.system.characteristics.wp,
        fiche.system.characteristics.fel
    ];
    let tr ="";
    let index = 0;
    for (let i = 0; i < chemins.length; i++) {
        switch (index) {
        case 0:
            index = 1;
            break;
    
        default:
            index = 0;
            break;
    };
        tr += genereTRcarac(caracsGlob[i].name, chemins[i], fiche, caracsGlob[i].english, i, index);
    }

    main.innerHTML += `
        <input type="checkbox" name="check-section-caracs" id="check-section-caracs" class="check-section check-section-caracs" checked>
        <section class="caracteristiques hidden">
            <h3><label for="check-caracs"><span class="check-caracs"><i class="fa-solid fa-eye"></i></span> Caractéristiques</label></h3>
            <input type="checkbox" name="check-caracs" id="check-caracs" class="check-eye" checked>
            <table class="hidden">
                <tr>
                    <th></th>
                    <th>Initial</th>
                    <th>Augment.</th>
                    <th>Modif.</th>
                    <th>Actuelle</th>
                </tr>
                    ${tr}
            </table>
            <h3><label for="check-secondaires"><span class="check-secondaires"><i class="fa-solid fa-eye"></i></span> Secondaires</label></h3>
            <input type="checkbox" name="check-secondaires" id="check-secondaires" class="check-eye" checked>
            <div class="hidden">
                ${genereAutreCaracs(fiche)}
            </div>
        </section>`;
};

function genereAllComps(fiche) {
    majCaracGlob(fiche);
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
    let tableComps = "";
    let caracUtile = 0;
    let index = 0;
    for(i = 0; i < competences.length; i++) {  
        switch (index) {
            case 0:
                index = 1;
                break;
        
            default:
                index = 0;
                break;
        };
        let compSpe = "";
        switch(competences[i].system.characteristic.value) {
            case "cc":
                caracUtile = caracsGlob[0].value;
                break;
            case "ws":
                caracUtile = caracsGlob[0].value;
                break;
            case "ct":
                caracUtile = caracsGlob[1].value;
                break;
            case "f":
                caracUtile = caracsGlob[2].value;
                break;
            case "s":
                caracUtile = caracsGlob[2].value;
                break;
            case "e":
                caracUtile = caracsGlob[3].value;
                break;
            case "t":
                caracUtile = caracsGlob[3].value;
                break;
            case "i":
                caracUtile = caracsGlob[4].value;
                break;
            case "ag":
                caracUtile = caracsGlob[5].value;
                break;
            case "dex":
                caracUtile = caracsGlob[6].value;
                break;
            case "int":
                caracUtile = caracsGlob[7].value;
                break;
            case "fm":
                caracUtile = caracsGlob[8].value;
                break;
            case "wp":
                caracUtile = caracsGlob[8].value;
                break;
            case "soc":
                caracUtile = caracsGlob[9].value;
                break;
            case "fel":
                caracUtile = caracsGlob[9].value;
                break;
            default:
                caracUtile = 0;
        };
        for(y = 0; y < careerActu[0].system.skills.length; y++) {
            //compSpe = ``;
            if(careerActu[0].system.skills[y] === competences[i].name) {
                if(competences[i].system.advances.value >= (careerActu[0].system.level.value * 5)) {
                    compSpe = `<i class="fa-solid fa-star fa-2xs"></i> `;
                }else{
                    compSpe = `<i class="fa-regular fa-star fa-2xs"></i> `;
                };
            };
        };
        tableComps += `
        <tr class="bg-${index}">
            <td class="compName">${compSpe}${competences[i].name}</td>
            <td class="compCaracName">${competences[i].system.characteristic.value}</td>
            <td class="compCaracValue">${caracUtile}</td>
            <td class="compAug">${competences[i].system.advances.value}</td>
            <td class="compActu">${parseInt(caracUtile) + competences[i].system.advances.value}</td>
        </tr>`;
    };
    return tableComps;
};

function ficheComps(main, fiche) {
    main.innerHTML += `
        <input type="checkbox" name="check-section-comps" id="check-section-comps" class="check-section check-section-comps">
        <section class="competences hidden">
            <h3><label for="check-comp"><span class="check-comp"><i class="fa-solid fa-eye"></i></span> Compétences</label></h3>
            <input type="checkbox" name="check-comp" id="check-comp" class="check-eye" checked>
            <table class="tableComps hidden">
                <tr>
                    <th>Nom</th>
                    <th colspan="2">Caractéristique</th>
                    <th>Aug</th>
                    <th>Comp</th>
                </tr>
                ${genereAllComps(fiche)}
            </table>
        </section>`;
};

function genereCareer(fiche) {
    let sectionCareer = "";
    const career = fiche.items.filter(function (item) {
        return item.type === "career";  
    });
    career.sort(function (a, b) {
        if (a.system.level.value < b.system.level.value)
            return 1;
         if (a.name > b.name)
            return -1;
         // a doit être égal à b
         return 0;
    });
    for(i = 0; i < career.length; i++) {
        let caracsPrincipalesCareer = `<ul class="fa-ul">`;
        for(y = 0; y < career[i].system.characteristics.length; y++) {
            caracsPrincipalesCareer += `<li><span class="fa-li"><i class="fa-regular fa-hand-point-right"></i></span>`;
            switch(career[i].system.characteristics[y]) {
                case "ws":
                    caracsPrincipalesCareer += `CC (Capacité de Combat)`;
                    break;
                case "bs":
                    caracsPrincipalesCareer += `CT (Capacité de Tir)`;
                    break;
                case "s":
                    caracsPrincipalesCareer += `Force`;
                    break;
                case "t":
                    caracsPrincipalesCareer += `Endurance`;
                    break;
                case "i":
                    caracsPrincipalesCareer += `Initiative`;
                    break;
                case "ag":
                    caracsPrincipalesCareer += `Agilité`;
                    break;
                case "dex":
                    caracsPrincipalesCareer += `Dextérité`;
                    break;
                case "int":
                    caracsPrincipalesCareer += `Intelligence`;
                    break;
                case "wp":
                    caracsPrincipalesCareer += `FM (Force Mentale)`;
                    break;
                case "fel":
                    caracsPrincipalesCareer += `Sociabilité`;
                    break;
                default:
            };
            caracsPrincipalesCareer += `</li>`;
        };
        caracsPrincipalesCareer += `</ul>`;
        let compsPrincipalesCareer = `<ul class="fa-ul">`;
        for(y = 0; y < career[i].system.skills.length; y++) {
            compsPrincipalesCareer += `<li><span class="fa-li"><i class="fa-regular fa-hand-point-right"></i></span>${career[i].system.skills[y]}</li>`;
        }
        compsPrincipalesCareer += "</ul>";
        let talentsPrincipalesCareer = `<ul class="fa-ul">`;
        for(y = 0; y < career[i].system.talents.length; y++) {
            talentsPrincipalesCareer += `<li><span class="fa-li"><i class="fa-regular fa-hand-point-right"></i></span>${career[i].system.talents[y]}</li>`;
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
        };
        sectionCareer += `
            <li><h3><label for="check-${career[i].name}"> ${career[i].system.careergroup.value} ${career[i].system.level.value} - ${career[i].name} ${careerCurrent}</label></h3></li>
            <input type="checkbox" name="check-${career[i].name}" id="check-${career[i].name}">
            <ul class="hidden border bg-1">
                <li><strong>Actuelle</strong> : ${careerCurrent}</li>
                <li><strong>Terminée</strong> : ${careerComplete}</li>
                <li><strong>Classe</strong> : ${career[i].system.class.value}</li>
                <li><strong>Groupe de carrière</strong> : ${career[i].system.careergroup.value}</li>
                <li><strong>Niveau de carrière</strong> : ${career[i].system.level.value}</li>
                <li><strong>Caractéristiques principales</strong> : ${caracsPrincipalesCareer}</li>
                <li><strong>Compétences principales</strong> : ${compsPrincipalesCareer}</li>
                <li><strong>Talents de carrière</strong> : ${talentsPrincipalesCareer}</li>
                <li><strong>Statut</strong> : ${valeurStatut} ${career[i].system.status.standing}</li>
            </ul>`;
    };
    return sectionCareer;
};

function ficheCarriere(main, fiche) {
    main.innerHTML += `
        <input type="checkbox" name="check-section-career" id="check-section-career" class="check-section check-section-career">
        <section class="career hidden">
            <ol reversed>
            ${genereCareer(fiche)}
            </ol>
        </section>`;
};

function genereTalents(fiche) {
    const talentsList = fiche.items.filter(function (item) {
        return item.type === "talent";  
    }); 
    talentsList.sort(function (a, b) {
        if (a.name < b.name)
            return -1;
         if (a.name > b.name)
            return 1;
         // a doit être égal à b
         return 0;
    });
    let talents = "";
    let descTalent = "";
    let index = 0;
    for (let i = 0; i < talentsList.length; i++) {
        let valeurMax = 0;
        switch (talentsList[i].system.max.value) {
            case caracsGlob[0].english:
                valeurMax = Math.floor(caracsGlob[0].value / 10);
                break;
            case caracsGlob[1].english:
                valeurMax = Math.floor(caracsGlob[1].value / 10);
                break;
            case caracsGlob[2].english:
                valeurMax = Math.floor(caracsGlob[2].value / 10);
                break;
            case caracsGlob[3].english:
                valeurMax = Math.floor(caracsGlob[3].value / 10);
                break;
            case caracsGlob[4].english:
                valeurMax = Math.floor(caracsGlob[4].value / 10);
                break;
            case caracsGlob[5].english:
                valeurMax = Math.floor(caracsGlob[5].value / 10);
                break;
            case caracsGlob[6].english:
                valeurMax = Math.floor(caracsGlob[6].value / 10);
                break;
            case caracsGlob[7].english:
                valeurMax = Math.floor(caracsGlob[7].value / 10);
                break;
            case caracsGlob[8].english:
                valeurMax = Math.floor(caracsGlob[8].value / 10);
                break;
            case caracsGlob[9].english:
                valeurMax = Math.floor(caracsGlob[9].value / 10);
                break;
        
            default:
                valeurMax = talentsList[i].system.max.value;
                break;
        };
        switch (index) {
            case 0:
                index = 1;
                break;
        
            default:
                index = 0;
                break;
        };
        talents += `
        <tr class="bg-${index}">
            <td class="thTalentsName"><label for="check-${talentsList[i].name}">${talentsList[i].name}</label></td>
            <td class="thTalentsLevel"><label for="check-${talentsList[i].name}">${talentsList[i].system.advances.value} / ${valeurMax}</label></td>
            <td class="thTalentsTest"><label for="check-${talentsList[i].name}">${talentsList[i].system.tests.value}</label></td>
        </tr>`;
        descTalent += `
        <input type="checkbox" name="check-${talentsList[i].name}" id="check-${talentsList[i].name}">
        <div class="hidden ul-border bg-${index}">
            <h4><label for="check-${talentsList[i].name}"><strong>${talentsList[i].name}</strong></label></h4>
            ${talentsList[i].system.description.value}
        </div>`;  
    }
    return [talents, descTalent];
};

function ficheTalents(main, fiche) {
    main.innerHTML += `
        <input type="checkbox" name="check-section-talents" id="check-section-talents" class="check-section check-section-talents">
        <section class="hidden">
            <h3><label for="check-talents"><span class="check-talents"><i class="fa-solid fa-eye"></i></span> Talents</label></h3>
            <input type="checkbox" name="check-talents" id="check-talents" class="check-eye" checked>
            <table class="tableTalents hidden">
                <tr>
                    <th class="thTalentsName">Nom</th>
                    <th class="thTalentsLevel">Niveau</th>
                    <th class="thTalentsTest">Tests</th>
                </tr>
                ${genereTalents(fiche)[0]}
            </table>
            ${genereTalents(fiche)[1]}
        </section>`;
};

function genereSpells(fiche) {
    const spellsList = fiche.items.filter(function (item) {
        return item.type === "spell";  
    }); 
    const spellsListMinor = spellsList.filter(function (item) {
        return item.system.lore.value === "petty";
    });
    const spellsListMajor = spellsList.filter(function (item) {
        return item.system.lore.value !== "petty";
    });
    let spellMinor = "";
    let spellMajor = "";
    if (spellsListMinor.length > 0) {
        console.log(spellsList)

        spellMinor = `<h3><label for="check-spellsMinor"><span class="check-spellsMinor"><i class="fa-solid fa-eye"></i></span> Sorts Mineurs : </label></h3>
        <input type="checkbox" name="check-spellsMinor" id="check-spellsMinor" class="check-eye" checked>
        <ul class="hidden">`;
        for (let i = 0; i < spellsListMinor.length; i++) {
            
            spellMinor += `
            <li><h4><label for="check-${spellsListMinor[i].name}">${spellsListMinor[i].name}</label></h4></li>
            <input type="checkbox" name="check-${spellsListMinor[i].name}" id="check-${spellsListMinor[i].name}">
            <ul class="hidden border bg-1">
                <li><strong>NI</strong> :  ${spellsListMinor[i].system.cn.value}</li>
                <li><strong>Portée</strong> : ${spellsListMinor[i].system.range.value}</li>
                <li><strong>Cible</strong> : ${spellsListMinor[i].system.target.value}</li>
                <li><strong>Durée</strong> : ${spellsListMinor[i].system.duration.value}</li>
                <li>${spellsListMinor[i].system.description.value}</li>
            </ul>`;   
        }
        spellMinor += `</ul>`;
    }else{
        spellMinor = "Sale moldu !";
    };
    if (spellsListMajor.length > 0) {

        spellMajor = `<h3><label for="check-spellsMajor"><span class="check-spellsMajor"><i class="fa-solid fa-eye"></i></span> Sorts Majeurs : </label></h3>
        <input type="checkbox" name="check-spellsMajor" id="check-spellsMajor" class="check-eye" checked>
        <ul class="hidden">`;
        for (let i = 0; i < spellsListMajor.length; i++) {
            
            spellMajor += `
            <li><h4><label for="check-${spellsListMajor[i].name}">${spellsListMajor[i].name}</label></h4></li>
            <input type="checkbox" name="check-${spellsListMajor[i].name}" id="check-${spellsListMajor[i].name}">
            <ul class="hidden border bg-1">
                <li><strong>NI</strong> :  ${spellsListMajor[i].system.cn.value}</li>
                <li><strong>Portée</strong> : ${spellsListMajor[i].system.range.value}</li>
                <li><strong>Cible</strong> : ${spellsListMajor[i].system.target.value}</li>
                <li><strong>Durée</strong> : ${spellsListMajor[i].system.duration.value}</li>
                <li>${spellsListMajor[i].system.description.value}</li>
            </ul>`;   
        }
        spellMajor += `</ul>`;
    }else{
        spellMajor = "";
    };
    
    return [spellMinor, spellMajor];
}

function ficheSpells(main, fiche) {
    const spellsList = fiche.items.filter(function (item) {
        return item.type === "spell";  
    }); 
    let labelHidden = document.querySelector(".spells");
    if (spellsList.length < 1) {
        labelHidden.classList.add("hidden");
    }
    
    main.innerHTML += `
    <input type="checkbox" name="check-section-sorts" id="check-section-sorts" class="check-section check-section-sorts">
    <section class="hidden">
        ${genereSpells(fiche)[0]}
        ${genereSpells(fiche)[1]}
    </section>`;
};

function navigation() {
    let checksLabels = document.querySelectorAll(".check-section")
    for (let i = 0; i < checksLabels.length; i++) {
        checksLabels[i].addEventListener("click", function (e) {
            let labels = document.querySelectorAll("h2");
            let labelAttache = document.querySelector(`.${e.target.id}`);
            for (let i = 0; i < labels.length; i++) {
                labels[i].style.backgroundColor = "rgba(0,0,0,0)";
                labels[i].style.color = "black";
                labels[i].style.border = "1px solid black";
            }
            labelAttache.style.backgroundColor = "black";
            labelAttache.style.color = "aliceblue";
            labelAttache.style.border = "1px solid grey";

            for (let i = 0; i < checksLabels.length; i++) {
                checksLabels[i].checked = false;     
            };
            e.target.checked = true;
        });
        
    }
};

function genereInventory(fiche, name, type) {
    const groupe = fiche.items.filter(function (item) {
        return item.type === `${type}`;
    })

    if (groupe.length > 0) {
        let tr = "";
        let index = 0;
        for (let i = 0; i < groupe.length; i++) {
            switch (index) {
                case 0:
                    index = 1;
                    break;
                default:
                    index = 0;
                    break;
            };
            tr += `
            <tr class="bg-${index}">
                <td class="inventoryType">${groupe[i].name}</td>
                <td class="inventoryQu">${groupe[i].system.quantity.value}</td>
                <td class="inventoryEnc">${groupe[i].system.encumbrance.value}</td>
            </tr>`;
        }
        let corps = `
        <h3><label for="check-${type}"><span class="check-${type}"><i class="fa-solid fa-eye"></i></span> ${name}</label></h3>
        <input type="checkbox" name="check-${type}" id="check-${type}" class="check-eye" checked>
        <table class="hidden inventory">
            <tr>
                <th class="inventoryType">${name}</th>
                <th class="inventoryQu">Qu.</th>
                <th class="inventoryEnc">Enc.</th>
            </tr>
            ${tr}
        </table>`;
        return corps;
    }

    return "";
}

function ficheInventaire(main, fiche) {
    const inventaires = [
        {
            "name" : "Monaies",
            "type" : "money"
        },
        {
            "name" : "Armes",
            "type" : "weapon"
        },
        {
            "name" : "Armures",
            "type" : "armour"
        },
        {
            "name" : "Inventaire",
            "type" : "trapping"
        },
        {
            "name" : "Sacs et contenants",
            "type" : "container"
        }
    ];
    let corps = "";
    for (let i = 0; i < inventaires.length; i++) {
        corps += genereInventory(fiche, inventaires[i].name, inventaires[i].type);
    }
    main.innerHTML += `
        <input type="checkbox" name="check-section-inventory" id="check-section-inventory" class="check-section check-section-inventory">
        <section class="hidden">
            ${corps}
        </section>`
}

function detailsArmes(value, i) {
    let eyeBegin = "";
    let eyeEnd = "";
    if (value !== "") {
        eyeBegin = `<label for="check-arme${i}"><span class="check-arme${i}"><i class="fa-solid fa-eye-slash"></i> </span>`;
        eyeEnd = `</label>`
    }
    return [eyeBegin, eyeEnd];
}

function tradGroupeArmes(value) {
    let groupe = "";
    switch (value) {
        case "basic":
            groupe = "Base"
            break;
        case "cavalry":
            groupe = "Cavalerie"
            break;
        case "fencing":
            groupe = "Escrime"
            break;
        case "brawling":
            groupe = "Bagarre"
            break;
        case "flail":
            groupe = "Fléau"
            break;
        case "parry":
            groupe = "Parade"
            break;
        case "polearm":
            groupe = "Armes d'Hast"
            break;
        case "two-handed":
            groupe = "Deux-mains"
            break;
        case "blackpowder":
            groupe = "Poudre Noire"
            break;
        case "bow":
            groupe = "Arc"
            break;
        case "crossbow":
            groupe = "Arbalète"
            break;
        case "engineering":
            groupe = "Ingénierie"
            break;
        case "entangling":
            groupe = "Entraves"
            break;
        case "explosives":
            groupe = "Explosifs"
            break;
        case "sling":
            groupe = "Fronde"
            break;
        case "throwing":
            groupe = "Lancer"
            break;
        default:
            break;
    };
    return groupe;
};

function tradAtoutsArmes(qualities) {
    let atout = "";
    switch (qualities.name) {
        case "accurate":
            atout = "pointue";
            break;
        case "blackpowder":
            atout = "à poudre noire";
            break;
        case "blast":
            atout = `explosion ${qualities.value}`;
            break;
        case "damaging":
            atout = "dévastatrice";
            break;
        case "defensive":
            atout = "défensive";
            break;
        case "distract":
            atout = "perturbante";
            break;
        case "entangle":
            atout = "immobilisante";
            break;
        case "fast":
            atout = "rapide";
            break;
        case "hack":
            atout = "taille";
            break;
        case "impact":
            atout = "percutante";
            break;
        case "impale":
            atout = "empaleuse";
            break;
        case "penetrating":
            atout = "perforante";
            break;
        case "pistol":
            atout = "pistolet";
            break;
        case "precise":
            atout = "précise";
            break;
        case "pummel":
            atout = "assomante";
            break;
        case "repeater":
            atout = `répétition  ${qualities.value}`;
            break;
        case "shield":
            atout = `protectrice ${qualities.value}`;
            break;
        case "trapblade":
            atout = "piège-lame";
            break;
        case "unbreakable":
            atout = "incassable";
            break;
        case "wrap":
            atout = "enroulement";
            break;
        default:
            atout = "cf.LDB";
            break;
    };
    return atout;
};

function tradDefautsArmes(flaws) {
    let defaut = "";
    switch (flaws.name) {
        case "dangerous":
            defaut = "dangereuse";
            break;
        case "imprecise":
            defaut = "imprécise";
            break;
        case "reload":
            defaut = `recharge ${flaws.value}`;
            break;
        case "slow":
            defaut = "lente";
            break;
        case "tiring":
            defaut = "épuisante";
            break;
        case "undamaging":
            defaut = "inoffensive";
            break;
        default:
            defaut = "cf.LDB";
            break;
    };
    return defaut;
};

function AtoutsDefautsArmes(qualities, flaws, index) {
    let atouts = "";
    if (qualities.length > 0) {
        atouts = `
            <tr class="bg-${index}">
                <td colspan="5"><strong>Atouts</strong> : `;
        for (let y = 0; y < qualities.length; y++) {
            if(y > 0) {
                atouts += `, `;
            }
            atouts += `${tradAtoutsArmes(qualities[y])}`;
        }
        atouts += `
                </td>
            </tr>`
    };
    let defauts = "";
    if (flaws.length > 0) {
        defauts = `
            <tr class="bg-${index}">
                <td colspan="5"><strong>Défauts</strong> : `;
        for (let y = 0; y < flaws.length; y++) {
            if(y > 0) {
                defauts += `, `;
            }
            defauts += `${tradDefautsArmes(flaws[y])} `;
        }
        defauts += `
                </td>
            </tr>`
    };
    return [atouts, defauts];
};

function tradPorteeArmes(range) {
    let portee = "";
    if (range.reach.value !== "") {
        switch (range.reach.value) {
            case "personal":
                portee = "Personnelle";
                break;
            case "vshort":
                portee = "Très courte";
                break;
            case "short":
                portee = "Courte";
                break;
            case "average":
                portee = "Moyenne";
                break;
            case "long":
                portee = "Longue";
                break;
            case "vLong":
                portee = "Très longue";
                break;
            case "massive":
                portee = "Considérable";
                break;
        
            default:
                portee = range.reach.value;
                break;
        };
    }else{
        if(range.range.value[0] === "S") {
            if(range.range.value.length !== 2) {
                portee = `BFx${range.range.value[3]}`;
            }else{
                portee = `BF`;
            }
        }else{
            portee = range.range.value;
        };
    };
    return portee;
};

function genereArmes(fiche) {
    const armes = fiche.items.filter(function (item) {
        return item.type === "weapon";
    })
    console.log(armes)

    let arme1 = "";
    let arme2 = "";
    let index = 0;
    for (let i = 0; i < armes.length; i++) {
        switch (index) {
            case 0:
                index = 1;
                break;
            default:
                index = 0;
                break;
        }
        const [eyeBegin, eyeEnd] = detailsArmes(armes[i].system.special.value, i);
        const groupe = tradGroupeArmes(armes[i].system.weaponGroup.value);
        const [atouts, defauts] = AtoutsDefautsArmes(armes[i].system.qualities.value, armes[i].system.flaws.value, index);
        const reach = tradPorteeArmes(armes[i].system);

        console.log(armes[i].system.damage.value[0] + armes[i].system.damage.value[1])
        let damage = "";
        if (armes[i].system.damage.value[0] === "S") {
            damage = `BF+${armes[i].system.damage.value[3]}`
        }else {
            if(armes[i].system.damage.value[0] === "+" && armes[i].system.damage.value[1] === "S") {
                if(armes[i].system.damage.value[3] === "+") {
                    damage = `BF+${armes[i].system.damage.value[4]}`;
                }else{
                    damage = `BF`;
                }
            }else{
                damage = armes[i].system.damage.value;
            }
        }

        
        arme1 += `
            <tr class="bg-${index}">
                <td>${eyeBegin}${armes[i].name}${eyeEnd}</td>
                <td>${groupe}</td>
                <td>${armes[i].system.encumbrance.value}</td>
                <td>${reach}</td>
                <td>${damage}</td>
            </tr>
            ${atouts}
            ${defauts}`
        arme2 += `
            <input type="checkbox" name="check-arme${i}" id="check-arme${i}" class="check-eye">
            <div class="hidden bg-${index}">
                <p>${armes[i].name} : ${armes[i].system.special.value}</p>
            </div>`;
    }

    let html1 = `
        <h3><label for="check-armes"><span class="check-armes"><i class="fa-solid fa-eye"></i></span> Armes</label></h3>
        <input type="checkbox" name="check-armes" id="check-armes" class="check-eye" checked>
        <table class="hidden inventory">
            <tr>
                <th>Nom</th>
                <th>Groupe</th>
                <th>Enc</th>
                <th>Portée/allonge</th>
                <th>Dégâts</th>
            </tr>
            ${arme1}
        </table>`;

    //let html2 = `${arme2}`;
    return [html1, arme2]
}

function ficheCombat(main, fiche) {
    // weapon, armour, ammunition
    main.innerHTML += `
        <input type="checkbox" name="check-section-combat" id="check-section-combat" class="check-section check-section-combat">
        <section class="hidden">
            ${genereArmes(fiche)[0]}
            ${genereArmes(fiche)[1]}
        </section>`;
}

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
        case "Adolf":
            reponse = await fetch("bdd/fvtt-Actor-adolf-NQJjYxSJmx8gECLx.json");
            break;
        default:
            reponse = await fetch("bdd/fvtt-Actor-vierge-HZWbkksL7j1xrxar.json");
    }
    const bdd = await reponse.json();
    console.log(bdd)
    let main = document.querySelector("main");
    
    ficheIdentite(main, bdd);
    ficheNavigation(main);
    ficheGeneral(main, bdd);
    ficheComps(main, bdd);
    ficheTalents(main, bdd);
    ficheCombat(main, bdd);
    ficheInventaire(main, bdd);
    ficheSpells(main, bdd);
    ficheCarriere(main, bdd);


    navigation();

    const inputCheckbox = document.querySelectorAll(`.check-eye`);
    for (let i = 0; i < inputCheckbox.length; i++) {
        inputCheckbox[i].addEventListener("change", function (e) {
            let spanEye = document.querySelector(`.${e.target.id}`);
            if(e.target.checked === true) {
                spanEye.innerHTML = `<i class="fa-solid fa-eye"></i>`;
            }else{
                spanEye.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
            };
        });
    };
    
    let modifier = document.querySelectorAll(".caracModifier");
    for(i = 0; i < modifier.length; i++) {
        modifier[i].addEventListener("change", function (e) {
            //caracsGlob["CC"].value = majCaracGlob(bdd.system.characteristics.ws, parseInt(e.target.value));
            /*let total = document.querySelectorAll(".caracActuelle");
            localStorage.setItem(e.target.name, e.target.value);
            for(i = 0; i < total.length; i++) {
                if (total[i].name === "CC" && total[i].name === e.target.name) {
                    total[i].value = bdd.system.characteristics.ws.initial + bdd.system.characteristics.ws.advances + parseInt(e.target.value);
                };
                if (total[i].name === "CT" && total[i].name === e.target.name) {
                    total[i].value = bdd.system.characteristics.bs.initial + bdd.system.characteristics.bs.advances + parseInt(e.target.value);
                };
                if (total[i].name === "F" && total[i].name === e.target.name) {
                    total[i].value = bdd.system.characteristics.s.initial + bdd.system.characteristics.s.advances + parseInt(e.target.value);
                };
                if (total[i].name === "E" && total[i].name === e.target.name) {
                    total[i].value = bdd.system.characteristics.t.initial + bdd.system.characteristics.t.advances + parseInt(e.target.value);
                };
                if (total[i].name === "I" && total[i].name === e.target.name) {
                    total[i].value = bdd.system.characteristics.i.initial + bdd.system.characteristics.i.advances + parseInt(e.target.value);
                };
                if (total[i].name === "Ag" && total[i].name === e.target.name) {
                    total[i].value = bdd.system.characteristics.ag.initial + bdd.system.characteristics.ag.advances + parseInt(e.target.value);
                };
                if (total[i].name === "Dex" && total[i].name === e.target.name) {
                    total[i].value = bdd.system.characteristics.dex.initial + bdd.system.characteristics.dex.advances + parseInt(e.target.value);
                };
                if (total[i].name === "Int" && total[i].name === e.target.name) {
                    total[i].value = bdd.system.characteristics.int.initial + bdd.system.characteristics.int.advances + parseInt(e.target.value);
                };
                if (total[i].name === "FM" && total[i].name === e.target.name) {
                    total[i].value = bdd.system.characteristics.wp.initial + bdd.system.characteristics.ws.advances + parseInt(e.target.value);
                };
                if (total[i].name === "Soc" && total[i].name === e.target.name) {
                    total[i].value = bdd.system.characteristics.fel.initial + bdd.system.characteristics.fel.advances + parseInt(e.target.value);
                };
            };*/
            localStorage.setItem(e.target.name, e.target.value);
            majCaracGlob(bdd);
            location.reload();
        });
    };
    console.log(localStorage);

};

generationFiche();