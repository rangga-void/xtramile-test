function buildTeams(swordsmen, archers, mages, healers) {
    if (swordsmen < 0 || archers < 0 || mages < 0 || healers < 0) {
        throw new Error("Character counts cannot be negative");
    }

    const teams = [];

    // I hate loose variables.
    let army = {
        swordsmen,
        archers,
        mages,
        healers,
        remaining: () => army.swordsmen + army.archers + army.mages + army.healers
    };

    while (army.remaining() > 0) {
        // start building a new team, loose variables are ugly.
        let team = {
            swordsmen: 0, archers: 0, mages: 0, healers: 0,
            size: () => team.swordsmen + team.archers + team.mages + team.healers
        };

        // If there are fewer than 5 characters remaining in the army,
        // just give them all to this team
        if (army.remaining() < 5) {
            team.swordsmen = army.swordsmen;
            team.archers = army.archers;
            team.mages = army.mages;
            team.healers = army.healers;
            teams.push(team);
            break; // We are done!
        }

        // now the hard part
        if (army.swordsmen > 0) { team.swordsmen++; army.swordsmen--; }
        if (army.archers > 0) { team.archers++; army.archers--; }
        if (army.mages > 0) { team.mages++; army.mages--; }
        if (army.healers > 0) { team.healers++; army.healers--; }

        while (team.size() < 5) {
            if (army.swordsmen > 0 && team.swordsmen < 2) { team.swordsmen++; army.swordsmen--; }
            else if (army.archers > 0 && team.archers < 2) { team.archers++; army.archers--; }
            else if (army.mages > 0 && team.mages < 2) { team.mages++; army.mages--; }
            else if (army.healers > 0 && team.healers < 2) { team.healers++; army.healers--; }
            else break; // nothing left that can legally join this dragon
        }
        teams.push(team);
    }

    const result = [];

    teams.forEach((team, index) => {
        result.push(`Dragon ${index + 1}: ${team.swordsmen} swordsmen, ${team.archers} archers, ${team.mages} mages, ${team.healers} healers`);
    });
    return result;
}

console.log("--- All Zeros - This should return an empty array ---");
console.log(buildTeams(0, 0, 0, 0));

console.log("Example #1 Output:");
console.log(buildTeams(1, 1, 1, 1));

console.log("\nExample #2 Output:");
console.log(buildTeams(10, 6, 3, 5));

// I added another test case based from my assumption from reading the instruction.
// “a dragon can have up to two warriors from the same class, unless there are fewer than 5 warriors left.”
// so the last 4 swordsmen will ride together on the final dragon. is this a trick or mistake? please elaborate, I wrote the code anyway based on that assumption!
console.log("\nOnly swordsmen (2 per dragon, last 4 ride together):");
console.log(buildTeams(20, 0, 0, 0));