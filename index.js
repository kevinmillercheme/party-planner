const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2601-FTB-CT-WEB-PT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// State Variables

let parties = [];
let selectedParty;

async function getParties() {
    const partyResponse = await fetch(API);
    const partyJSON = await partyResponse.json();

    parties = partyJSON.data;

    try {
        render();
    } catch (error) {
        console.error(error);
    }
        
    return parties;
}

async function getParty(id) {
    let selectedPartyResponse = await fetch(`${API}/${id}`);
    const selectedPartyJSON = await selectedPartyResponse.json();

    selectedParty = selectedPartyJSON.data;

    try {
        render();
    } catch (error) {
        console.error(error);
    }

    return selectedParty;
}

function partyListItem(party) {
    const li = document.createElement('li');

    li.innerHTML = `<a href=#selected>${party.name}</a>`;

    li.addEventListener('click', () => {
        try {
        getParty(party.id);
        } catch (error) {
            console.error(error);
        }
    });

    return li
}

function partyList() {
    const ul = document.createElement('ul');
    ul.classList.add('lineup');

    const partyListItemsMap = parties.map((party) => partyListItem(party));

    ul.replaceChildren(...partyListItemsMap);

    return ul;
}

function partyDetails() {
    if (!selectedParty) {
        const $p = document.createElement("p");
        $p.textContent = "Select a party to see details.";
        return $p;
    }

    const section = document.createElement('section');

    section.innerHTML = `
        <section class="party">
            <h2>${selectedParty.name} #${selectedParty.id}</h2>
            <p>${selectedParty.date}</p>
            <p>${selectedParty.location}</p>
            <p>${selectedParty.description}</p>
        </section>
    `;

    return section;
}


function render() {
    const $app = document.querySelector("#app");
    $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
        <section id="starting">
            <h2>Upcoming Parties</h2>
            <PartyList><PartyList>
        </section>
        <section id="selected">
            <h2>Party Details</h2>
            <PartyDetails></PartyDetails>
        </section>
    </main>
    `;
    $app.querySelector("PartyList").replaceWith(partyList());
    $app.querySelector("PartyDetails").replaceWith(partyDetails());
}

async function init() {
    await getParties();
    render();
}

init();