"use strict"; 
import Person from './person.mjs';

class Matcher 
{

  constructor() {
    // Properties
    this.locationPeopleDict = {} // key, value = location, list of people
    this.matches = {} // key, value = person, list of similar people
  }

  addPerson(person) {
    // this.allPeople.push(person);
    this.updateSimilaritiesLocation(person);
  }

  // issues solving:
  // are they catfishing?
  
  // Get similarities:
    // Check if person's location is already a key 
    //      - if it is, then add a person to the list
    //      - if not, create new key and add person there
    // Then call updateSimilaritiesField()
  updateSimilaritiesLocation(person) {
    if (person.location in this.locationPeopleDict) {
        this.locationPeopleDict[person.location].push(person)
    } else {
        this.locationPeopleDict[person.location] = [person];
    }

    this.updateSimilaritiesField();
  }

    // updateSimilaritiesField() {
    //     for (people_list.includes() this.locationPeopleDict.values()){
    //         for (human in people_list) {
    //             for (human_match in people_list) {
    //                 if (this.areMatched(human, human_match)) {
    //                     this.matches[human].push(human_match); // add to each other's respective match lists
    //                     this.matches[human_match].push(human); 
    //                 }
    //             }
    //         }
    //     }
    // }

    areMatched(person1, person2) {
      // TODO
        return true; 
        
    }

}

