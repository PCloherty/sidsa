module.exports = {
    name: 'startup',
    description: 'A function to add a bit of flavour to the bot by adding status that changes on each start up',
    exercute() {
            const langArr = ['Infernal', 'Elvish', 'Common', 'Celestial', 'UnderCommon','Orcish', 'Draconic', 'Dwarvish']
            const langInt = Math.floor(Math.random() * langArr.length)
            const language = langArr[langInt].toString('')
            return language
        }
    }